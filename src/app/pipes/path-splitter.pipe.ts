import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pathSplitter'
})
export class PathSplitterPipe implements PipeTransform {

  transform(path:string):any[] {
    let pathArr:any[]=[];
    let x=path.split("\/")
    let aL:number=x.length;
    for(var i=0;i<aL;i++){
      if(i==aL-1 && x[i]=="" && i!=0){
        continue;
      }
      let obj={
        path:"/",
        value:"ROOT",
        active:false
      }
      if(i!=0){
        obj.value=x[i].toUpperCase();
        obj.path=Object.assign([],x).splice(0,i+1).join("\/")+"/"
      }
      // console.log(obj.path);
      pathArr.push(obj)
    }
    pathArr[pathArr.length-1].active=true;
    return pathArr;
  }

}

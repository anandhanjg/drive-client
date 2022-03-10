import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textTransform'
})
export class TextTransformPipe implements PipeTransform {
  length:number=9;
  transform(value:string): string {
    if(value.length>=this.length){
      value=value.substring(0,this.length-3)+"...";
    }
    return value;
  }

}

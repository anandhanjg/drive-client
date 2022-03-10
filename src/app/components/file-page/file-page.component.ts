import { AfterViewChecked, AfterViewInit, Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { FileService } from 'src/app/services/file-service/file.service';
declare var window:any;
@Component({
  selector: 'app-file-page',
  templateUrl: './file-page.component.html',
  styleUrls: ['./file-page.component.scss']
})
export class FilePageComponent implements OnInit, AfterViewInit,AfterViewChecked {
  styles:Record<string,string>={
    "display":"none"
  };

  @ViewChildren('span')
  spans:QueryList<ElementRef>=new QueryList<ElementRef>();

  oldName:string='';
  index:number=-1;
  loading:boolean=false;
  rmText:string="";

  @HostListener('click',['$event'])
  handleClickEvent(event:any){
    this.styles={
      "display":"none"
    }   
  }

  @HostListener('focusout',['$event'])
  hanldeFocusOut(event:any){
    this.renameFile(event);
  }

  @HostListener('keypress',['$event'])
  handleKeypress(event:any){
    if(event.target.className.indexOf('file-name')!=-1){
      if(event.keyCode==13){
          event.preventDefault();
          // this.renameFile(event);
      }
    }
  }

  renameFile(event:any){
    if(event.target.className.indexOf('file-name')!=-1){
      if(this.rmText && this.rmText!=this.cmData.nm){
        console.log(this.rmText);
        this.loading=true;
        this.fs.mv(this.path,this.cmData.name,this.rmText+(this.cmData.ext!='dir'?`.${this.cmData.ext}`:'')).subscribe((r:any)=>{
          this.getFiles();
        },e=>{
          console.error(e);
        },()=>{
          this.rmText="";
          this.index=-1;
          this.cmData={};
          this.loading=false;
        })
      }else if(this.rmText==this.cmData.nm){
        this.contents[this.index].editable=false;
        this.index=-1;
        this.cmData={};
      }else{
        this.getFiles();
      }
    }
  }

  cItems:any[]=["Open","Exit"]
  cmData:any
  contents:any[]=[
    {
      "name": "personal",
      "mimeType": "dir",
      "ext": "dir"
    }
  ];
  path:string="/";

  constructor(private as:AuthService,private fs:FileService,private router:Router) {

   }
  ngAfterViewChecked(): void {
    // throw new Error('Method not implemented.');
    // console.log(this.spans?.get(2));
  }
  ngAfterViewInit(): void {
    // throw new Error('Method not implemented.');
   
  }
  
  ngOnInit(): void {
    this.path=this.getCurrentPath();
    this.getFiles();
  }

  getFiles():void{
    this.fs.ls(this.path).subscribe((r:any)=>{
      if(r.success){
        this.contents=r.payload.files;
      }else{
        this.contents=[];
      }
    })
  }

  fileAction(file:any):void{
      if(!file) return;
    if(file.mimeType=='dir'){
      this.setPathAndOpen(this.path+file.name+"/");
    }else{
      alert(file.name)
    }
  }

  setPathAndOpen(fPath:string):void{
    this.path=fPath;
    localStorage.setItem('path',this.path);
    this.getFiles();
  }

  onFileContext(event:any,file:any,i:number):void{
    console.log(`on Right Click`,i)
    this.index=i;
    this.cmData=file;
    this.cItems=[
      {
        action:"open",
        value:"Open"
      },
      {
        action:"delete",
        value:"Delete"
      },
      {
        action:'rename',
        value:'Rename'
      }
    ]

    if(file.mimeType!='dir'){
      this.cItems.push({
        action:'download',
        value:'Download'
      })
    }
    this.setStyles(event); 
    this.cmData=file;
    console.log("HI RIGHT CLICK");
  }

  getCurrentPath():string{
    let p=localStorage.getItem('path') || "/"
    return p;
  }



  commonActions(event:any):void{
    let cls=event.srcElement.className;
    if(cls.indexOf('files-container')!=-1 || cls.indexOf('file-section')!=-1){
      console.log("GENERAL RIGHT CLICK");
      this.cItems=[
        {
          value:'New Folder',
          action:'create_new_folder'
        },
        {
          value:'Upload File',
          action:'upload_a_file'
        }
      ]
      this.setStyles(event);
      this.cmData={};
    }
  }

  setStyles(event:any){
    event.preventDefault();
    this.styles={
      "top":event.y+'px',
      "left":event.x+'px',
      "display":"block"
    }
  }

  handleContextActions(val:any){
    console.log(val.actionItem);
    switch(val.actionItem.action){
      case 'refresh':
        this.getFiles();
        break;
      case 'logout':
        this.as.logout();
        break;
      case 'open':
        this.fileAction(this.cmData);
        break;
      case 'delete':
        this.deleteAFile(this.cmData);
        break;
      case 'create_new_folder':
        this.createAFolder();
        break;
      case 'rename':
        this.rename(this.index);
        break;
      default:
        console.log("INVALID ACTION");
        break;
    }
  }

  createAFolder(name?:string){
    console.log("HI DUDE");
    this.fs.mkdir(this.path,name).subscribe((r:any)=>{
      this.getFiles();
    },e=>{
      console.log(e);
    })
  }

  deleteAFile(file:any):void{
    this.fs.rm(this.path+file.name).subscribe((r:any)=>{
      this.getFiles();
    })
  }

  rename(i:number){
    if(this.loading) return;
    console.log('renaming ${i}=',i)
    this.cmData=Object.assign({},this.contents[i]);
    this.contents[i].editable=true;
    this.index=i; 
    this.rmText=this.cmData.nm;
  }

  onNameChange(event:any){
    // this.rmText=event.target.innerText;
    this.rmText=event.target.innerText;
    //this.contents[this.index].name=event.target.innerText;
    // console.log(this.contents[this.index])
  }
}

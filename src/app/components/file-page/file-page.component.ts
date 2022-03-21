import { AfterViewChecked, AfterViewInit, Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ApiEndpoints } from 'src/app/services/api-endpoints.service';
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
  openType:string="";
  url:any=null;

  copiedFrom:any=null;

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
    if(event.target.className.indexOf('file-name')!=-1 && !/[A-Za-z0-9\ ]{1}/.test(String.fromCharCode(event.keyCode))) event.preventDefault();
  }

  renameFile(event:any){
    if(event.target.className.indexOf('file-name')!=-1){
      if(this.rmText && this.rmText!=this.cmData.nm){
        this.loading=true;
        this.fs.mv(this.path,this.cmData.name,this.rmText+(this.cmData.ext!='dir'?`.${this.cmData.ext}`:'')).toPromise().then(r=>{
          this.loading=false;
        }).catch(e=>{
          this.loading=false;
        }).finally(()=>{
          this.getFiles();
          this.rmText="";
          this.index=-1;
          this.cmData={};
          this.loading=false;
        });
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

  constructor(private as:AuthService,private fs:FileService,private router:Router,private sanitize:DomSanitizer) {}
  ngAfterViewChecked(): void {}
  ngAfterViewInit(): void { }
  
  ngOnInit(): void {
    this.path=this.getCurrentPath();
    this.getFiles();
  }

  getFiles():void{
    this.loading=true;
    this.fs.ls(this.path).subscribe((r:any)=>{
      if(r.success){
        this.contents=r.payload.files;
      }else{
        this.contents=[];
      }
      this.loading=false;
    },(e)=>{this.loading=false},()=>{})
  }

  fileAction(file:any):void{
      if(!file) return;
    if(file.mimeType=='dir'){
      this.setPathAndOpen(this.path+file.name+"/");
    }else{

      this.fs.read(this.path+file.name).subscribe((r:any)=>{
          let isPlayable:boolean=false;
          let mt:string=file.mimeType;
          if(mt.includes("video")){
            this.openType="video"
            if(document.createElement('video').canPlayType(mt)) isPlayable=true;
          }else if(mt.includes('audio')){
            this.openType="audio"
            if(document.createElement('audio').canPlayType(mt)) isPlayable=true;
          }else if(mt.includes('pdf') || mt.includes('image') || mt.includes('text')){
            this.openType=mt.includes('image')?'image':'default';
            isPlayable=true;
          }
          let u=URL.createObjectURL(new Blob([r],{type:mt}));
          if(isPlayable){
            // let frame=document.getElementById('file-view-frame')
            this.url=this.sanitize.bypassSecurityTrustResourceUrl(u);
            console.log(this.url);
          }else{
            let a=document.createElement('a')
            a.setAttribute('target','__blank');
            a.setAttribute('download',file.name);
            a.href=u;
            a.click();
          }
      })
    }
  }

  setPathAndOpen(fPath:string):void{
    this.path=fPath;
    localStorage.setItem('path',this.path);
    this.getFiles();
  }

  onFileContext(event:any,file:any,i:number):void{
    this.index=i;
    this.cmData=file;
    this.cItems=[
      {
        action:"open",
        value:"Open",
        icon:{
          'fas':true,
          'fa-folder-open':true
        }
      },
      {
        action:"cut",
        value:"Cut",
        icon:{
          'fas':true,
          'fa-cut':true
        }
      },
      {
        action:"delete",
        value:"Delete",
        icon:{
          'fas':true,
          'fa-trash':true
        }
      },
      {
        action:'rename',
        value:'Rename',
        icon:{
          'fas':true,
          'fa-edit':true
        }
      }
    ]

    if(file.mimeType!='dir'){
      this.cItems.push({
        action:'download',
        value:'Download',
        icon:{
          'fas':true,
          'fa-download':true
        }
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
          action:'create_new_folder',
          icon:{
            'fas':true,
            'fa-folder-plus':true
          }
        },
        {
          value:'Upload A File',
          action:'upload_a_file',
          icon:{
            'fas':true,
            'fa-upload':true
          }
        },
        {
          value:'Paste',
          action:'paste',
          icon:{
            'fas':true,
            'fa-paste':true
          },
          disabled:!this.copiedFrom?true:false
        },
      ]
      this.setStyles(event);
      this.cmData={};
    }
  }

  setStyles(event:any){
    event.preventDefault();
    console.log(event.y);
    console.log(event.x);
    console.log(window.innerWidth-event.x);
    console.log(window.innerHeight);
    this.styles={
      // "top":event.y+'px',

      // "left":event.x+'px',
      "top":'unset',
      "left":'unset',
      "right":'unset',
      "bottom":'unset',
      "display":"block"
    }

    let iw=window.innerWidth;
    let ih=window.innerHeight;

    if(iw-event.x>300){
      this.styles.left=event.x+'px';
    }else{
      this.styles['right']=(iw-event.x)+'px';
    }

    if(ih-event.y>200){
      this.styles['top']=event.y+'px';
    }else{
      this.styles['bottom']=(ih-event.y)+'px';
    }
    
  }

  handleContextActions(val:any){
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
      case 'upload_a_file':
        this.uploadFile();
        break;
      case 'rename':
        this.rename(this.index,true);
        break;
      case 'download':
        this.download();
        break;
      case 'cut':
        this.copiedFrom={'path':this.path,'fileName':this.cmData.name};
        // console.log(this.copiedFrom)
        break;
      case 'paste':
        
        this.handleMvDirect();
        break;
      default:
        console.log("INVALID ACTION");
        break;
    }
  }

  handleMvDirect(){
    if(!this.copiedFrom) return;
    console.log(this.path,this.copiedFrom);
    if(this.path==this.copiedFrom.path) { this.copiedFrom=null;return;}
    this.fs.mvDirect(this.path,this.copiedFrom.path,this.copiedFrom.fileName).subscribe((r:any)=>{},(e)=>{},()=>{this.getFiles();this.copiedFrom=null})
  }

  download(){
    console.log(this.cmData)
    console.log(this.path); 
    this.fs.read(this.path+this.cmData.name).subscribe((r:any)=>{
      console.log(r);
      let blob=new Blob([r]);
      let url=URL.createObjectURL(blob);
      let a=document.createElement('a');
      a.href=url;
      a.setAttribute('download',Date.now()+'')
      a.click();
    })
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

  rename(i:number,o?:boolean){
    if(this.loading) return;
    this.cmData=Object.assign({},this.contents[i]);
    this.contents[i].editable=true;
    this.index=i;

    this.rmText=this.cmData.nm;

    if(o){
      let span:any=this.spans.get(i)?.nativeElement
      span.focus()
      span.click()
    }
  }

  onNameChange(event:any){
    this.rmText=event.target.innerText;
  }

  onDrop(event:any){
    event.preventDefault();
    if(this.loading) return;
    if(this.dragged && this.dragged!=event.target.id && event.target.id.indexOf('fimage_')!=-1){
      let i=Number(event.target.id.replace('fimage_',''));
      let j=Number(this.dragged.replace('fimage_',''));

      if(this.contents[i].mimeType=='dir'){
        this.loading=true;
        this.fs.mv(this.path,this.contents[j].name,this.contents[i].name+'/'+this.contents[j].name).toPromise().then(d=>{

        }).catch(e=>{

        }).finally(()=>{
          this.getFiles();
          this.loading=false;
        });        
      }
    }
    this.dragged=''
  }

  allowDrop(event:any){
    event.preventDefault();
  }

  onDrag(event:any){
    this.dragged=event.target.id;
    event.dataTransfer.setData('text',event.target.id);
  }

  uploadFile(){
    let input=document.createElement('input');
    input.type='file';
    input.onchange=(e:any)=>{
      // console.log(e.target.value);
      // console.log(e.target.files[0]);
      this.loading=true;
      if(e.target.value){
        let fm=new FormData();
        fm.append('file',e.target.files[0]);
        fm.append('path',this.path);
        this.fs.touch(fm).toPromise().then(r=>{
          console.log(r);
        }).catch(e=>{
          console.log(e);
        }).finally(()=>{
          this.loading=false;
          this.getFiles();
        })
      }
    }
    input.click();
    
  }

  dragged:string='';

  closeFile(event?:any){
    if(event.target.id=='file-close')
      this.url=null;
  }
}

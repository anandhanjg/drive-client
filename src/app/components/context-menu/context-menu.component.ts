import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';


@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit,AfterViewInit,OnChanges {

  @Input('originalData')
  data:any=undefined;

  @ViewChild('contextElement')
  contextElement:ElementRef | undefined;

  @Input('styles')
  styles:any={"display":"none"};

  @Input('items')
  items:any[]=[]

  @Output('onItemSelect')
  sI=new EventEmitter<any>();

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
  //  if(changes?.styles){
  //    this.styles=changes.styles.currentValue
  //  }
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
      this.contextElement!.nativeElement!.oncontextmenu=function(e:any){e.preventDefault()}
  }

  itemSelect(item:any):void{
    if(item.disabled) return;
    this.sI.emit({data:this.data,actionItem:item})
    this.contextElement!.nativeElement!.style!.display="none"
  }

}

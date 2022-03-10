import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filesTransform'
})
export class FilesTransformPipe implements PipeTransform {

//   {
//     "name": "personal",
//     "mimeType": "dir",
//     "ext": "dir"
// }


  transform(contents:any[]) {

    contents.forEach(c=>{
      c.editable=false;
      if(c.name){
        c.nm=c.name.replace(`.${c.ext}`,'')
      }
      if(c.mimeType=="dir"){
        c.src="assets/images/folder-40.png"
        c.fileType="dir"
      }else if(c.mimeType.indexOf("image")!=-1){
        c.src="assets/images/image-40.png"
        c.fileType="images"
      }else if(c.mimeType.indexOf("audio")!=-1){
        c.src="assets/images/audio-40.png"
        c.fileType="audio"
      }else if(c.mimeType.indexOf("video")!=-1){
        c.src="assets/images/video-40.png"
        c.fileType="video"
      }else{
        c.src="assets/images/document-40.png"
        c.fileType="file"
      }
    });
    return contents;
  }

}


export interface ApiResponse{
    code:string,
    success:boolean,
    payload:any,
    message:string
}

export interface ProfileResponse extends ApiResponse{
    payload:{
        profile:Profile
    }
}

// export interface FileListResponse extends ApiResponse{
//     payload:{
//         files:Array<File>,
//         path:string
//     }
// } 

export interface FileListResponse{
    files:Array<File>,
    path:string
}

export interface File{
    name:string,
    mimeType:string,
    ext?:string|null
}

export interface Profile{
    username:string,
    name:string,
    email?:string|undefined,
    mobile?:string|undefined
}

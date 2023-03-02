import { useState,useEffect } from 'react';

const id:any = localStorage.getItem("id")
const token = localStorage.getItem("token")
const token2:any = localStorage.getItem("token2")
const url = "http://localhost:4000/"
let result:any

function show(data:any){
  result = data
}

// Get videos.

export async function GetVideos(){

  await fetch(`${url}getVideos/${token}`,{
    headers: {
    "x-access-token": token2}})
  .then((res)=>{return res.json()})
  .then((res)=> {if(res === "You are not authorized"){window.location.href = "../sign-up"}; return show(res)})
  

  return result
}

// Log in.

export const LogInFun = async(mail:string,pass:string)=>{
  await fetch(`${url}signIn`,{
    method: "POST",
    headers:{
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      mail: mail,
      pass: pass,
    })
  }).then((res)=>{return res.json()})
    .then(async(res)=> {show(res[0]);if(res[0] === "Access allowed"){localStorage.setItem("token2",res[2]);localStorage.setItem("token",res[1].token);localStorage.setItem("id",res[1].id); window.location.reload()}})
  
   return result
  }

//Sign UP.

export const SignUpFun = async(mail:string,pass:string,name:string,role:string)=>{

  await fetch(`${url}create`,{
    method: "POST",
    headers:{
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      pass: pass,
      mail: mail,
      role: role
    })
  }).then((res)=>{return res.json()})
    .then((res)=> {show(res);if(res[0] === "User created"){window.location.href = "/log-in"}})

   return result
  }

  // Suscribe - Like.

  export const SusLikeFun = async(idURL:any,target:string,table:string)=>{

    await fetch(`${url}suscribe-likes`,{
      method: "PUT",
      headers:{
        "x-access-token": token2,
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: parseInt(id),
        token: token,
        chanelId: parseInt(idURL),
        target: target,
        table: table
      })
    }).then((res)=>{return res.json()})
      .then((res)=> {if(res === "success"){window.location.reload()}}) 
    }

    // Send image.

    export const SendImageFun = async(formdata:any)=>{

      await fetch(`${url}changeUserImage/${token}`,{
        headers:{"x-access-token": token2},
        method: "PUT",
        body: formdata
      }).then((res)=>{return res.json()})
        .then((res)=> {show(res);if(res === "Image upload"){localStorage.setItem("image","true");window.location.reload()}})

       return result
      }

      //Get user.

      export const GetUserFun = async(urlId:string)=>{

       await fetch(`${url}getUser/${urlId}/${token}/${id}`,{
        headers: {"x-access-token": token2}
       })
        .then((res)=>{return res.json()})
        .then((res)=> {show(res);if(res[0] === "noUser"){window.location.href = "/main"} 
         })
        return result
       }
  
//Upload video.

export const PostVideoFun = async(formdata:any,videoTitle:string,videoDes:string)=>{

  await fetch(`${url}videos/post/${token}/${id}/${videoTitle}/${videoDes}`,{
    headers: {"x-access-token": token2},
    method: "POST",
    body: formdata
    
  }).then((res)=>{return res.json()})
    .then((res)=> {show(res);if(res[0] === "success"){window.location.href = `/video/${res[1]}`}})

return result
}

//Update video.

export const UpdateVideoFun = async(urlId:string | undefined,videoTitle:string,videoDes:string)=>{

  await fetch(`${url}updateVideo/${urlId}`,{
    method: "PUT",
    headers:{
      "x-access-token": token2,
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      token:token,
      title: videoTitle,
      des: videoDes,
      userId: id
    })
  }).then((res)=>{return res.json()})
    .then((res)=> {show(res);if(res === "success"){window.location.href = `/video/${urlId}`};if(res.user != id){window.location.href = `/main`}})

  return result
}

//GET single video.

export const GetSingleVideoFun = async(urlId:any)=>{

  await fetch(`${url}getSingleVideo/${token}/${urlId}/${id}`,{
    headers: {"x-access-token": token2},
  })
  .then((res)=>{return res.json()})
  .then((res)=> {show(res); if (res == "You are not authorized"){window.location.href = "../../sign-up"}})
  
return result
}

//DELETE video

export const DeleteVideoFun = async(urlId:string)=>{

  await fetch(`${url}deleteVideo/${urlId}`,{
    method: "DELETE",
    headers:{
      "Accept": "application/json",
      "Content-Type": "application/json",
      "x-access-token": token2
    },
    body: JSON.stringify({
      token:token,
      userId:id,
      id: urlId
    })
  }).then((res)=>{return res.json()})
    .then((res)=> {if(res === "success"){window.location.href = `/main`}})
  
return result
}

        
        

     






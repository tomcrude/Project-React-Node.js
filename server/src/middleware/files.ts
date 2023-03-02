const multer = require('multer')
const path = require("path")
 
// Here the folders where the videos and images will be store are created.

const diskstorage = multer.diskStorage({ 
    destination: path.join(__dirname, "../../public/images"),
    filename: (_:any,file:any,cb:any)=>{
    cb(null, "image-" + file.originalname)}
      })
    
const diskvideostorage = multer.diskStorage({
   destination: path.join(__dirname, "../../public/videos"),
   filename: (_:any,file:any,cb:any)=>{
   cb(null, "video-" + file.originalname)}
      })

// Here the videos and images are save.

  export const fileupload = multer({
    storage: diskstorage
  }).single("image")
  
  export const Videoupload = multer({
    storage: diskvideostorage
  }).single("video")

  module.exports = {
    fileupload,
    Videoupload
  }
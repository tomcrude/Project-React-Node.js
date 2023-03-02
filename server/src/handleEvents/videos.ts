export const pool = require("../dataBase/conection.ts")
const {unLink,writeFile,readDir,readFile,detectTitleDes,token2Veri} = require("../functions/function.ts")


const videoPath = "../../public/videos/"

// CREATE videos

const createVideos = async(req:any,res:any) => {
  const {token,title,des} = req.params

  if (await !token2Veri(req.headers["x-access-token"])){return res.json(["You are not authorized"])}

  if (req.file.mimetype !== "video/mp4" || req.file.mimetype === null || req.file.size > 10000000){unLink(videoPath,req.file.filename);return res.json("The video must be MP4 and should not weigh more than 10 mb.")}
  if(detectTitleDes(title,des) === true){return res.json("The title must have between 4 and 20 characters and the description between 4 and 255 characters.")}

  pool.query("SELECT id,name FROM users WHERE token = $1",[token], async(e:any, rows:any)=>{
    if (e) return res.json(e)
    if (rows.rows.length > 0){
      const id = rows.rows[0].id

      const videoData = readFile(videoPath,req.file.filename)
    
      pool.query(`INSERT INTO videos (title,des,video,"user",likes) VALUES ($1,$2,$3,$4,array[(0)]) RETURNING id`, [title,des,videoData,id], (e:any,rows:any)=>{
        if (e) return console.log(e)

        const videoId = rows.rows[0].id
        unLink(videoPath,req.file.filename)

        writeFile(videoPath,videoId,videoData,"-video.mp4")
    
        readDir(videoPath)

        pool.query("SELECT videos FROM users WHERE token = $1",[token],(e:any,rows:any)=>{
          if (e) return res.json(e)

          const record = rows.rows[0].videos
          record.push(videoId)

          pool.query(`UPDATE users SET videos = array[${record}] WHERE token = $1`, [token])
          res.json(["success",videoId])
    })
})}
    else return res.json("You are not authorized")
  })}

// GET ALL Videos

const getVideos = async(req:any,res:any) => {

  const {token} = req.params

  if (await !token2Veri(req.headers["x-access-token"])){return res.json("You are not authorized")}

  pool.query("SELECT name FROM users WHERE token = $1",[token], (e:any, rows:any)=>{
    if (e) return res.json(e)
    if (rows.rows.length > 0){
       pool.query("SELECT id,title,des FROM videos",(e:any,rows:any)=>{
        if (e) return res.json(e)
        res.json(rows.rows)
       })
    }
    else return res.json("You are not authorized")
  })
}

// GET single video

const getSingleVideo = async(req:any,res:any) => {

  const {token,id,userId} = req.params

  if (await !token2Veri(req.headers["x-access-token"])){return res.json("You are not authorized")}

  pool.query("SELECT name FROM users WHERE token = $1",[token], (e:any, rows:any)=>{
    if (e) return res.json(e)
    if (rows.rows.length > 0){
       pool.query(`SELECT videos.id,title,des,"user",likes,name,"imageURL" FROM videos INNER JOIN users ON videos.user = users.id WHERE videos.id = $1`,[id],(e:any,rows:any)=>{
          if (e) return res.json(e)
          if (rows.rows.length > 0){

            if (rows.rows[0].likes.includes(+userId)){return res.json([rows.rows[0],{title: "Dislike", color: "rgb(255,255,255)"}])}
            else {return res.json([rows.rows[0],{title: "Like", color: "rgb(0,0,0)"}])}
        }
        else{return res.json("denegate")}
       })
    }
    else return res.json("You are not authorized")
  })}

// UPDATE video

const updateVideo = async(req:any,res:any) => {

  const {id} = req.params
  const {token,title,des,userId} = req.body
  if (await !token2Veri(req.headers["x-access-token"])){return res.json("You are not authorized")}
  if(detectTitleDes(title,des) === true){return res.json("The title must have between 4 and 20 characters and the description between 4 and 255 characters.")}

  pool.query("SELECT name FROM users WHERE token = $1",[token], (e:any, rows:any)=>{
    if (e) return res.json(e)
    if (rows.rows.length > 0){
      
      pool.query(`SELECT "user" FROM videos WHERE "user" = $1 AND id = $2`,[userId,id],(e:any,rows:any)=>{
        if (e) return res.json(e)
        if (rows.rows.length > 0){

          pool.query(`UPDATE public.videos SET title=$1, des=$2 WHERE id = $3`,[title,des,id],(e:any)=>{
            if (e) return res.json(e)
            res.json("success")
           })
        }
        else {return res.json("You are not authorized")}
      })}
    else return res.json("You are not authorized")
  })}

// GET users videos

const getUserVideos = async(req:any,res:any) => {

   const {token,id,userId} = req.params

   if (await !token2Veri(req.headers["x-access-token"])){return res.json("You are not authorized")}

    pool.query("SELECT name FROM users WHERE token = $1",[token], (e:any, rows:any)=>{
      if (e) return res.json(e)

      if (rows.rows.length > 0){

        pool.query(`SELECT id,title,des FROM videos WHERE id = $1 AND "user" = $2`,[id,userId],(e:any,rows:any)=>{
          if (e) return res.json(e)
          if (rows.rows.length <= 0){return res.json("You are not authorized")}
          res.json(rows.rows[0])
       })}
    else return res.json("You are not authorized")
  })}

// DELETE video info

const deleteVideo = async(req:any,res:any) => {
  const {token,id,userId} = req.body

  if (await !token2Veri(req.headers["x-access-token"])){return res.json("You are not authorized")}

  pool.query("SELECT name,videos FROM users WHERE token = $1",[token], (e:any, rows:any)=>{
    
    if (e) return res.json(e)
    if (rows.rows.length > 0){
      const videoData = rows.rows[0].videos.filter((stat:string) => stat != id)
      
      pool.query("DELETE FROM videos WHERE id = $1",[id],(e:any,_rows:any)=>{
        if (e) return res.json(e)
        pool.query("UPDATE users SET videos=$1 WHERE id = $2",[videoData, userId],(e:any,_rows:any)=>{
          if (e) return res.json(e)
          res.json("success")
        })
      })}
    else return res.json("You are not authorized")
  })
}


const methods = {
    deleteVideo,
    createVideos,
    getVideos,
    getSingleVideo,
    getUserVideos,
    updateVideo
  }

module.exports = methods 
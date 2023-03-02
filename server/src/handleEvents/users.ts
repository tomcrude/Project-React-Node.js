const pool = require("../dataBase/conection.ts")
export const {detectNamePass,unLink,writeFile,readDir,readFile,token2Veri,createToken2} = require("../functions/function.ts")
const imagePath = "../../public/images/"
const bcrypt = require("bcryptjs");

// Create User

const create = async(req:any,res:any) => {

    const {name, pass, mail, role} = req.body

    const token = Math.round(Math.random()*10000) + "-" + name

    if(detectNamePass(name) || detectNamePass(pass)){return res.json(["The username and password must have at least 3 characters and a maximum of 12."]);}

    if (mail == null || mail == undefined || mail.length < 4 || mail.length > 257){return res.json(["Enter an email correctly."]);}
    if (role == null || role == undefined || role !== "student" && role !== "teacher"){return res.json(["Enter a role"]);}

    pool.query(`SELECT name FROM users WHERE mail = $1`,[mail], async(e:any, rows:any)=>{
        
        if (e) return res.json(["Error creating users"])

        if (rows.rows.length > 0){return res.json(["The mail is already taken."])}     
        
        else { 

          await bcrypt.hash(pass, 10, (err:any, secret:any) => {
            if (err) {
              console.log("Error: ", err);
            } else {

              pool.query(`INSERT INTO users (name,pass,mail,role,token,followers,videos) VALUES ($1,$2,$3,$4,$5,array[(0)],array[(0)]) RETURNING id`,[name,secret,mail,role,token],(e:any,_rows:any)=>{
                if (e) return console.log(e)
                
                res.json(["User created"])
    
              })
            }
          })

        
        }
    })    
}

// Sign IN

const signIn = (req:any,res:any) => {
    const {mail, pass} = req.body;
    if (mail == null || mail == undefined || mail.length == 0 || mail.length > 255 || pass.length > 13 || pass == null || pass == undefined || pass.length < 4){return res.json(["The data entered is incorrect"]);}
    
    pool.query("SELECT mail,pass,token,id FROM users WHERE mail = $1", [mail], (e:any, rows:any)=>{
      if (e) return res.json(e)
      if (rows.rows.length > 0){
        
        bcrypt.compare(pass, rows.rows[0].pass, (err:any, password:any) => {
          if (err) {
            res.json(["Incorrect username or password."])
          } else {
              if(password === false){return res.json(["Incorrect username or password."])}
              res.json(["Access allowed",rows.rows[0],createToken2(rows.rows[0].id)])
          }})
      }
      else {
        res.json(["Incorrect username or password."])
      }
    })}

// GET user

const getUser = async(req:any,res:any) => {

    const {id, token,userId} = req.params

    if (await !token2Veri(req.headers["x-access-token"])){return res.json(["noUser"])}

    pool.query("SELECT name FROM users WHERE token = $1",[token], (e:any, rows:any)=>{
        if (e) return res.json(e)
        if (rows.rows.length > 0){

              pool.query(`SELECT id, name, pass, mail, token, role, followers, "imageURL" from users WHERE id = $1`, [id],(e:any,rows:any)=>{
                  if (e) return res.json(e)
                  if (rows.rows.length <= 0){return res.json(["noUser"])}

                  pool.query(`SELECT id,title,des FROM videos WHERE "user" = $1`,[id],(e:any,row:any)=>{
                  if (e) return res.json(e) 

                  if (rows.rows.length <= 0){return res.json([rows.rows[0],{title: "Suscribe", color: "primary"},["No videos"]])}

                  if (rows.rows[0].followers.includes(+userId)){return res.json([rows.rows[0],{title: "Unsuscribe", color: "error"},row.rows])}
                  
                  else {return res.json([rows.rows[0],{title: "Suscribe", color: "primary"},row.rows])}
               })  
            })
          }
          else return res.json(["noUser"])
        })
}

// Change user image

const changeUserImage = async(req:any,res:any) => {
    const {token} = req.params
    if (req.file.mimetype === null){res.json("Error")}
    if (await !token2Veri(req.headers["x-access-token"])){return res.json("You are not authorized")}

    pool.query("SELECT id,name FROM users WHERE token = $1",[token], (e:any, rows:any)=>{
      if (e) return res.json(e)
      if (rows.rows.length > 0){

        const id = rows.rows[0].id
        const type = req.file.mimetype
        const imgData = readFile(imagePath,req.file.filename)
  
        if (type !== "image/png" && type !== "image/jpeg" && type !== "image/jpg" || req.file.size > 500000){unLink(imagePath,req.file.filename);return res.json("The image must be PNG/JPG/JPEG and should not weigh more than 0.5 mb.")}
    
        pool.query(`UPDATE users SET image = $1, "imageURL" = $2 WHERE token = $3`, [imgData,"true",token], (e:any,_rows:any)=>{
        if (e) return res.json(e)

        unLink(imagePath,req.file.filename)

        writeFile(imagePath,id,imgData,"-image.png")

        readDir(imagePath)

        res.json("Image upload")
    })}
    else return res.json("You are not authorized")
  })
}

// Suscribe - Like

const suscribe = async(req:any,res:any) => {

    const {id, token, chanelId,target,table} = req.body

    if (await !token2Veri(req.headers["x-access-token"])){return res.json("You are not authorized")}

    pool.query("SELECT name FROM users WHERE token = $1",[token], (e:any, rows:any)=>{
      if (e) return res.json(e)
  
      if (rows.rows.length > 0){

           pool.query(`SELECT ${target} from ${table} WHERE id = $1`, [+chanelId],async(e:any,rows:any)=>{
              if (e) {return res.json(e)}
                let record

                if (target === "followers"){
                  record = rows.rows[0].followers
                }
                else
                {
                  record = rows.rows[0].likes 
                }
    
                const find = record.includes(+id)

                record.push(id)  

                if (find === true){
                  let data = await record.filter((stat:string) => stat != id)
                  pool.query(`UPDATE ${table} SET ${target}=array[${data}] WHERE id = $1`,[chanelId],(e:any,_rows:any)=>{
                    if (e) return console.log(e)
                    res.json("success")
                  })

                }
                else{
                    pool.query(`UPDATE ${table} SET ${target}=array[${record}] WHERE id = $1`,[chanelId],(e:any,_rows:any)=>{
                      if (e) return console.log(e)
                      res.json("success")
                    })}})
      }
      else return res.json("You are not authorized")
    })
  }

  const methods = {
    create,
    signIn,
    suscribe,
    changeUserImage,
    getUser
  }

module.exports = methods 
let express_ = require("express")
const videosHandle = require("../handleEvents/videos.ts")
const usersHandle = require("../handleEvents/users.ts")
const {fileupload ,Videoupload} = require("../middleware/files.ts")

const Router = express_.Router()

export const pool = require("../dataBase/conection.ts")

// Create User (Public) - This route introduces a new user to the database.

Router.post("/create" , usersHandle.create)

// Sign IN (Public) - This route gives the user access to enter the main page, as long as his data is registered in the database.

Router.post("/signIn" , usersHandle.signIn)

// GET USER (Private) - This route gets all the user's information, as long as the token matches the database.

Router.get("/getUser/:id/:token/:userId", usersHandle.getUser)

// Suscribe-Likes (Private) - This route adds or delete a new value to the "followers" or "likes" column of the selected user.

Router.put("/suscribe-likes", usersHandle.suscribe)

// Change user image (Private) - This route saves an image file to the user database.

Router.put("/changeUserImage/:token" ,fileupload, usersHandle.changeUserImage)

// POST videos (Private) - This route saves a video file to the user database.

Router.post("/videos/post/:token/:id/:title/:des", Videoupload, videosHandle.createVideos)

// GET ALL videos (Private) - This route gets all videos from the database.

Router.get("/getVideos/:token" , videosHandle.getVideos)

// GET single video (Private) - This route gets a specific video from the database.

Router.get("/getSingleVideo/:token/:id/:userId" , videosHandle.getSingleVideo)

// GET user videos (Private) - This route gets the videos published by specific user.

Router.get("/getUsersVideo/:token" , videosHandle.getUserVideos)

// UPDATE video (Private) - This route updates the title and description of the selected video.

Router.put("/updateVideo/:id" , videosHandle.updateVideo)

// DELETE video (Private) - This route removes a specific video from the database.

Router.delete("/deleteVideo/:id" , videosHandle.deleteVideo)

module.exports = Router


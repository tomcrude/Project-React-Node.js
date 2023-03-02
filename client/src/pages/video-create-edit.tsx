import {Typography, Box, Grid, TextField,Button} from '@mui/material';
import Header from '../components/header';
import { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import {GetSingleVideoFun,PostVideoFun,UpdateVideoFun} from "../utils/api/api"

export default function CreateEdit() {
  const {id} = useParams()
  
  const [videoValue, setVideoValue] = useState<any>({title: "Title",des: "Description"})
  const [title, setTitle] = useState<string>("Edit")
  const [video, setVideo] = useState<any>()
  const [videoTitle, setVideoTitle] = useState<string>("")
  const [videoDes, setVideoDes] = useState<string>("")

  const [state, setState] = useState<string>("")

  // This path works both to create a video and to update it.

  useEffect(()=>{
  // If the url parameter is equal to "0" then it means that videos are going to be created.
    if (id === "0"){
      setTitle("Upload a video")
    }
  // Otherwise, it will get the information of the video we want to edit.
    else{
      GetSingleVideoFun(id).then(function(res) {
        if(typeof res[0] == "object"){setVideoValue(res[0])}else{setState(res[0])}
        })}
  },[])

  function upload(e:any){
      e.preventDefault()
      // this function sends the information of the video to be created.
      if (id === "0"){
        if (video === undefined){return window.alert("You must select a video.")}
        const formdata = new FormData()
        formdata.append("video", video[0])
        PostVideoFun(formdata,videoTitle,videoDes).then(function(res) {
        setState(res)})
      }
      else{
        // this function updates the information of the video.
        UpdateVideoFun(id,videoTitle,videoDes).then(function(res) {
          setState(res)})
      }     
  }
  
    return (
      <Box m={2}>
          <Header/>
         <Grid alignContent="center" justifyContent="center" container spacing={2}>
            <Grid boxShadow="2px 3px 17px 2px rgba(0,0,0,0.75)" bgcolor="rgb(255,255,255)" mt={11} item borderRadius="1.5%" xs={10.5} md={8} xl={3}>
              <Box margin={5}>
              <Typography component="h1" fontSize="29px">{title}</Typography>
              <Box onSubmit={(e)=>{upload(e)}} component="form">
          
              <label className={id === "0" ? "" : "inactive"}>Upload a video</label>
              <Box className={id === "0" ? "" : "inactive"}><TextField
              margin="normal"
              fullWidth
              type="file"
              name='file'
              onChange={(e)=>{const input = e.target as HTMLInputElement;setVideo(input.files)}}
              /></Box>
              <TextField
              margin="normal"
              required
              fullWidth
              label={videoValue.title}
              name="title"
              onChange={(e)=>{setVideoTitle(e.target.value)}}
              />

              <TextField
              margin="normal"
              required
              fullWidth
              name="description"
              maxRows={4}
              label={videoValue.des}
              multiline
              onChange={(e)=>{setVideoDes(e.target.value)}}
              />
           
            
              <Typography component="p" color="rgb(255,0,0)">{state}</Typography>

              <Button variant="contained" type='submit' fullWidth sx={{marginTop: "15px",marginBottom: "16px"}} color="primary">Upload</Button>
              </Box>
              </Box>
        </Grid>
      </Grid>
    </Box>
    );
  }
  
import {Typography, Box, Grid,Link} from '@mui/material';
import Header from '../components/header';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import VideoCard from "../components/video-card"
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useParams } from 'react-router-dom';
import {useState, useEffect} from 'react';
import {SusLikeFun,GetVideos,GetSingleVideoFun,DeleteVideoFun} from "../utils/api/api"

export default function Video() {
  const {id}:any = useParams()
  const [videos, setVideos] = useState<any[]>([])
  const [video, setVideo] = useState<any>("")
  
  const [delet, setDelet] = useState<any>(<></>)
  const [edit, setEdit] = useState<any>(<></>)
  const [like, setLike] = useState<any[]>([])

  const [thumb, setThumb] = useState<any>({})

  const random = Math.round(Math.random()*5)


  useEffect(()=>{

    GetVideos().then(function(result) {
      setVideos(result.slice(random,random + 5))
    })

    // Here it get a specific video depending on the url.

    GetSingleVideoFun(id).then(function(res) {
      setThumb(res[1]);setLike(res[0].likes);setVideo(res[0]);if (res === "denegate"){window.location.href = "/main"}
      if(res[0].user == localStorage.getItem("id")){
        setDelet(<Box zIndex={100} onClick={()=>{DeleteVideoFun(id)}} width={30} position="absolute" borderRadius="25%" sx={{"&:hover":{cursor: "pointer",boxShadow: "0px 0px 10px -2px rgba(0,0,0,0.75)"}}} color="rgb(240,0,0)" bgcolor="rgb(255,255,255)" textAlign="center"><DeleteIcon titleAccess='Delete'/></Box>)
        setEdit(<Box width={30} borderRadius="25%" sx={{"&:hover":{cursor: "pointer",boxShadow: "0px 0px 10px -2px rgba(0,0,0,0.75)"}}} bgcolor="rgb(255,255,255)" textAlign="center"><Link href={`/video/create-edit/${id}`}><BorderColorIcon sx={{color: "rgb(0,0,0)"}} titleAccess='Edit'/></Link></Box>)
  }})
  },[])

    return (
      <Box m={2}>
        <Header/>
        <Grid mt={1} ml={-1} container spacing={2}>
         
          <Grid m={2} item sx={{height: {xs:"30vh",sm: "40vh",md:"45vh",xl:"65vh"}}} xs={12} lg={8}>
            {delet}
          <video controls className='video' src={video.id !== undefined ? `http://localhost:4000/${video.id}-video.mp4` :  ""}/>
          </Grid>

          <Grid m={4} maxHeight="100%" sx={{marginLeft:{lg: "-20px"},transform: {xs: "translateY(100px)",lg: "translateY(-32px)"}}} item height="30vh" xs={12} lg={3.2}>
            
          {videos.map((stat)=>{
                  return (
                    <VideoCard key={stat.id} width={"100%"} title={stat.title} des={stat.des} video={stat.id}/>
                  )
                })}

          </Grid>
        
          <Grid m={4} item height="30vh" xs={12} lg={8} sx={{transform: {xs: "translateY(-380px)",lg: "translateY(-50px)"}}}>
              {edit}
            <Typography variant="h1" fontSize={30} fontWeight={800}>{video.title}</Typography>
            <Box mt={1}><Box mr={1} display="inline-block" borderRadius="50%" width="40px" height="40px" title={video.name} sx={{"&:hover": {cursor: "pointer",boxShadow: "0px 0px 10px -2px rgba(0,0,0,0.75)"}}} onClick={()=>{window.location.href = `/user/${video.user}`}}><img className='img' src={video.imageURL == null ? "https://cdn-icons-png.flaticon.com/512/149/149071.png" : `http://localhost:4000/${video.user}-image.png`} alt="user"/></Box><ThumbUpAltIcon onClick={()=>{SusLikeFun(id,"likes","videos")}} titleAccess={thumb.title} sx={{color: thumb.color,fontSize: "30px",transform: "translateY(1px)", "&:hover": {color:"rgb(255,255,255)", cursor: "pointer"}}}/><Typography sx={{transform: "translateY(-6px)"}} display="inline-block" ml={1} fontWeight={800} component="p" fontSize={16}>{like.length - 1}</Typography></Box>
            <Typography mt={2} component="p" fontSize={16}>{video.des}.</Typography>
          </Grid>

        </Grid>
        
      </Box>
    );
  }
  
import {Typography, Box, Grid, Button} from '@mui/material';
import VideoCard from "../components/video-card"
import Header from '../components/header';
import EditIcon from '@mui/icons-material/Edit';
import {useEffect, useState} from "react"
import { useParams } from 'react-router-dom';
import {SusLikeFun, SendImageFun,GetUserFun} from "../utils/api/api"

export default function User() {

  const [image,setImage] = useState<any>(null)
  const [user,setUser] = useState<any>("")
  const [suscribe,setSuscribe] = useState<any>()
  const [edit,setEdit] = useState<any>()
  const [followers, setFollowers]= useState<any[]>([0])
  const [state, setstate] = useState<any>("")
  const [videos, setvideos] = useState<any[]>([])

  const {id}:any = useParams()

  const userId:any = localStorage.getItem("id")

  function sendImage(e:any){
    const formdata = new FormData()
      formdata.append("image", e[0])
      
      SendImageFun(formdata).then(function(result) {
        setstate(result)
      })}

      useEffect(()=>{

        // Here you get the information of a specific user and check if the page is the one of the logged in user.
        
        GetUserFun(id).then(function(res){
          setvideos(res[2]);setUser(res[0]);setImage(res[0].imageURL);setFollowers(res[0].followers); 
          if(res[0].id == userId){
            setEdit(<><input className='file' onChange={(e)=>{sendImage(e.target.files) }} type="file"/><EditIcon sx={{position: "absolute", transform: "translate(10px)",background: "rgb(255,255,255)",padding: "4px",borderRadius: "50%",boxShadow: "2px 3px 9px 2px rgba(0,0,0,0.75)"}}/></>)}
           else {setSuscribe(<Button onClick={()=>{SusLikeFun(id,"followers","users")}} sx={{marginBottom: "24px", marginTop: "15px"}} variant="contained" color={res[1].color}>{res[1].title}</Button>)}})
      },[])
      
 

    return (
      <Box m={2}>

        <Header/>
      
       <Grid mt={1} container spacing={2}>
        
        <Grid item xs={12}  display="flex" justifyContent="center">
        <Box borderRadius="50%" width="110px" height="110px">{edit}<img className='img' src={image !== null ? `http://localhost:4000/${id}-image.png` : "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="user"/></Box>  
       
       </Grid>

      <Grid mt={1} borderBottom="1px rgb(80,121,150) solid" item xs={12} textAlign="center">
        <Typography component="p" color="rgb(255,0,0)">{state}</Typography>
        <Typography variant="h2" fontSize="32px">{user.name}</Typography>
        <Typography mt={1.5} variant="h3" fontSize="17px" fontWeight={700}>{user.role}</Typography>
        <Typography mt={1.5} component="p" fontWeight={900}>{followers.length - 1}</Typography>
        {suscribe}
      </Grid>

      </Grid>

        <Grid mt={1} container spacing={2}>
          <Grid item xs={12}>
            
          {videos.map((stat)=>{
                  return (
                    <VideoCard key={stat.id} width={"20%"} title={stat.title} des={stat.des} video={stat.id}/>
                  )})}
          </Grid>
        </Grid>
      
  </Box>
    );
  }
  
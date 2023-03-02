import {Box, Grid} from '@mui/material';
import VideoCard from "../components/video-card"
import Header from '../components/header';
import {useState, useEffect} from "react"
import { GetVideos } from '../utils/api/api';

export default function Main() {
  const [videos, setVideos] = useState<any[]>([])
    // Here it get all the videos from the database.
    
    useEffect(()=>{
      GetVideos().then(function(result) {
      setVideos(result)
      
    })},[])

    return (
      <Box m={2}>
        <Header/>
        <Grid mt={1} container spacing={2}>
            <Grid item xs={12}>
                {videos.map((stat)=>{
                  return (
                    <VideoCard key={stat.id} width={"20%"} title={stat.title} des={stat.des} video={stat.id}/>
                  )
                })}
            </Grid>
        </Grid>
    </Box>
    );
  }
  
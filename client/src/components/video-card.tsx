import {Typography,CardContent,Card}from '@mui/material';
import {Box} from "@mui/material"
import {video} from "../models/interface"
import { useState } from 'react';

export default function VideoCard(prop: video) {

  const [description,setDescription] = useState<any>(prop.des)
  
  return (
    <Box onClick={()=>{window.location.href = `/video/${prop.video}`}} mt={2} display="inline-flex" sx={{justifyContent: "center",width: {xs: "100%", md: prop.width}}}>
      <Card sx={{ wordWrap: "break-word", wordBreak: "break-word",width: 300, "&:hover":{cursor: "pointer",boxShadow: "0px 0px 15px -2px rgba(0,0,0,0.75)"}}}>
          <Box height={180}>
            <video className='video' src={`http://localhost:4000/${prop.video}-video.mp4`}/>
          </Box>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            {prop.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {description.slice(0,20)}...
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
  
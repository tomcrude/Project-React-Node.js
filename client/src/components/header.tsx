import {Box, Grid,Link, Button} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function Header(props:any) {

const id = localStorage.getItem("id")

  function Logout(){
        localStorage.removeItem("token")
        localStorage.removeItem("token2")
        localStorage.removeItem("id")
        localStorage.removeItem("image")
        window.location.href = "/log-in"     
  }
    return (
        <Box component="header">
            <Grid borderBottom="1px rgb(80,121,150) solid" container spacing={2}>
                <Grid item md={0.5} xs={2} onClick={()=>{window.location.href = `/user/${id}`}}><Box sx={{"&:hover": {cursor: "pointer",boxShadow: "0px 0px 10px -2px rgba(0,0,0,0.75)"}}} borderRadius="50%" width="35px" height="35px"><img title='Me' className='img' src={localStorage.getItem("image") === "true" ? `http://localhost:4000/${localStorage.getItem("id")}-image.png`: "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="user"/></Box>  </Grid>
                <Grid item md={8} xs={8}><Link color="rgb(0,0,0)" sx={{textDecoration: "none",fontSize: {xs:"20px", md:"30px"}}} href='/main' title='main' ml={3}>Videos Creator Platform</Link></Grid>
                <Grid className={props.display == false ? "hidden" : ""} item md={3} xs={10} sx={{transform: "translateY(-6px)"}}><Button href='/video/create-edit/0' startIcon={<AddCircleIcon/>} variant="contained" color="primary">Upload video</Button></Grid>
                <Grid item md={0.5} xs={2} sx={{transform: {md:"translateY(-6px)",xs:"translateY(-60px)"}}} onClick={()=>{Logout()}}><LogoutIcon titleAccess='Log out' sx={{fontSize: "35px", "&:hover": {color: "rgb(255,255,255)",cursor: "pointer"}}}/></Grid>
    
            </Grid>
        </Box>
    );
  }
  
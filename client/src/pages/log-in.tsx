import {Link,Typography, Box, Grid, TextField, Button} from '@mui/material';
import {useState} from "react"
import {LogInFun} from "../utils/api/api"

export default function LogIn() {
 
    const [pass,setPass] = useState<string>("")
    const [mail,setMail] = useState<string>("")
    const [state,setState] = useState<string | undefined>("")
    
    function logIn(e:any){
    e.preventDefault()
    
    // In this part the client makes a request to the server and if everything went well it returns "success".

    LogInFun(mail,pass).then(function(result) {
     setState(result)
  });
  }
    
    return (
      <Box>
      <Grid alignContent="center" justifyContent="center" container spacing={2}>
        <Grid boxShadow="2px 3px 17px 2px rgba(0,0,0,0.75)" bgcolor="rgb(255,255,255)" mt={11} item borderRadius="1.5%" xs={10.5} md={8} xl={3}>
            <Box margin={5}>
            <Typography component="h1" fontSize="29px">Log in</Typography>
            <Box onSubmit={(e)=>{logIn(e)}} component="form">
          
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email address"
              name="email"
              value={mail}
              autoFocus
             onChange={(e)=>{setMail(e.target.value)}}
            />
            <TextField
            value={pass}
              margin="normal"
              required
              fullWidth
              label="Password"
              name="password"
              autoFocus
              type="password"
              onChange={(e)=>{setPass(e.target.value)}}
            />
            
            <Typography component="p" color="rgb(255,0,0)">{state}</Typography>

            <Button type='submit' variant="contained" fullWidth sx={{marginTop: "15px",marginBottom: "16px"}} color="primary">Send</Button>
            <Link display="block" href='sign-up' fontSize={18} sx={{textDecoration: "none", "&:hover": {color: "rgb(25, 118, 210)"}}} color="rgb(20,20,20)" textAlign="center">Need an account? SIGN UP.</Link>
            </Box>
            </Box>
        </Grid>
      </Grid>
        
    </Box>
    );
  }
  
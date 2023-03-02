import {Typography,Link, Box, Grid, TextField, Select,MenuItem, Button} from '@mui/material';
import { useState } from 'react';
import {SignUpFun} from "../utils/api/api"

export default function SignUp() {

    const [name,setName] = useState<string>("")
    const [pass,setPass] = useState<string>("")
    const [mail,setMail] = useState<string>("")
    const [role,setRole] = useState<string>("role")
    const [state,setState] = useState<string | undefined>("")

    function signUp(e:any){
      e.preventDefault()

      // This function makes a request to the server and if all goes well it saves the data in the database and returns "success".

      SignUpFun(mail,pass,name,role).then(function(result:any) {
      setState(result[0])
      })}

    return (
      <Box>
      <Grid alignContent="center" justifyContent="center" container spacing={2}>
        <Grid boxShadow="2px 3px 17px 2px rgba(0,0,0,0.75)" bgcolor="rgb(255,255,255)" mt={11} item borderRadius="1.5%" xs={10.5} md={8} xl={3}>
          <Box margin={5}>
          <Typography component="h1" fontSize="29px">Sign up</Typography>
          <Box component="form" onSubmit={(e)=>{signUp(e)}}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Name"
              name="name"
              autoFocus
              autoComplete='current-password'
              onChange={(e)=>{setName(e.target.value)}}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              name="password"
              autoFocus
              autoComplete='current-password'
              type="password"
              onChange={(e)=>{setPass(e.target.value)}}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email"
              name="mail"
              autoComplete='current-password'
              autoFocus
              type="email"
              onChange={(e)=>{setMail(e.target.value)}}
            />
            <Select
            sx={{marginTop: "13px"}}
            id="simple-select"
            autoComplete='current-password'
            value={role}
            onChange={(e)=>{setRole(e.target.value)}}
            >
            <MenuItem value="role">Select a role</MenuItem>
            <MenuItem value="student">student</MenuItem>
            <MenuItem value="teacher">teacher</MenuItem>
            </Select>

            <Typography component="p" color="rgb(255,0,0)" sx={{marginTop: "13px"}}>{state}</Typography>

            <Button type='submit' variant="contained" fullWidth sx={{marginTop: "13px",marginBottom: "16px"}} color="primary">Send</Button>
            
            <Link display="block" href='log-in' fontSize={18} sx={{textDecoration: "none", "&:hover": {color: "rgb(25, 118, 210)"}}} color="rgb(20,20,20)" textAlign="center">Already a user? LOGIN.</Link>
            
            </Box>
            </Box>
        </Grid>
      </Grid>
        
    </Box>
    );
  }
  
  
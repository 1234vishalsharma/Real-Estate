import { Button, Card, TextField, Typography } from '@mui/material'
import React , {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import toast , {Toaster} from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setToken } from '../../Store/reducers/authReducer';

const Login = () => {
  const dispatcher = useDispatch();
  const [email , setemail] = useState("");
  const [password , setpassword] = useState("");
  const router = useNavigate();
  const handelLogin = () => {
    if(!email || !password){
      alert("all fields are important");
      return;
    }
    console.log(email , "  " , password)
    fetch("http://localhost:4000/user/Login" , {
      method: "POST" , 
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        "username": email,
        "password": password
      })
    }).then(resp=>{
      return resp.json();
    }).then(data=>{
      if(data?.success){
        const token = localStorage.setItem('token' , data?.token);
        dispatcher(setToken(token));
        toast.success('Login Successful');
        setTimeout(()=>{
          router('/Home');
        } , 2000)
      }
    })
  }
  return (
    <div className='flex gap-2 justify-center items-center h-screen bg-slate-900 flex-col w-full'>
      <Toaster/>
      <Card className='h-80 w-96 flex flex-col gap-4 p-8'> 
        <Typography className="text-center" variant="h6">Login</Typography>
        <div className="flex flex-col gap-8 justify-center">
          <TextField onChange={(e)=>setemail(e.target.value)} variant='outlined' label='Uername / Email'></TextField>
          <TextField onChange={(e)=>setpassword(e.target.value)} variant='outlined' label='Password'></TextField>
          <Button onClick={handelLogin} variant= {'contained'} fullWidth={false}>Login Here</Button>
        </div>
      </Card>
    </div>
  )
}

export default Login

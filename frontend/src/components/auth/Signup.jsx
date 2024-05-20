import React , {useState} from 'react'
import {useNavigate} from 'react-router-dom';
import {Button , TextField , Card , Typography} from '@mui/material'
import toast , {Toaster} from 'react-hot-toast';
const Signup = () => {
  const [email , setemail] = useState();
  const [password , setpassword] = useState();
  const [name , setname] = useState();
  const router = useNavigate();
  const handelSignup = () => {
    if(!email || !password){
      alert("all fields are important");
      return;
    }
    console.log(email , " " , password , " " , name );
    fetch("http://localhost:4000/user/Signup" , {
      method: "POST" , 
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        'username': email,
        'password': password,
        'name' : name,
        'role': 'user'
      })
    }).then(resp=>{
      return resp.json()
    }).then(data=>{
      if(data?.success){
        toast('Signup Successful');
        setTimeout(()=>{
          router('/Login');
        } , 2000)
      }
    })
  }
  return (
    <div className='flex gap-2 justify-center items-center h-screen bg-slate-900 flex-col w-full'>
      <Toaster/>
      <Card className='h-100 w-96 flex flex-col gap-4 p-10'> 
        <Typography className="text-center" variant="h6">Signup</Typography>
        <div className="flex flex-col gap-8 justify-center">
          <TextField onChange={(e)=>setemail(e.target.value)} variant='outlined' label='Uername / Email'></TextField>
          <TextField onChange={(e)=>setname(e.target.value)} variant='outlined' label='Name'></TextField>
          <TextField onChange={(e)=>setpassword(e.target.value)} variant='outlined' label='Password'></TextField>
          <Button onClick={handelSignup} variant= {'contained'} fullWidth={false}>Sign up</Button>
        </div>
      </Card>
    </div>
  )
}

export default Signup

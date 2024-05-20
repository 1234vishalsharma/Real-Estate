import React , {useState} from 'react'
import { Button, Card, TextField, Typography } from '@mui/material'
import toast , {Toaster} from 'react-hot-toast';

const Adminsignup = () => {

    const [email , setemail] = useState("");
    const [name , setname] = useState("");
    const [password , setpassword] = useState("");
    const createAdmin = ()=>{
        if(!email || !password || !name){
            alert("name, email and password can't be empty");
            return ;
        }
        fetch('http://localhost:4000/admin/Signup' , {
            method: "POST", 
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify({
                username: email,
                password: password,
                name: name,
                role: "admin"
            })
        }).then((res)=>{
            return res.json();
        }).then((data)=>{
            console.log(data);
        }).catch((e)=>{
          console.log("Error occured while Signup" , e.message);
        })
    }
  return (
    <div className='flex gap-2 justify-center items-center h-screen bg-slate-900 flex-col w-full'>
      <Card className='h-100 w-96 flex flex-col gap-4 p-10'> 
        <Typography className="text-center" variant="h6">Create New Admin</Typography>
        <div className="flex flex-col gap-8 justify-center">
          <TextField onChange={(e)=>setname(e.target.value)} variant='outlined' label='Name'></TextField>
          <TextField onChange={(e)=>setemail(e.target.value)} variant='outlined' label='Email'></TextField>
          <TextField onChange={(e)=>setpassword(e.target.value)} variant='outlined' label='Password'></TextField>
          <Button onClick={createAdmin} variant= {'contained'} fullWidth={false}>Create Admin</Button>
        </div>
      </Card>
    </div>
  )
}

const Adminlogin = () => {
  const [email , setemail] = useState();
  const [password , setpassword] = useState();
  const adminLogin = () => {
    if(!email || !password){
      toast.error("Fields can't be empty")
    }
    fetch('http://localhost:4000/admin/Login' ,{
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body : JSON.stringify({
        username: email,
        password : password,
      })
    }).then((resp)=>{
      return resp.json();
    }).then((data)=>{
      console.log(data);
      localStorage.setItem('token' , data?.token);
    }).catch((e)=>{
      console.log("Error occured while login" , e.message);
    })
  }
  return (
    <div className='flex gap-2 justify-center items-center h-screen bg-slate-900 flex-col w-full'>
      <Toaster/>
      <Card className='h-80 w-96 flex flex-col gap-4 p-8'> 
        <Typography className="text-center" variant="h6">Admin Login</Typography>
        <div className="flex flex-col gap-8 justify-center">
          <TextField onChange={(e)=>setemail(e.target.value)} variant='outlined' label='Uername / Email'></TextField>
          <TextField onChange={(e)=>setpassword(e.target.value)} variant='outlined' label='Password'></TextField>
          <Button onClick={adminLogin} variant= {'contained'} fullWidth={false}>Login</Button>
        </div>
      </Card>
    </div>
  );
}

export  {Adminsignup ,Adminlogin};

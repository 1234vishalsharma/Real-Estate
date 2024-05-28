import React, { useState } from 'react';
import {Link , useNavigate} from 'react-router-dom';
import {Button} from '@mui/material';
import {ToastContainer , toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signin() {
  const router = useNavigate();
  const [username , setUsername] = useState("");
  const [password , setPassword] = useState("");  
  const notify = (text) => {
    toast(text , {
      theme: "dark",
      type: "error"
    });
  }
  const handelLogin = (e) => {
    e.preventDefault();
    if(!username || !password){
      notify("empty fields are not allowed");
      return;
    }
    console.log(username , password);
    fetch("http://localhost:8000/api/user/Login" , {
      method: "POST",
      headers: {
        'content-type' : 'application/json', 
      },
      body : JSON.stringify({
        username : username,
        password : password
      })
    }).then((resp) => {
      return resp.json();
    }).then((data) => {
      console.log(data);
      if(data.success){
        router('/')
        localStorage.setItem('token' , data.token_id);
      }
        }).catch((e) => {
      console.log("Error occured");
    })
  }

  return (
    <div>
      <ToastContainer/>
      <h2 className="text-2xl text-center font-semibold my-7">
        Login
      </h2>
    
      <form className='flex gap-4 flex-col mx-auto w-80'>
        <input onChange={e=>setUsername(e.target.value)} type="text" className="rounded-lg border p-3" placeholder='Username / Email' />
        
        <input onChange={e=>setPassword(e.target.value)} type="text" className="rounded-lg border p-3" placeholder='Password'/>
        
        <Button onClick={handelLogin} variant={"contained"}>Login</Button>
      </form>
      <div className='text-center mt-4 flex gap-3 justify-center'>
        <span>
          Don't Have an account ? 
        </span>
        <Link to={'/signup'} className="text-blue-700"> SignUp</Link>
      </div>

    </div>
  )
}

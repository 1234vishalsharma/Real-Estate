import React, { useEffect, useState } from 'react';
import {Link , useNavigate} from 'react-router-dom';
import {Button} from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import {useDispatch, useSelector} from 'react-redux';
import { signInSuccess , signInFailure , signInStart } from '../store/reducers/userSlice';
import OAuth from '../components/OAuth';

export default function Signin() {

  const router = useNavigate();
  const [username , setUsername] = useState("");
  const [password , setPassword] = useState("");  
  const dispatch = useDispatch();  
 
  const handelLogin = (e) => {
    e.preventDefault();
    dispatch(signInStart());
    if(!username || !password){
      toast.error("Empty Fields can't be processed.");
      return;
    }
    const toastId = toast.loading("Loading...");
    console.log(username , password);
    fetch("https://real-estste-ps7k.onrender.com/api/user/Login" , {
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
        dispatch(signInSuccess(data.token_id))
        localStorage.setItem('token' , data.token_id);

        toast.success("Login Success");
        toast.dismiss(toastId);

        setTimeout(() => {
          router('/');
        }, 2000 );
      }else{
        toast.error("Login Failed");
        toast.dismiss(toastId);
      }
    }).catch((e) => {
          toast.error("Login Failed due to issue occured");
          toast.dismiss(toastId);
          dispatch(signInFailure(e.message));
          console.log("Error occured");
    })
  }

  return (
    <div className='pt-16'>
      <Toaster/>
      <h2 className="text-2xl text-center font-semibold my-7">
        Login
      </h2>
    
      <form className='flex gap-4 flex-col mx-auto w-80'>
        <input onChange={e=>setUsername(e.target.value)} type="text" className="rounded-lg border p-3" placeholder='Username / Email' />
        
        <input onChange={e=>setPassword(e.target.value)} type="text" className="rounded-lg border p-3" placeholder='Password'/>
        
        <Button onClick={handelLogin} variant={"contained"}>Login</Button>
        <OAuth/>
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

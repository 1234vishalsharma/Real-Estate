import { Button } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import toast , {Toaster} from 'react-hot-toast'
import OAuth from '../components/OAuth';

export default function Signup() {
  const [number , setNumber] = useState();
  const [name , setName] = useState();
  const router = useNavigate();
  const [password , setPassword] = useState();
  const [username , setUsername] = useState();
  const handelSignup = () => { 
    if(!name || !number || !username || !password){
      toast.error("All fields are necessary");
      return;
    }
    const toastID = toast.loading("Creating Account...");
    fetch('https://real-estste-ps7k.onrender.com/api/user/Signup' , {
      method: "POST",
      headers: {
        'content-type' : 'application/json', 
      },
      body: JSON.stringify({
        username,
        password,
        name,
        phoneno:number
      })
    }).then((resp) => {
      return resp.json();
    }).then((data) => {
      console.log(data);
      if(data.success){
        toast.success("Account Created");
        toast.dismiss(toastID);
        setTimeout(()=>{
          router('/Signin')
        },2000);
      }
    }).catch((e) => {
      toast.error("Account not created");
      toast.dismiss(toastID);
      console.log("Error occured " , e);
    })
  }
  return (
    <div className='pt-16'>
      <Toaster/>
      <h2 className="text-2xl text-center font-semibold my-7">
        Sign up
      </h2>
    
      <form className='flex gap-4 flex-col mx-auto w-80'>
        <input onChange={e=>setName(e.target.value)} type="text" className="rounded-lg border p-3" placeholder='Name' />
       
        <input onChange={e=>setUsername(e.target.value)} type="text" className="rounded-lg border p-3" placeholder='Username / Email' />
        
        <input onChange={e=>setNumber(e.target.value)} type="text" className="rounded-lg border p-3" placeholder='Phone number' />
        
        <input onChange={e=>setPassword(e.target.value)} type="text" className="rounded-lg border p-3" placeholder='Password'/>
        
        <Button onClick={handelSignup} variant={"contained"}>Create Account</Button>
        <OAuth/>
      </form>
      <div className='text-center mt-4 flex gap-3 justify-center'>
        <span>
          Have an account ? 
        </span>
        <Link to={'/signin'} className="text-blue-700"> Sign In</Link>
      </div>
    </div>
  )
}

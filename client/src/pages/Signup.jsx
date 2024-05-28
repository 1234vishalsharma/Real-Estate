import { Button } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {toast , ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {
  const [number , setNumber] = useState();
  const [name , setName] = useState();
  const router = useNavigate();
  const [password , setPassword] = useState();
  const [username , setUsername] = useState();
  const handelSignup = () => { 
    if(!name || !number || !username || !password){
      toast("Fields are necessary" , {
        theme: "dark",
        type: "error"
      })
    }
    fetch('http://localhost:8000/api/user/Signup' , {
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
        router('/Signin')
      }
    }).catch((e) => {
      console.log("Error occured " , e);
    })
  }
  return (
    <div>
      <ToastContainer/>
      <h2 className="text-2xl text-center font-semibold my-7">
        Sign up
      </h2>
    
      <form className='flex gap-4 flex-col mx-auto w-80'>
        <input onChange={e=>setName(e.target.value)} type="text" className="rounded-lg border p-3" placeholder='Name' />
       
        <input onChange={e=>setUsername(e.target.value)} type="text" className="rounded-lg border p-3" placeholder='Username / Email' />
        
        <input onChange={e=>setNumber(e.target.value)} type="text" className="rounded-lg border p-3" placeholder='Phone number' />
        
        <input onChange={e=>setPassword(e.target.value)} type="text" className="rounded-lg border p-3" placeholder='Password'/>
        
        <Button onClick={handelSignup} variant={"contained"}>Create Account</Button>
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

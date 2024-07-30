import { Button } from '@mui/material';
import React from 'react';
import {app} from '../firebase';
import {GoogleAuthProvider , getAuth ,signInWithPopup} from 'firebase/auth';
import {useDispatch} from 'react-redux';
import { signInSuccess ,signInStart } from '../store/reducers/userSlice';
import {useNavigate} from 'react-router-dom';
import {ToastContainer , toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function OAuth() {
    const router = useNavigate();
    const dispatch = useDispatch();
    const handelGoogleAuth = async() => {
        try{
            dispatch(signInStart());
            const auth = getAuth(app);
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth , provider);
            console.log(result);
            const res = await fetch("http://localhost:8000/api/user/google" ,{
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL                    
                })
            });
            const data = await res.json();
            console.log(data);
            
            if(data.success){
                console.log(data?.token_id);
                dispatch(signInSuccess(data?.token_id));
                localStorage.setItem('token' , data?.token_id);
                toast("Login Successfull" , {
                    theme: "dark",
                    type: 'success'
                })
                setTimeout(()=>{
                    router('/');
                } , 2000)
                
            }else{
                toast("Faild to Login" , {
                    theme: "Dark",
                    type: 'error'
                })
            }

        }catch(e){
            console.log("Could not login " , e);    
        }
    }
  return (
    <div>
        <ToastContainer/>
      <Button onClick={handelGoogleAuth} type='button' variant='contained' fullWidth={true} style={{"backgroundColor":"green"}}>Continue with Google</Button>
    </div>
  )
}

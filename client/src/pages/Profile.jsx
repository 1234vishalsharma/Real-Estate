import React , {useState , useEffect} from 'react'
import {Button} from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import {useDispatch} from 'react-redux';
import { signInSuccess } from '../store/reducers/userSlice';

export default function Profile() {
  const location = useLocation();
  const data = location.state;
  console.log(data);
  const [userData , setUserData] = useState();
  const [profilePic , setProfilePic] = useState();
  const dispatch = useDispatch();
  useEffect(()=>{ 
    setUserData(data);
  } , [data])
  const UpdateProfilePic = () => {

  }
  const openExplorer = () => {
    // uploading image to firebase and then set it to profile pic
    document.getElementById('selectFile').click();
    document.getElementById('selectFile').addEventListener('change' , function(event){
      setProfilePic(event.target.files[0]);
    })
  }
  const handellogout = () => {
    dispatch(signInSuccess(null));
    localStorage.removeItem("token");
  }
  const removeUser = () => {
    console.log("User data is (UserData state wala) : " , userData.username);
    fetch("http://localhost:8000/api/user/rm_user" , {
      method : "POST",
      headers : {
        'contant-type' : 'application/json'
      },
      body: JSON.stringify({
        username : userData?.username
      })
    }).then((res)=>{
      return res.json();
    }).then((data)=>{
      console.log(data);
    }).catch((e) => {
      console.log("Error occured: ",e.message);
    })
  }
  if(data){  return (
    <div>
      <h2 className='text-center text-2xl font-semibold mt-4 text-slate-600'>Profile</h2>
      <div className="flex gap-4 mt-1 p-8 items-center justify-evenly max-md:flex-col">

            <form className='flex gap-4 flex-col w-96 mt-10'>
              <input className='p-4 rounded-lg border border-slate-600 text-slate-800' type="text" placeholder={userData?.name}/>
              <input className='p-4 rounded-lg border border-slate-600 text-slate-800'  type="text" placeholder={userData?.username}/>
              <input className='p-4 rounded-lg border border-slate-600 text-slate-800'  type="text" placeholder='Phone Number'/>
              <Button variant={'contained'} style={{'backgroundColor' : 'red'}}>Update Profile</Button>
              <Button variant={'contained'} style={{'backgroundColor' : 'green'}}>ADD Property</Button>
              <div className='flex justify-between'>
                <span onClick={removeUser} className="text-red-900 font-semibold cursor-pointer">Delete Account</span>
                <span onClick={handellogout} className='font-semibold text-blue-700 cursor-pointer'>Logout</span>
              </div>
            </form>

          <div className='flex flex-col gap-4 items-center justify-center'>
            <img src={data.profile_pic} className="h-40 w-40 rounded-full" alt="Loading" />
            <div className='flex gap-4'>
              <Button  onClick={openExplorer} variant="contained" style={{"backgroundColor" : "red"}}>Change Avatar
              <input id='selectFile' type="file" hidden />
              </Button>
              <Button onClick={UpdateProfilePic} variant="contained" style={{"backgroundColor" : "green"}}>Update Avatar</Button>
            </div>
        </div>      
      </div>
    </div>
  )}
}

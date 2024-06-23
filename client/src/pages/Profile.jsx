import React , {useState , useEffect} from 'react'
import {Button} from '@mui/material'
import {useDispatch, useSelector} from 'react-redux';
import { signInSuccess } from '../store/reducers/userSlice';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from 'react-router-dom';


function Generate(){
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const number = "1234567890";
  const symbol = '!@#$%^&*';
  const allSymbols = uppercase + lowercase + number + symbol;
  let pid = "";    
  for(let i = 0;i < 8; i++){
      let ind = Math.floor(Math.random() * allSymbols.length);
      pid += allSymbols[ind];
  }
  return pid;
}


export default function Profile() {
  
  const [userData , setUserData] = useState();
  const [profilePic , setProfilePic] = useState(null);
  const [profile , setProfile] = useState("");
  const [name , setName] = useState();
  const [number , setNumber] = useState();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const router = useNavigate();
 
  const UpdateProfilePic = () => {
      if(profilePic){
          const metadata = {
            contentType: profilePic.type
          };
          const storage = getStorage();
          const refer = ref(storage, `ProfilePics/${userData?.username}/` + profilePic?.name);
          const uploadTask = uploadBytesResumable(refer, profilePic, metadata);
    
    
          uploadTask.on('state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          
    
          progress==100 && getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            setProfile(downloadURL);
            alert("plz press uplate profile button")
            // saveToDb(userData.username,downloadURL);
            console.log("profile pic uplaoded successfully");
          });
        },)  
      }
  }   
  
  const UpdateUser = () => {
    
    const profile_pic = profile ? profile : userData.profile_pic;
    console.log("Current user token is: " , currentUser);
    fetch("http://localhost:8000/api/user/UpdateUser" , {
      method: "PUT",
      headers: {
        'content-type' : 'application/json',
        'token' : currentUser
      },
      body : JSON.stringify({
        username: userData?.username,
        name,
        phoneno: number,
        profile_pic
      })
    }).then((res) => {
      return res.json();
    }).then((data)=>{
      console.log("Updates data is here : " , data);
      setUserData(data?.User);
    
    }).catch((e)=>{
      console.log("Error occured " , e);
    })
  }
  
  
  const openExplorer = () => {
    // uploading image to firebase and then set it to profile pic
    document.getElementById('selectFile').click();
    document.getElementById('selectFile').addEventListener('change' , function(event){
      setProfilePic(event.target.files[0]);
      console.log(event.target.files);
    })    
  }
 
  
  const handellogout = () => {
    dispatch(signInSuccess(null));
    localStorage.removeItem("token");
  }
  
  
  const removeUser = () => {
    fetch("http://localhost:8000/api/user/rm_user" , {
      method : "DELETE",
      headers : {
        'content-type' : 'application/json'
      },
      body: JSON.stringify({
        username : userData?.username
      })
    }).then((res)=>{
      return res.json();
    }).then((data)=>{
      console.log(data);
      if(data.success){
        dispatch(signInSuccess(null));
        localStorage.removeItem('token');
      }
    }).catch((e) => {
      console.log("Error occured: ",e.message);
    })
  }
  const addPost = () => {
    const PID = Generate();
    router(`/PostSite/${PID}`);
  }

   useEffect(()=>{
    fetch('http://localhost:8000/api/user/get_user' , {
        method: "POST",
        headers:{
            'content-type' : 'application/json',
        },
        body: JSON.stringify({
            token : currentUser
        })
    }).then((res)=>{
        return res.json();
    }).then((data)=>{
        setUserData(data);
        console.log("User data ye hai: ", data);

    }).catch((e)=>{
        console.log("err occured ", e);
    })
} , [currentUser]);



  if (userData) return (
    <div>
      <h2 className='text-center text-2xl font-semibold mt-4 text-slate-600'>Profile</h2>
      <div className="flex gap-4 mt-1 p-8 items-center justify-evenly max-md:flex-col">

            <form className='flex gap-4 flex-col w-96 mt-10'>
              <input onChange = {(e)=>setName(e.target.value)} className='p-4 rounded-lg border border-slate-600 text-slate-800' type="text" defaultValue={userData?.name}/>
              <input className='p-4 rounded-lg border border-slate-600 text-slate-800'  type="text" value={userData?.username}/>
              <input onChange={(e)=>setNumber(e.target.value)} className='p-4 rounded-lg border border-slate-600 text-slate-800'  type="text" defaultValue  ={userData?.phoneno}/>
              <Button onClick={UpdateUser} variant={'contained'} style={{'backgroundColor' : 'red'}}>Update Profile</Button>
              <Button onClick={addPost} variant={'contained'} style={{'backgroundColor' : 'green'}}>ADD Property</Button>
              <div className='flex justify-between'>
                <span onClick={removeUser} className="text-red-900 font-semibold cursor-pointer">Delete Account</span>
                <span onClick={handellogout} className='font-semibold text-blue-700 cursor-pointer'>Logout</span>
              </div>
            </form>

          <div className='flex flex-col gap-4 items-center justify-center'>
            { !profile && <img src={userData.profile_pic} className="h-40 w-40 rounded-full" alt="Loading" />}
            { profile && <img src={profile} className="h-40 w-40 rounded-full" alt="Loading" />}
            <div className='flex gap-4'>
              <Button  onClick={openExplorer} variant="contained" style={{"backgroundColor" : "red"}}>Change Avatar
              <input id='selectFile' type="file" hidden />
              </Button>
              <Button onClick={UpdateProfilePic} variant="contained" style={{"backgroundColor" : "green"}}>Update Avatar</Button>
            </div>
        </div>      
      </div>
    </div>
  )
}

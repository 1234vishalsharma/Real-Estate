import React, { useEffect , useState } from 'react';
import {Link} from 'react-router-dom';
import {FaSearch} from 'react-icons/fa';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

export default function Header() {
    const router = useNavigate();
    const [userpic , setUserpic] = useState();
    const currentUser = useSelector((state) => state.user.currentUser);

    const showProfile = () => {
        router('/profile');
        return;
    }

    useEffect(()=>{
    } , [userpic]);

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
                // console.log(data);
                setUserpic(data.profile_pic);
            }).catch((e)=>{
                console.log("err occured ", e);
            })
        } , [currentUser , userpic]);
  
    return (
    <header className='w-full h-16 p-8 bg-slate-300 flex justify-between items-center'>
        <Link to="/" className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-700'>
                Real
            </span>
            <span className='text-slate-800'>
                Estate
            </span>
        </Link>
        <form className='p-3 rounded-lg bg-slate-100 flex items-center'>
            <input className="bg-transparent focus:outline-none" type="text" placeholder='Search...' />
            <FaSearch/>
        </form>

        <ul className='flex gap-4 items-center'>
            <Link to='/' className='hidden sm:inline cursor-pointer hover:text-slate-400'>Home</Link>
            <Link to='/About' className='hidden sm:inline cursor-pointer hover:text-slate-400'>About</Link>
            {!currentUser && <Link to='/Signin' className='cursor-pointer hover:text-slate-400'>Sign in</Link> }
            {currentUser &&  userpic && <img onClick={showProfile}  src={userpic} alt="Loading" className='h-8 w-8 rounded-full cursor-pointer'/> }
        </ul>

    </header>
  )
}

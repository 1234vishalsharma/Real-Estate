import { Button, Typography } from '@mui/material';
import { Menu ,X} from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../Store/reducers/authReducer';

const AppBar = () => {
    const [menu , setMenu] = useState(false);
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    console.log(token);
    const handelLogout = () => {
      dispatch(logout());
      localStorage.setItem('token' , null);
    }
    
  return (
    <div className="flex justify-between fixed z-10 top-0 items-center w-full bg-main p-4 bg-slate-800">
      <div>
        <Typography variant="h6" component="h2" className='font-bold text-white cursor-pointer hover:text-gray-400 '>RealEstate.Com</Typography>
      </div>
      {token === "null" ? <div className='flex justify-center gap-4 text-white'>
        <Button variant={'contained'} href='/Login'>Login</Button>
        <Button variant={'contained'} href='/Signup'>Signup</Button>
      </div> : <div>
          <Button onClick = {handelLogout} variant={'contained'}>Logout / Signout</Button>
        </div>}
       {/* Nav items */}
        <div className='flex gap-4 text-white justify-center items-center max-md:hidden'>

            <Typography className='cursor-pointer hover:text-gray-400'>
                <Link to='/'>Checkout Properties</Link>
            </Typography>
        
            <Typography className='cursor-pointer hover:text-gray-400'>
                <Link to='/'>Contact Us</Link>
            </Typography>
        
        </div> 
        {/* menuItems */}
        <div className='justify-center items-center hidden max-md:block'>
            {!menu && <Menu className='float-right' color='white' onClick={()=>setMenu(!menu)}/>}
            {menu && <X className='float-right' color='white' onClick={()=>setMenu(!menu)}/>}


            {menu && <div className='text-gray-400 md:hidden list-none flex flex-col gap-4 pr-4'>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/'>About</Link></li>
            <li><Link to='/'>Search</Link></li>
            <li><Link to='/'>Contact</Link></li>            
        </div>
        }
        </div>
    </div>
  )
}

export default AppBar

import React from 'react';
import {Link} from 'react-router-dom';
import {FaSearch} from 'react-icons/fa';


export default function Header() {
  return (
    <header className='w-full h-16 p-8 bg-slate-300 flex justify-between items-center'>
        <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-700'>
                Real
            </span>
            <span className='text-slate-800'>
                Estate
            </span>
        </h1>
        <form className='p-3 rounded-lg bg-slate-100 flex items-center'>
            <input className="bg-transparent focus:outline-none" type="text" placeholder='Search...' />
            <FaSearch/>
        </form>

        <ul className='flex gap-4'>
            <Link to='/' className='hidden sm:inline cursor-pointer hover:text-slate-400'>Home</Link>
            <Link to='/About' className='hidden sm:inline cursor-pointer hover:text-slate-400'>About</Link>
            <Link to='/Signin' className='cursor-pointer hover:text-slate-400'>Sign in</Link>
        </ul>

    </header>
  )
}

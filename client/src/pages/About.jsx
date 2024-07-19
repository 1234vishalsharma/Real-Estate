import React from 'react'
import {Typography} from '@mui/material';
import profile from '../../public/portfile.jpg'
export default function About() {
  return (
    <div className="flex justify-evenly items-center h-full w-full gap-8 mt-32">
      <div className='h-96 w-96 bg-black rounded-lg overflow-hidden'>
        <img className='h-full border border-black w-full text-white rounded-lg' src={profile} alt="Owner Image..." />
      </div>
      <div className='h-96 w-2/4 flex flex-col gap-8'>
        <Typography variant={"h3"} style={{'textAlign' : 'center'}}>About Us</Typography>
        <p className='text-justify text-lg'>
          With 15+ Years of Professional experience in Selling and purchasing of Lands/Property with a best affordable price in the Whole market.
          Trusted by all the pervious purchasers and sellers. Its time to expand your network by connecting with me.
          <br /> <br/>
          Want to know more, <span className='font-bold'>Contact Us</span>.
        </p>
        <div className='text-lg'>
          <span> <span className='font-bold'>Name :</span> Shri Dharmender Sharma</span> <br/>
          <span> <span className='font-bold'>Phone Number :</span> <a className='text-blue-500' href="tel: +91 9818544256">+91 98185 44256</a></span> <br/>
          <span><span className='font-bold'>Email :</span> <a className="text-blue-500" href="mailto:Sharmacons12@gmail.com"> Sharmacons12@gmail.com </a></span>
        </div>
      </div>
    </div>
  )
}

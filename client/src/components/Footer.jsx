import React from 'react';
import profile from '/portfile.jpg';
import location from "../../public/location.png"
const Footer = () => {
  return (
    <div className='bg-slate-900 h-96 w-full flex justify-evenly text-white items-center mt-64 p-0'>

        <img className='rounded-full h-64 w-64' src={profile} alt="Loading..."/>

        <div className='flex flex-col gap-5'>
            <span className='text-lg font-semibold'>Get In Touch</span>
            <div className='flex gap-2 flex-col'>
                <span>Email : sharmacons12@gmail.com</span>
                <span>Phone No. : +91 98185 44256</span>
                <span>Whatsapp : +91 98185 44256</span>
            </div>
        </div>
        <div className='flex flex-col gap-5'>
            <span className='text-lg font-semibold'>Location</span>
            <div className='flex gap-2 flex-col'>
               <img className='h-16 w-16' src={location} alt="...." /> 
            </div>
        </div>
        <div className='flex flex-col gap-5'>
            <span className='text-lg font-semibold'>Raise Complaint</span>
            <div className='flex gap-2 flex-col'>
                <span>Email : sharmacons12@gmail.com</span>
                <span>Phone No. : +91 98185 44256</span>
                <span>Whatsapp : +91 98185 44256</span>
            </div>
        </div>


        
    </div>
  )
}

export default Footer

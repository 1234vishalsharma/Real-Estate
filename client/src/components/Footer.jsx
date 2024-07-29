import React from 'react';
import profile from '/portfile.jpg';
import location from "../../public/location.png"
const Footer = () => {
  return (
    <div className='bg-slate-900 h-96 w-full flex justify-evenly items-center text-white  mt-64 p-0'>

        <img className='rounded-full h-64 w-64' src={profile} alt="Loading..."/>

        <div className='flex flex-col gap-5'>
            <span className='text-lg text-blue-700 font-semibold'>Get In Touch</span>
            <div className='flex gap-2 flex-col'>
                <span>Email : <a className='hover:text-blue-400' href='mailto:sharmacons12@gmail.com'>sharmacons12@gmail.com</a></span>
                <span>Phone No. : <a className='hover:text-blue-400' href='tel:+91 9818544256'>+91 98185 44256</a></span>
                <span>Whatsapp : <a className='hover:text-blue-400' href='https://wa.me/919818544256'>+91 98185 44256</a></span>
            </div>
        </div>
        
        <div className='flex flex-col gap-5'>
            <span className='text-lg text-blue-700 font-semibold'>Raise Complaint</span>
            <div className='flex gap-2 flex-col'>
            <span>Email : <a className='hover:text-blue-400' href='mailto:sharmacons12@gmail.com'>sharmacons12@gmail.com</a></span>
                <span>Phone No. : <a className='hover:text-blue-400' href='tel:+91 9818544256'>+91 98185 44256</a></span>
                <span>Whatsapp : <a className='hover:text-blue-400' href='https://wa.me/919818544256'>+91 98185 44256</a></span>
            </div>
        </div>

        <div className='flex flex-col items-center gap-5'>
            <span className='text-lg font-semibold text-blue-700'>Location</span>
            <div className='flex gap-2 items-center flex-col'>
               {/* <img className='h-8 w-8' src={location} alt="...." />  */}
               <img src="https://www.google.com/maps/vt/data=XfQ3hx8kDtQJLntnOsEyHBiK8AtgfVFNXfU2z5vxuylzNwE75u7lgXWcxBLuddoeIQODoMXd5S2vttaw_fXEVtcprPEaHKdUX2MGXcj087k_V3tbWRT8G0xuwqDLSLakd9yrdepdK5OUkEhU2budJB6Y-2kXcdlNP8PgozqyZ9RnBkJ4PRzhtEmyF-xbe8ohENzTqMprlM3GDUNxm52H_RWhs4eDXcPmuzQ"
                className='h-64 w-70'   
                alt="Loading..." />
            </div>
        </div>

        
    </div>
  )
}

export default Footer

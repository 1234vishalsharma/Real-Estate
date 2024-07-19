import React from 'react';
import {useLocation} from 'react-router-dom';
import {Typography, Button} from '@mui/material';
import SimpleImageSlider from "react-simple-image-slider";
import {useNavigate} from 'react-router-dom';
function Site(){
    const location  = useLocation();
    const data = location.state;
    console.log(data);
    const navigate = useNavigate();
    const contactHandeller = () =>{
        navigate('/About');
    }

    return(
        <div className='flex h-full w-full bg-[#e5e5e5]'>
            <div className=' flex gap-8 w-full m-10 h-96 '>
                 {/* temporary single image tag, here crousel will be implemented. */}
                 <SimpleImageSlider style={{'objectFit' : 'cover'}} width={800} loop={true} height={400} images={data.images} autoPlay={true} showBullets={true} showNavs={true}/>
               <div className='flex flex-col gap-1'>
                <span className='text-center font-bold text-xl'>Site Details</span>
                    <Typography>Site Name - <span className='text-lg'>{data.name} </span></Typography>
                    <Typography>Site Description - <span className='text-lg'>{data.desc} </span></Typography>
                    <Typography>Address - <span className='text-lg'>{data.address} </span></Typography>
                    <Typography>Parking - <span className='text-lg'>{data.parking ? <span className='text-green-700'>Available</span> : <span className='text-red-700'>Not Available</span>} </span></Typography>
                    <Typography>Bedrooms - <span className='text-lg'>{data.bedrooms} </span></Typography>
                    <Typography>Bathrooms - <span className='text-lg'>{data.bathrooms} </span></Typography>
                    <Typography>For - <span className='text-lg'>{data.sitetype} </span></Typography>
                    <Typography>Price -  <span className='text-lg line-through text-red-700'>{data.regularPrice} INR</span> <span className='text-xl text-green-500'>{data.discountedPrice} INR</span></Typography>

                    <div className='w-full flex justify-center items-center mt-8'>
                        <Button onClick={contactHandeller} style={{'backgroundColor' : 'Blue' , 'color' : 'White', 'alignItems': 'center' }} varinat="contained">Contact For More Details</Button>
                    </div>
               
               </div>
            </div>
        </div>
    )
}

export default Site;
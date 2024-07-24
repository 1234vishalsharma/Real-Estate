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
        <div className='flex flex-col h-full max-w-screen pt-16'>
            <span className='text-center mt-4 mb-3 text-lg font-bold'>Site Overview</span>
            <div className=' flex gap-8S flex-col'>
                 {/* temporary single image tag, here crousel will be implemented. */}
                 <div className='flex gap-2 justify-center '>
                    <SimpleImageSlider  width={700} height={500} loop={true} images={data.images} autoPlay={true} showNavs={true}/>
                    {/* <SimpleImageSlider style={{'border':'2px solid black'}} width={700} height={500} loop={true} images={data.images} autoPlay={true} showNavs={true}/> */}
                 </div>
               <div className='flex flex-col gap-1 ml-10'>
                    <span className='font-bold text-xl'>Site Details</span>
                    <Typography>Site Name - <span className='text-lg'>{data.name} </span></Typography>
                    <Typography>Site Description - <span className='text-lg'>{data.desc} </span></Typography>
                    <Typography>Location - <span className='text-lg'>{data.address} </span></Typography>
                    <Typography>Area - <span className='text-lg'>{data.area} sqft</span></Typography>
                    <Typography>Parking - <span className='text-lg'>{data.parking ? <span className='text-green-700'>Available</span> : <span className='text-red-700'>Not Available</span>} </span></Typography>
                    <Typography>Bedrooms - <span className='text-lg'>{data.bedrooms} </span></Typography>
                    <Typography>Bathrooms - <span className='text-lg'>{data.bathrooms} </span></Typography>
                    <Typography>Mode - <span className='text-lg'>{data.sitetype} </span></Typography>
                    <Typography>Price -  <span className='text-lg line-through text-red-700'>{data.regularPrice} INR</span> <span className='text-xl text-green-500'>{data.discountedPrice} INR</span></Typography>

                    <div className='w-full mt-4 mb-8'>
                        <Button onClick={contactHandeller} style={{'backgroundColor' : 'Green' , 'color' : 'White' }} varinat="contained">Contact For More Details</Button>
                    </div>
               
               </div>
            </div>
        </div>
    )
}

export default Site;
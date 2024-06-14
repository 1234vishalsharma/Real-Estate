import React, { useState } from 'react'
import { TextField , Button  ,Typography } from '@mui/material';
import { useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable } from 'firebase/storage';

function Generate(){
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const number = "1234567890";
    const symbol = '!@#$%^&*?|';
    const allSymbols = uppercase + lowercase + number + symbol;
    let pid = "";    
    for(let i = 0;i < 8; i++){
        let ind = Math.floor(Math.random() * allSymbols.length);
        pid += allSymbols[ind];
    }
    console.log("pid is " , pid);
    return pid;
}


export default function PostProperty() {
    const [rent , setRent] = useState(false);
    const [sell , setSell] = useState(false);
    const [siteImages , setSiteImages] = useState();
    const pid = Generate();
    const UploadSiteImages = () => {
        if(siteImages){
            const metadata = {
              contentType: siteImages.type
            };
            const storage = getStorage();
            const refer = ref(storage, `SiteImages/${pid}/` + siteImages?.name);
            const uploadTask = uploadBytesResumable(refer, siteImages, metadata);
      
      
            uploadTask.on('state_changed',
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            
      
            progress==100 && getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('site images', downloadURL);
            });
          },)  
        }
    }

  return (
    <div className='flex justify-center mt-8 gap-32'>
        
        <div className='flex flex-col items-center gap-10'>
        <h2 className='text-center text-2xl text-slate-700 font-bold'>Post Property</h2>    
            <div className='flex flex-col items-center gap-4'>
                <TextField style={{"width": "20rem"}} label="Site Name / Address"></TextField>
                <TextField style={{"width": "20rem"}} label="Site Description"></TextField>
            </div>
            <div className='border border-black p-4 w-96'>
                <input onChange= {(e) => setSiteImages(e.target.files)} type="file" className="w-64"/>
                <Button onClick={UploadSiteImages} variant= {"contained"} style={{"backgroundColor":"red"}}> Upload</Button>
            </div>
            <Button variant={"contained"} style={{"width":"20rem", "backgroundColor":"Green"}}>Post Site</Button>
        </div>  

        {/* <div className='mt-16'>
            <span className='font-semibold text-lg flex justify-center'>More Options</span>  
                <div className='flex flex-wrap gap-4 w-96 justify-between mt-8'>

                        <div className='flex items-center justify-between'>
                            <label>Parking</label>
                            <input type="checkbox" className='h-8 w-16 outline-none border border-black p-2' />
                        </div>
                        <div className='flex items-center w-32 justify-between'>
                            <label>Furnished</label>
                            <input type="checkbox" className='h-8 w-16 outline-none border border-black p-2' />
                        </div>
                        <div className='flex items-center w-32 justify-between'>
                            <label>Rent</label>
                            <input onClick={(e) => setRent(!rent)} type="checkbox" className='h-8 w-16 outline-none border border-black p-2' />
                        </div>
                        <div className='flex items-center w-32 justify-between'>
                            <label>Sell</label>
                            <input onClick={(e) => setSell(!sell)} type="checkbox" className='h-8 w-16 outline-none border border-black p-2' />
                        </div>
                        <div className='flex items-center w-32 justify-between'>
                            <label>Plot</label>
                            <input type="checkbox" className='h-8 w-16 outline-none border border-black p-2' />
                        </div>
                        <div className='flex items-center w-32 justify-between'>
                            <label>Independent House</label>
                            <input type="checkbox" className='h-8 w-16 outline-none border border-black p-2' />
                        </div>
                        <div className='flex items-center w-32 justify-between'>
                            <label>Flat</label>
                            <input type="checkbox" className='h-8 w-16 outline-none border border-black p-2' />
                        </div>

                    <div className='flex items-center w-32 justify-between'>
                        <label>Floors</label>
                        <input type="number" defaultValue={0} className='h-8 w-16 outline-none ml-5 border border-black p-2' />
                    </div>
                    
                    <div className='flex items-center-center w-40 justify-between'>
                        <label>Bedrooms</label>
                        <input type="number" defaultValue={0} className='h-8 w-16 outline-none ml-5 border border-black p-2' />
                    </div>

                    <div className='flex items-center w-40 justify-between'>
                        <label>Bathrooms</label>
                        <input type="number" defaultValue={0} className='h-8 w-16 outline-none ml-5 border border-black p-2' />
                    </div>      
                     
                </div>
                <div className='flex'>
                         
                    <div className='flex flex-col mt-8 gap-4 '>
                        <div className='flex items-center'>
                            <label>Regular price</label>
                            <input type="text" defaultValue={0} className='h-8 w-16 outline-none ml-5 border border-black p-2 mr-2' />
                            {!rent ? <span>₹</span> :
                            <span>(₹ / month)</span> }
                        </div>                    
                        <div className='flex items-center'>
                            <label>Discounted price</label>
                            <input type="text" defaultValue={0} className='h-8 w-16 outline-none ml-5 border border-black p-2 mr-2' />
                            {!rent ? <span>₹</span> :
                            <span>(₹ / month)</span> }
                        </div>                  

                       
                    </div>
                </div>
        </div>   */}

        <div className='mt-8'>
            <div>
                <Typography variant={'h6'}>More information</Typography>
            </div>

            <div className='flex gap-8 mt-5'>
                <div className='flex items-center justify-center gap-2'>
                    <input onClick={(e)=>setRent(!rent)} className='h-6 w-6' type="radio" name='type' />
                    <Typography>Rent</Typography>
                </div>

                <div className='flex items-center justify-center gap-2'>
                    <input onChange={(e)=>setSell(!sell)} className='h-6 w-6' type="radio" name="type" />
                    <Typography>Sell</Typography>
                </div>

            </div>
        </div>

    </div>
  )
}

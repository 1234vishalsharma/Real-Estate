import React, { useState , useEffect } from 'react'
import { TextField , Button  ,Typography } from '@mui/material';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import {  useParams  } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';

export default function PostProperty() {
    const {PID} = useParams();
    const [Sitename , setSiteName] = useState();
    const [Sitedesc , setSiteDesc] = useState();
    const [rent , setRent] = useState(true); 
    const [sell , setSell] = useState(false); 
    const [parking , setParking] = useState(false); 
    const [bedrooms, setBedrooms] = useState(0); 
    const [bathrooms , setBathrooms] = useState(0); 
    const [regularPrice , setRegularPrice] = useState(); 
    const [discountedPrice , setDiscountedPrice] = useState(); 
    const [ImageUrls , setImageUrls] = useState([]);
    const [siteImages , setSiteImages] = useState([]);
    const token = useSelector(state => state.user.currentUser);

    const handelSell = () => {
        setSell(true);
        setRent(false);
        
    }
    const handelRent = () => {
        setRent(true);
        setSell(false);
    }
    const UploadSiteImages = async() => {
        const toastID = toast.loading("Uploading Files...");
        console.log("Image details are: ", siteImages , PID);
        let i = 0;
        while(i < siteImages.length){
            if(PID && siteImages[i]){
                const metadata = {
                  contentType: siteImages[i].type
                };
                const storage = getStorage();
                const refer = ref(storage, `SiteImages/${PID}/` + siteImages[i]?.name);
                const uploadTask = uploadBytesResumable(refer, siteImages[i], metadata);
          
                uploadTask.on('state_changed', (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                
                progress==100 && getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  console.log('site images', downloadURL);
                  setImageUrls(prev => [...prev , downloadURL]);                  
                });
              },)  
            }
            i++;
        }
        if(i == siteImages.length){
            setTimeout(() => {
                toast.success("Files Uploaded Successfully");
                toast.dismiss(toastID);
            } , 2000);
        }
    }

    const postData = () => {
        
        if(!Sitename || !Sitedesc || !bedrooms || !bathrooms || !regularPrice || !discountedPrice || !ImageUrls){
            alert("Cannot post data please fill all fields carefully");
            return;
        }
        if(!PID){
            alert("Something Went Wrong");
            return;
        }
        const toastId = toast.loading("Posting Site...");
        console.log(token);
        fetch('http://localhost:8000/api/user/post_property',{
            method : "POST",
            headers : {
                "content-type" : "application/json",
                "token" : token
            },
            body : JSON.stringify({
                PID , Sitename , Sitedesc , rent , sell , parking , bedrooms, bathrooms , regularPrice , discountedPrice , ImageUrls
            })
        }).then((res)=>{
            return res.json();
        }).then((data) => {
            setTimeout(() => {
                toast.success("Posting Successful");
                toast.dismiss(toastId);
            } , 2000);
            console.log("Data is: " , data);
        }).catch((e) => {
            setTimeout(() => {
                toast.success("Posting Discarded");
                toast.dismiss(toastId);
            } , 2000);
        })
        
        console.log("Site data is " , {PID ,Sitename, Sitedesc, rent, sell, parking, bedrooms, bathrooms, regularPrice, discountedPrice , ImageUrls});
    }

    useEffect(()=>{
        // console.log("Rent: ", rent, "Sell is: ",sell);
        // console.log("parking is: ", parking);
        // console.log("bedrooms is: ", bedrooms);
        // console.log("bathrooms is: ", bathrooms);
        // console.log("regularPrice is: ", regularPrice);
        // console.log("discountedPrice is: ", discountedPrice);
    }, [rent,sell,parking,bedrooms,bathrooms,regularPrice,discountedPrice])

  return (
    <div className='justify-center mt-8 gap-32 sm:flex'>
        <Toaster/>
        <div className='flex flex-col items-center gap-10'>
        <h2 className='text-center text-2xl text-slate-700 font-bold'>Post Property</h2>    
            <div className='flex flex-col items-center gap-4'>
                <TextField onChange={(e)=>setSiteName(e.target.value)} style={{"width": "20rem"}} label="Site Name / Address"></TextField>
                <TextField onChange={(e)=>setSiteDesc(e.target.value)} style={{"width": "20rem"}} label="Site Description"></TextField>
            </div>
            <div className='border border-black p-4 w-96'>
                <input onChange= {(e) => setSiteImages(e.target.files)} type="file" multiple className="w-64"/>
                <Button onClick={UploadSiteImages} variant= {"contained"} style={{"backgroundColor":"red"}}> Upload</Button>
            </div>
            <Button onClick={postData} variant={"contained"} style={{"width":"20rem", "backgroundColor":"Green"}}>Post Site</Button>
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
            <div className='text-center'>
                <Typography style ={{'font': 'bold', 'fontSize':'20px', 'fontWeight':'600'}} variant={'h6'}>More information</Typography>
            </div>

            <div className='flex gap-2 mt-5 flex-col'>
                <Typography style ={{'font': 'bold', 'fontSize':'20px', 'fontWeight':'600'}}>Type</Typography>
                <div className='flex gap-2 ml-6'>
                    <input defaultChecked onClick={handelRent} className='h-6 w-6' type="radio" name='type' />
                    <Typography>Rent</Typography>
                </div>

                <div className='flex gap-2 ml-6'>
                    <input onClick={handelSell} className='h-6 w-6' type="radio" name="type" />
                    <Typography>Sell</Typography>
                </div>

            </div>
            <div className='flex flex-col gap-2 mt-4'>
                    <Typography style ={{'font': 'bold', 'fontSize':'20px', 'fontWeight':'600'}}>Additional</Typography>
                <div className='flex gap-2 ml-6'>
                    <input onChange={(e)=>{setParking(!parking)}} className='h-6 w-6' type="checkbox" name="type" />
                    <Typography style={{'marginLeft':'32px'}}>Parking</Typography>
                </div>
                <div className='flex gap-2 ml-6'>
                    <input defaultValue={0} onChange={(e)=>setBedrooms(e.target.value)} className='h-8 w-14 border border-black outline-none p-2' type="number" name="type" />
                    <Typography>Bedrooms</Typography>
                </div>
                <div className='flex gap-2 ml-6'>
                    <input defaultValue={0} onChange={(e)=>setBathrooms(e.target.value)} className='h-8 w-14 border border-black outline-none p-2' type="number" name="type" />
                    <Typography>Bathrooms</Typography>
                </div>
            </div>

            <div className='flex flex-col items-start gap-2 mt-6'>
                <Typography style ={{'font': 'bold', 'fontSize':'20px', 'fontWeight':'600'}}>Price</Typography>

                <div className='flex items-center justify-center gap-2 ml-6'>
                    <Typography>Regular price  </Typography>
                    <input onChange={(e)=>setRegularPrice(e.currentTarget.value)} className='h-8 w-32 border border-black outline-none p-2 ml-8' type="number" name="type" />
                    {sell  ? <span>₹</span> :  <span>₹/month</span>}
                </div>
                
                <div className='flex items-center justify-center gap-2 ml-6'>
                    <Typography>Discounted price  </Typography>
                    <input onChange={(e)=>setDiscountedPrice(e.currentTarget.value)} className='h-8 w-32 border ml-2 border-black outline-none p-2' type="number" name="type" />
                    {rent == false ? <span>₹</span> :  <span>₹/month</span>}
                </div>

            </div>
        </div>

    </div>
  )
}

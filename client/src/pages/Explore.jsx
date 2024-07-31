import { Button, FormControl, InputLabel, MenuItem, Select, Slider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


function Card(data){
  const router = useNavigate();
  const LoadSite = () =>{
    const pid = data?.data.pid;
    console.log("data on click is: " , data?.data);
    router(`/SiteView/${pid}` , {state : data?.data});
  }
  return (
    <div onClick={LoadSite} className='flex justify-center  items-center flex-col gap-2 m-4 card'>
            <div className='relative h-80 w-80 bg-gray-600 rounded-2xl border-black cursor-pointer overflow-hidden group'>
              <img className='z-0  absolute h-full w-full object-cover' src={data?.data.images[0]} alt="Loading..."/>
              <div className='-bottom-28 pl-2  absolute group-hover:-translate-y-28  group-hover:visible duration-200 ease-in-out'>
                  <h2 className='p-2 font-bold text-2xl text-[#3d5a80]'>{data?.data.name}</h2>
                  <p className='text-center font-bold p-2 text-[#3d5a80]'>{data?.data.desc}</p>
                  </div>
                </div>
        </div>
  )}
export default function Explore() {

  const [sites, setSites] = useState([]);
  const [value , setValue] = useState(5);
  const [type , setType] = useState();
  const [area , setArea] = useState();
  const [location , setLocation] = useState();

  const applyFilter = () => {
    fetch("https://real-estste-ps7k.onrender.com/api/user/get_property" , {
      method: "GET",
      headers : {
        'content-type':"application/json"
      },
      body : JSON.stringify({
        Price : value,
        Type : type,
        Area : area
      })
    }).then((res)=>{
      return res.json();
    }).then((data)=>{
      console.log(data);
    })
  }
  const handelChange = (event) => {
    const value = event.target.value;
    if(value == 1){
      setType("Plots/Land");
    }else if(value == 2){
      setType("House");
    }else if(value == 3){
      setType("Rent");
    }else{
      setType("ALL");
    }
  }

  const handelChangeLocation = (event) => {
    const value = event.target.value;
    if(value == 1){
      setLocation("New Anand Vihar");
    }else if(value == 2){
      setLocation("Shankar Vihar");
    }else if(value == 3){
      setLocation("Rail Vihar");
    }else{
      setLocation("Akash Vihar");
    }
  }

  useEffect(()=>{
    console.log(type , "   " , location);
  } , [type,location]);


  useEffect(()=>{
    const getData = async () => {
      try {
        const res = await fetch("https://real-estste-ps7k.onrender.com/api/user/getProperty", {
          method: "GET"
        });
        const result = await res.json();
        setSites(result?.data || []);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    getData();  
  } , [])
  return (
    <div className='flex items-center justify-center h-screen w-full '>

      <div className='w-1/4 h-screen max-md:hidden '>

        <div className='flex flex-col w-full flex-wrap overflow-hidden justify-center border shadow-2xl bg-slate-100 rounded-xl mt-28 ml-4 p-4'>
        <span className='text-xl font-bold text-center'>Filter Options</span>
        <div className='flex gap-1 flex-col ml-2 mt-12'>
          <span className='font-semibold'>Price Filter</span>
          <div className='flex gap-2 items-center ml-3'>
            <span className='text-md mr-2'>5L</span>
            <Slider onChange={(e) => setValue(e.target.value)} style={{width:"100px"}} valueLabelDisplay="auto" min={5} max={200}/> 
            <span className='text-md ml-2'> 2Cr</span>
            <div className='text-md'> <input defaultValue={5} value={value} type="text" className='rounded-sm w-16 ml-4 outline-none p-2'/> in Lakhs </div>
          </div>
        </div>

        <div className='flex flex-col gap-3 ml-2 mt-4'>
          <span className="text-md font-semibold">Area Filter</span>
          <div className='flex gap-3 ml-2'>
            <input placeholder='Area' type="number" onChange={(e)=>setArea(e.target.value)} className='rounded-sm outline-none w-32 p-2 '/> (in Gaj)
          </div>

          <FormControl fullWidth variant={"filled"}>
            {/* <span className='text-md font-semibold'>Type</span> */}
            <InputLabel>Type</InputLabel>
              <Select 
                onChange={handelChange}
                value={location}>
                <MenuItem value={1}>Plots/Land</MenuItem>
                <MenuItem value={2}>House</MenuItem>
                <MenuItem value={3}>Rentals</MenuItem>
                <MenuItem value={4}>All*</MenuItem>
              </Select>
          </FormControl>
        </div>


        <div className='flex flex-col gap-3 ml-2 mt-4'>
        <FormControl fullWidth variant={"filled"}>
            {/* <span className='text-md font-semibold'>Type</span> */}
            <InputLabel>Location</InputLabel>
              <Select 
                onChange={handelChangeLocation}
                value={location}>
                <MenuItem value={1}>New Anand Vihar</MenuItem>
                <MenuItem value={2}>Shankar Vihar</MenuItem>
                <MenuItem value={3}>Rail Vihar</MenuItem>
                <MenuItem value={4}>Aakash Vihar</MenuItem>
              </Select>
          </FormControl>
        </div>



        <div className='mt-8 flex w-full justify-center mb-8'>
          <Button onClick={applyFilter} fullWidth={true} variant="contained">Apply Filter</Button>
        </div>

      </div>

    </div>  
    
      <div className=' h-full w-3/4 overflow-x-auto pt-16'>
        <Typography variant='h6' style={{fontStyle:'bold' , textAlign: 'center' , marginTop: '12px' }}>Your Sites Appear Here </Typography>
        <div className='flex flex-wrap justify-center items-center m-4 gap-4 '>
          {sites.length > 0 ? sites.map((data, index) => (
            <Card key={index} data={data} />
          )) : <p>Loading Sites...</p>}
        </div>
      </div>

    </div>
  )
}

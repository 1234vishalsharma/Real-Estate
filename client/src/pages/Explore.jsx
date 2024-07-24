import { Button, MenuItem, Select, Slider, Typography } from '@mui/material';
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
    <div onClick={LoadSite} className='flex justify-center items-center flex-col gap-2 m-4 card'>
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

  const handelChange = (event) => {
    const value = event.target.value;
    if(value == 10){
      setType("Plots/Land");
    }else if(value == 20){
      setType("House");
    }else{
      setType("Rent");
    }
  }

  useEffect(()=>{
    console.log(type);
  } , [type])
  useEffect(()=>{
    const getData = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/user/getProperty", {
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
    <div className='flex h-screen w-screen bg-slate-600'>
      

      <div className='bg-red-400 flex flex-col justify-center h-full w-2/4 pt-16'>
        <Typography variant='h6' style={{textAlign: 'center'}}>Filter options</Typography>
        <div className='w-full flex justify-center items-center gap-5 max-lg:flex-col'>
          <div className='flex gap-4 justify-center items-center'>
            <span className='text-xl'>5L</span>
            <Slider onChange={(e) => setValue(e.target.value)} style={{width:"300px"}} valueLabelDisplay="auto" min={5} max={200}/> 
            <span className='text-xl mr-4'> 2Cr</span>
          </div>
          <span className='text-xl'>Price : </span>
          <input defaultValue={5} value={value} type="text" className='rounded-sm w-16 outline-none p-2'/> (in Lakhs)
        </div>

        <div className='flex gap-3 justify-start items-center ml-12 mt-8'>
          <span className="text-xl">Area</span>
          <input type="number" className='rounded-sm outline-none w-32 p-2 '/> (in meter)
          <div className='flex gap-3 ml-12 justify-center items-center'>
            <span className='text-xl'>Type </span>
            <Select style={{width:'150px', height:"46px", outline:"0" ,  backgroundColor: 'white', Color: 'black'}}
            onChange={handelChange}
            value={type}>
              <MenuItem value={10}>Plots/Land</MenuItem>
              <MenuItem value={20}>House</MenuItem>
              <MenuItem value={30}>Rentals</MenuItem>
            </Select>
          </div>
          </div>
        <div className='mt-12 flex w-full pl-32 pr-32 justify-center'>
          <Button fullWidth={true} variant="contained">Apply Filter</Button>
        </div>

      </div>  
    
      <div className='bg-cyan-500 h-full w-2/4 overflow-x-auto pt-16'>
        <Typography variant='h6' style={{fontStyle:'bold' , textAlign: 'center' , marginTop: '12px' }}>Your Sites Appear Here </Typography>
        <div className='grid justify-center grid-cols-2 items-center m-4 gap-4 max-lg:grid-cols-1'>
          {sites.length > 0 ? sites.map((data, index) => (
            <Card key={index} data={data} />
          )) : <p>Loading Sites...</p>}
        </div>
      </div>

    </div>
  )
}

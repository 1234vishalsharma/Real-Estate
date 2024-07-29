import { Typography , Button } from '@mui/material';
import React , {useState , useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Footer from '../components/Footer';

function Card(data){
  const router = useNavigate();
  const LoadSite = () =>{
    const pid = data?.data.pid;
    console.log("data on click is: " , data?.data);
    router(`/SiteView/${pid}` , {state : data?.data});
  }
  return (
    <div onClick={LoadSite} className='flex flex-col gap-2 m-4 card'>
            <div className='relative h-80 w-80 bg-gray-600 rounded-2xl border-black cursor-pointer overflow-hidden group'>
              <img className='z-0  absolute h-full w-full object-cover' src={data?.data.images[0]} alt="Loading..."/>
              <div className='-bottom-28 pl-2  absolute group-hover:-translate-y-28  group-hover:visible duration-200 ease-in-out'>
                  <h2 className='p-2 font-bold text-2xl text-[#3d5a80]'>{data?.data.name}</h2>
                  <p className='text-center font-bold p-2 text-[#3d5a80]'>{data?.data.desc}</p>
                  </div>
                </div>
        </div>
  )}

function Home() {
  const router = useNavigate(); 
  const GotoExplore = () => { 
    router('/Explore');  
  }

  const [sites, setSites] = useState([]);
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
    <div className='flex flex-col gap-8 pt-16'>
      <div className='flex flex-col gap-4 mt-16 ml-16'>
        <h1 className="tex[0t-slate-700 font-bold text-3xl lg:text-5xl">Find your dream <span class="text-slate-500">Place</span> <br/>  with RealEstate</h1>
        <p className='text-md text-cyan-800 font-semibold'>RealEstate is a online Property Commerce Site for Purchasers and Tenants.</p>
        <button onClick={GotoExplore} className="text-xl max-sm:w-32 w-96 p-2 border-2 border-black rounded-lg hover:bg-slate-400 hover:text-white transition-all ease-in-out duration-300" >Explore sites / Filter sites</button>
      </div>

      {/* cards section */}
      <span className="text-2xl font-semibold ml-8 mt-4 text-center">All Sites</span>
      <div className='flex flex-wrap ml-10 justify-evenly gap-4'>
          {sites.length > 0 ? sites.map((data, index) => (
            <Card key={index} data={data} />
          )) : <p>Loading Sites...</p>}
      </div>
      <Footer/>
    </div>
  )

  // return ( 
  //   <div className='flex flex-col gap-8'>
  //     <div className='flex flex-col gap-4 mt-16 ml-16'>
  //       <h1 className="text-slate-700 font-bold text-3xl lg:text-5xl">Find your dream <span class="text-slate-500">Place</span> <br/>  with RealEstate</h1>
  //       <p className='text-md text-cyan-800 font-semibold'>RealEstate is a online Property Commerce Site for Purchasers and Tenants.</p>
  //       <button onClick={GotoExplore} className="text-xl max-sm:w-32 w-96 p-2 border border-black rounded-lg" >Explore sites</button>
  //     </div>
    
   
  //      {/* cards section */}
  //     <h2></h2>

  //   <div className='flex items-center m-3 mt-10 gap-4 flex-wrap'>
  //       {sites.length > 0 ? sites.map((data, index) => (
  //         <Card key={index} data={data} />
  //       )) : <p>Loading Sites...</p>}
  //     </div>
    
  //   </div>
  // )
}

export default Home;
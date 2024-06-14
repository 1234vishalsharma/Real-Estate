import React from 'react';
import {useNavigate} from 'react-router-dom';

export default function Home() {
  const router = useNavigate();
  const GotoExplore = () => { 
    router('/Explore');
    
  }
  return ( 
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col gap-4 mt-16 ml-16'>
        <h1 className="text-slate-700 font-bold text-3xl lg:text-5xl">Find your dream <span class="text-slate-500">Place</span> <br/>  with RealEstate</h1>
        <p className='text-md text-cyan-800 font-semibold'>RealEstate is a online Property Commerce Site for Purchasers and Tenants.</p>
        <button onClick={GotoExplore} className="text-xl max-sm:w-32 w-96 p-2 border border-black rounded-lg" >Explore sites</button>
      </div>

    {/* cards section */}
      <div className='flex flex-wrap p-16 gap-8 justify-center'>

          <div className='flex flex-col gap-2'>
            <div className='relative h-96 w-80 bg-gray-600 rounded-2xl border-black cursor-pointer overflow-hidden group'>

              <img className='z-0  absolute h-full w-full object-cover' src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" alt="" />
              
              <div className='-bottom-20 pl-4  absolute group-hover:-translate-y-28  group-hover:visible duration-200 ease-in-out'>

                  <h2 className='p-2 font-semibold text-2xl text-black'>Card Title</h2>
                  <p className='text-center p-2 text-black'>Some Details to the card</p>
                  </div>
                </div>
        </div>
        
          <div className='flex flex-col gap-2'>
            <div className='relative h-96 w-80 bg-gray-600 rounded-2xl border-black cursor-pointer overflow-hidden group'>

              <img className='z-0  absolute h-full w-full object-cover' src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" alt="" />
              
              <div className='-bottom-20 pl-4  absolute group-hover:-translate-y-28  group-hover:visible duration-200 ease-in-out'>

                  <h2 className='p-2 font-semibold text-2xl text-black'>Card Title</h2>
                  <p className='text-center p-2 text-black'>Some Details to the card</p>
                  </div>
                </div>
        </div>
        
          <div className='flex flex-col gap-2'>
            <div className='relative h-96 w-80 bg-gray-600 rounded-2xl border-black cursor-pointer overflow-hidden group'>

              <img className='z-0  absolute h-full w-full object-cover' src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" alt="" />
              
              <div className='-bottom-20 pl-4  absolute group-hover:-translate-y-28  group-hover:visible duration-200 ease-in-out'>

                  <h2 className='p-2 font-semibold text-2xl text-black'>Card Title</h2>
                  <p className='text-center p-2 text-black'>Some Details to the card</p>
                  </div>
                </div>
        </div>
        
          <div className='flex flex-col gap-2'>
            <div className='relative h-96 w-80 bg-gray-600 rounded-2xl border-black cursor-pointer overflow-hidden group'>

              <img className='z-0  absolute h-full w-full object-cover' src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" alt="" />
              
              <div className='-bottom-20 pl-4  absolute group-hover:-translate-y-28  group-hover:visible duration-200 ease-in-out'>

                  <h2 className='p-2 font-semibold text-2xl text-black'>Card Title</h2>
                  <p className='text-center p-2 text-black'>Some Details to the card</p>
                  </div>
                </div>
        </div>
             
      </div>
    </div>
  )
}

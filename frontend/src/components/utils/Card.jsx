import React from 'react'

const Card = (props) => {
  return (
    <div className='flex flex-col gap-2'>
        <div className='relative h-96 w-80 bg-gray-600 rounded-2xl border-black cursor-pointer overflow-hidden group'>

          <img className='z-0  absolute h-full w-full object-cover' src={props.image} alt="" />
          
          <div className='-bottom-20 pl-4  absolute group-hover:-translate-y-28  group-hover:visible duration-200 ease-in-out'>

              <h2 className='p-2 font-semibold text-2xl text-white'>{props.name}</h2>
              <p className='p-2 text-white'>{props.info}</p>
          
          </div>
        </div>
    </div>
  )
}

export default Card

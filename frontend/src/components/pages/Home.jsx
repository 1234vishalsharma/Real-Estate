
import { Grid } from '@mui/material'
import React ,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Banner from '../utils/Banner'
import Card from '../utils/Card'

const Home = () => {
  const [property , setproperty] = useState([]);
  useEffect( () => {
    fetch("http://localhost:4000/user/listproperty" , {
      method: "GET",
    }).then((res)=>{
      return res.json();
    }).then((data)=>{
      console.log("data is : ",data?.data);
      setproperty(data?.data);
     }).catch((e)=>{
      console.error("Error is fetching the data: " , e.message);
    })
  } , [])
  useEffect ( ()=>{
    console.log("property is : " , property)
  } , [property])
  return (
    <div className='w-full h-full flex flex-col bg-slate-500'>
        <Banner/>
        <Grid container className='mt-40 gap-8 w-full justify-center mb-16'>

        {
          property.map((item, index) => (
            <Card key={index} name={item.name} image={item.siteImage} info={item.siteData} />
          ))
        }

        </Grid>
    </div>
  )
}

export default Home

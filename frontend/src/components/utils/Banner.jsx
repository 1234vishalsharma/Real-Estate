import React from 'react';
import image from './image.jpg';
import { Button, Card, TextField, Typography } from '@mui/material'
const Banner = () => {
  return (
    <div className='w-full mt-14 h-2/4'>
      <img className='w-full relative h-96 object-cover' src={image} alt="Loading image" />
      <Card className='p-8 w-96 absolute top-[50%] left-[40%] flex-col h-40 m-auto flex gap-4 items-center'>
        <Typography variant="h6" style={{font:"bold"}}>
            Search a Keyword
        </Typography>
            <div className='flex gap-4'>
                <TextField variant='outlined' fullWidth label="Search for a property"></TextField>    
                <Button variant='contained'>Search</Button>
            </div>
        </Card>   
    </div>
  )
}

export default Banner

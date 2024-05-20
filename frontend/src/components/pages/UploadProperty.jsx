import { Card, Button, TextField } from '@mui/material'
import React , {useState} from 'react'

const UploadProperty = () => {
   const [name , setName] = useState();
   const [siteImage , setImage] = useState();
   const [sitedata , setdata] = useState();
    const postProperty = () => {
        if(!name || !siteImage || !sitedata){
            alert("fields can't be empty");
            return;
        }
        console.log(name , " ", siteImage , " ", sitedata);
        const property = {name ,siteImage , sitedata};
        fetch('http://localhost:4000/admin/uploadSite' , {
            method: "POST", 
            headers: {
                'content-type': 'application/json',
                "authorization": "Bearer " + localStorage.getItem('token'),
            },
            body: JSON.stringify({
                siteData: property
            })
        }).then((resp)=>{
            return resp.json();
        }).then(data=>{
            console.log(data);
        })
    }



  return (
    <div className="h-screen bg-slate-400 w-full flex justify-center items-center">
        <Card className="h-96 w-96 p-8 flex flex-col gap-8">
            <TextField onChange={(e)=>setName(e.target.value)} variant='outlined' fullWidth label={'Property Address'}></TextField>
            <TextField onChange={(e)=>setImage(e.target.value)}  variant='outlined' fullWidth label={'Site Image (URL)'}></TextField>
            <TextField onChange={(e)=>setdata(e.target.value)}  variant='outlined' fullWidth label={'Additional details'}></TextField>
            <Button variant={'contained'} onClick={postProperty}>Upload Site</Button>
        </Card>
    </div>
  )
}

export default UploadProperty

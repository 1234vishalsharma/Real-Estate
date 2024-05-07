const express = require('express');
require('dotenv').config();

const adminrouter = require('./Routes/admin');
const userrouter = require('./Routes/user');

const app = express();
const PORT = process.env.PORT

// middlewares
app.use(express.json());
app.use('/admin' , adminrouter);
app.use('/user' , userrouter);


app.get('/' , (req,res)=>{
    res.send("Welcome to the backend");
})

app.listen(process.env.PORT , () => {
    console.log(`App is listening on port ${process.env.PORT}`)
})
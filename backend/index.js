const express = require('express');
require('dotenv').config();
const db = require('./config/database');
const cors = require('cors');
const adminrouter = require('./Routes/admin');
const userrouter = require('./Routes/user');

const app = express();
const PORT = process.env.PORT || 3000

// middlewares2
app.use(cors());
app.use(express.json());
app.use('/admin' , adminrouter);
app.use('/user' , userrouter);
db.connect();

app.get('/' , (req,res)=>{
    res.send("Welcome to the backend");
})

app.listen(PORT , () => {
    console.log(`App is listening on port ${PORT}`)
})
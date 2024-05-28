const express =  require('express');
const app = express();
const router = require('./routes/route');
const db = require('./config/database');
const cors = require('cors');
const cookieParser = require('cookie-parser');


require('dotenv').config();

// middlewares
app.use(cors());
app.use(cookieParser());
db.connect(process.env.DB_URL);
app.use(express.json());
app.use('/api/user' , router);

// default route
app.get('/' , (req,res) => {
    res.send("Hello world!");
})

// app listening code 
app.listen(process.env.PORT , ()=>{
    console.log("Server is listening on port ", process.env.PORT);
})
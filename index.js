
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dbConnect = require('./config/dbConnect')
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });


const app = express();
app.use(     
    cors({
     
    })
  );     
app.use(express.json())



dbConnect()


const PORT = process.env.PORT ;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

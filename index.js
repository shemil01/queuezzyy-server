const express = require("express");
const http = require("http");  
const mongoose = require("mongoose");
const cors = require("cors");
const dbConnect = require("./config/dbConnect");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });
const cookieParser = require("cookie-parser");
const authRout = require("./routes/auth");
const clinicRout = require("./routes/clinik");
const bookingRout = require("./routes/booking");
const tokenRout = require('./routes/token')
const { initializeSocket } = require("./config/socket");  

const app = express();
const server = http.createServer(app);  


app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api", authRout);
app.use("/api", clinicRout);
app.use("/api", bookingRout);
app.use("/api", tokenRout);

dbConnect();

initializeSocket(server)


const PORT = process.env.PORT;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

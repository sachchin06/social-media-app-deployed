const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const helmet = require("helmet")
const morgan = require("morgan")
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")
const path = require('path');

dotenv.config()

mongoose.connect(process.env.MONGO_URL, ()=> {
    console.log("Connected to MongoDB");
});

 //middleware


app.use(express.json())

// ADD THIS FOR DEPLOYMENT
// app.use(express.static('client/build'));
// app.use(express.static(path.resolve(__dirname, '../client/build')));


app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"))

app.get("/",(req,res)=>{
    res.send("welcome");
})
// app.get("/",(req,res)=>{
//     res.sendFile(path.join(__dirname, '../client/build/index.html'));
// })


// // If no API routes are hit, send the React app
// app.use(function(req, res) {
// 	res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });



app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute)

const PORT =process.env.PORT || 8800

app.listen(PORT, ()=>{
    console.log(`Backend server is running on ${PORT}`);
})
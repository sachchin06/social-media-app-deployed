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
app.use(express.static('client/build'));

app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"))

// If no API routes are hit, send the React app
app.use(function(req, res) {
	res.sendFile(path.join(__dirname, 'client/build/index.html'));
});


app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
})

// API routes
app.use("/users", userRoute)
app.use("/auth", authRoute)
app.use("/posts", postRoute)



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}.`);
});
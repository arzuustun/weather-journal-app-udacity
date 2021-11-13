// Setup empty JS object to act as endpoint for all routes
projectData = {};

 const express=require('express');
 const app=express();

// Require Express to run server and routes

// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port, listening);

function listening(){
    console.log("server running"); 
    console.log(`running on localhost: ${port}`);
}
// TODO-ROUTES!
app.get("/all",getData);

function getData(req,res){
  res.send(projectData);
}

app.post('/add', addData);

function addData (req,res){
   let newData=req.body;
   newEntry = {
       temp:newData.temp,
       date:newData.date,
       feeling:newData.feeling,
       weatherMain:newData.weatherMain,
       weatherImg:newData.weatherImg
   }
   projectData=newEntry;
    console.log("NEW ENTRY",newEntry);
    res.send(projectData);
};
const express = require("express");
const bodyParser = require("body-parser");
const route = require("./routes/route.js");
const app = express();
const database = require('./config/database.js')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));





   const a = async()=>{
    try {
        await database.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
  } 
  a()



  
  
app.use("/", route);
app.listen(process.env.PORT || 4000, function () {
    console.log("Express app running on port " + (process.env.PORT || 3000));
});
  
 

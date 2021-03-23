
const express = require('express');
const dotenv = require('dotenv')
const routers = require('./routers')
const {connectMongooseDb} =require("./helpers/database/connection")
const CustomErrorHandler = require('./middlewares/errors/CustomErrorHandler')
dotenv.config({

    path: "./config/env/config.env"

})


const app = express();
const port= process.env.PORT;

//Express Body Middleware
app.use(express.json());

//Database connection
connectMongooseDb();

///Middleware routers
app.use('/api',routers);

///HomePage///
app.get('/', (req, res) => {

    res.send("Hello World");

})

//ErorHandler
app.use(CustomErrorHandler);


//Listen Port
app.listen(port,function(){

    console.log('listening on port: '+port);

});
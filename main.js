require("./api/data/db")
const express=require("express");
require("dotenv").config();
const routes=require('./api/route');
const app=express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api", function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,ORIGIN')
    next();
});

app.use(function(req, res, next) {
    console.log(req.method, req.url);
    console.log(req.body)
    next();
});

app.use(process.env.API_URL,routes);

const server=app.listen(process.env.PORT,function(){
    const portNumber=server.address().port;
    console.log(process.env.START_MSG,portNumber);
});




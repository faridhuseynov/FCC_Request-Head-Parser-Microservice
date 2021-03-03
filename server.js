const express = require("express");
const cors = require("cors");
const fetch = require('node-fetch');

const app = express();
app.use("/public", express.static(__dirname+"/public"));
app.use(cors({optionsSuccessStatus:200}));
const port = process.env.PORT || 3000;

app.get("/",(req,res)=>{
    res.sendFile(__dirname+'/views/index.html');
})

app.get("/api/whoami",(req,res)=>{
    var header = req.headers;
    fetch('https://api.ipify.org/?format=json')
        .then(response=>response.json())
        .then(data=>{
            res.json({
                "ipaddress":data.ip,
                "language":header['accept-language'],
                "software":header['user-agent']
            });
        });
})

app.listen(port,()=>{
    console.log("App is running on port:"+port);
})
const express= require('express');
const fs=require('fs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
//cors article
//https://expressjs.com/en/resources/middleware/cors.html


let app=express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));



let searchUser = (obj)=>{
  try
  {

    let users= JSON.parse(fs.readFileSync(__dirname+'/users.json','utf8'));
    let userExist=users.filter((item)=>
    {
        return item.name == obj.username && item.password == obj.password
    });
    return (userExist.length==1)?true:false;
  }
  catch(err)
  {
    console.log(err);
    return false;
  }
    
}

//var whitelist = ['http://localhost:3000']
var corsOptions = {
  origin: 'http://example.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
// var corsOptions = {
//   origin: function (origin, callback) {
//     console.log("origin"+origin)
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
      
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

//app.use(cors(corsOptions))



// app.use(function(req, res, next) {
//   var allowedOrigins = ['http://127.0.0.1:3000', 'http://localhost:3000','https://jwt-cors-on-node.herokuapp.com'];
//   //var origin = req.headers.host;
//   var origin = req.headers.origin;
//   console.log(origin)
//   console.log(allowedOrigins.indexOf(origin))
//   if(allowedOrigins.indexOf(origin) > -1){
//        res.setHeader('Access-Control-Allow-Origin', origin);
//        res.header('Access-Control-Allow-Methods', 'GET,POST, OPTIONS');
//         res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//         res.header('Access-Control-Allow-Credentials', true);
//         return next();
//   }
//   else
//     res.send("CORS Not allowing this origin")
 
  
// });

app.use(cors(corsOptions))

app.get("/",cors(corsOptions),(req,res)=>{
  res.send("APIs :    /login  and   /verifyToken")
})



app.post('/login', (req,res)=>{

    if(searchUser(req.body))
    {
        jwt.sign(req.body, 'privateKey',(err, token) =>{
            console.log(token);
            res.send(token)
        });  
    }
    else
    {
        res.send("User Not Found !!! Invalid Username or password")
    } 
})

let verifyToken = (token)=>{
  try
  {
    let decoded =jwt.verify(token, 'privateKey');
    console.log('after decode '+ JSON.stringify(decoded))
    return decoded;
  }
  catch(err)
  { 
    return "Invalid Token";

  }
}
app.post('/verifyToken',(req,res)=>{

   let verifyTokenResult=verifyToken(req.headers.token);
    if(verifyTokenResult!="Invalid Token")
    {
      if(searchUser(verifyTokenResult))
      {
        res.send("Valid Token")

          // jwt.sign(verifyTokenResult, 'privateKey',(err, token) =>{
          //     console.log(token);
          //     res.send("That was a Valid Token !!! Here is the new Token :  " + token)
          // });  
      }
      else
      {
        res.send("Invalid Token!!! User Not found")  
      }
    }
    else
    {
      res.send("Invalid Token !!!")  
    }
  
   
})


app.listen(process.env.PORT || 3000)
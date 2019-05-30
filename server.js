var express = require('express')
var cors = require('cors')
var app = express()
var mongoose=require('mongoose');

//const _app=require('./config.js');
//mongoose.connect('mongodb://'+_app.user+':'+_app.pwd+'@cluster0-shard-00-00-lemrd.mongodb.net:27017,cluster0-shard-00-01-lemrd.mongodb.net:27017,cluster0-shard-00-02-lemrd.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin',{useNewUrlParser: true});
mongoose.connect('mongodb+srv://sikharun:<password>@cluster0-rrjkn.mongodb.net/test?retryWrites=true');

 //mongodb+srv://sikharun:sikha12345@cluster0-rrjkn.mongodb.net/test?retryWrites=true

 //[password : sikha12345]
var corsOptions = {
  origin: 'http://localhost:3002',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
 
app.get('/products/:id', cors(corsOptions), function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for only example.com.'})
})
 
app.listen(3002, function () {
  console.log('CORS-enabled web server listening on port 80')
})
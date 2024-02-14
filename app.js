var express = require('express');
var mongoose = require('mongoose');
 
 
/// for atlas
mongoose.connect("mongodb://kishan:111111111@ac-bph2qak-shard-00-00.cvuzjgt.mongodb.net:27017,ac-bph2qak-shard-00-01.cvuzjgt.mongodb.net:27017,ac-bph2qak-shard-00-02.cvuzjgt.mongodb.net:27017/?ssl=true&replicaSet=atlas-qnt0dh-shard-0&authSource=admin&retryWrites=true&w=majority", { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.connection.on('connected',()=>{
  console.log('connected to db');
});

mongoose.connection.on('error',(err)=>{

  if(err){
    console.log('Error in db connection '+err );
  }else{
    console.log( ' db connection ' );
  }
 
});
/// for atla end


/// for hosting raja

// mongoose.connect('mongodb://vps_dbuser:6JebajOXp@127.0.0.1:27017/vps_dpathshala', { useUnifiedTopology: true, useNewUrlParser: true });

 
// var db = mongoose.connection;
 
// db.on('error', console.error.bind(console, 'connection error:'));
 
// db.once('open', function() {
//   console.log("Connection Successful!");
  
   
// }); 

/// for hosting raja end
 


var bodyParser = require('body-parser');


 
var cors = require('cors');
const route = require('./router/route');
const teacher_route = require('./router/teacher_route');

  
var path = require('path');

var app = express();

app.use(cors());

app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
 
app.use('/api',route);
app.use('/teacherapi',teacher_route);
app.use( express.static(path.join(__dirname,'public')));

app.get('/', function(req, res){
    console.log('called me ');
   res.send("Hello world  !" );



});
const Port=process.env.Port || 3100;
app.listen(Port,()=>{
  console.log('Listening '+Port);
});


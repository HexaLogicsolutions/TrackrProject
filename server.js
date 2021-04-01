const express = require('express');
const mongoose = require('mongoose');
const config = require('config')
const cors = require('cors');
const app = express()
const logger = require('heroku-logger');

const fileUpload = require('express-fileupload');
app.use(fileUpload());

// const path = require('path')
// Passing middleware
app.use(express.json())
app.use(cors());
const Port = process.env.PORT || 5000;

const db = config.get('mongoURI')


mongoose
    .connect(db, {
        useNewUrlParser : true,
        useCreateIndex : true,
        useUnifiedTopology : true
    })
    .then(() => console.log('Database is connected...'))
    .catch(err => console.log('Database connection error : '+err))

    // app.get('/',(req,res)=>
    // {
    //     // res.send('hello i am king hii');
    //     var obj ={
    //         id:"8",
    //         name:"king",
    //         email:"hi123@gmail.com"
    //     }
    //     res.json(obj)
    // }); 
    // app.get("/course",(req,res)=>{
    //     res.render("")
    // })

// Routes
app.use('/api/users', require('./routes/api/user'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/groups', require('./routes/api/groups'))
app.use('/api/entitytype', require('./routes/api/entitytype'))
app.use('/api/handheld',require('./routes/api/handheld'))
app.use('/api/entity', require('./routes/api/entity'))
app.use('/api/sales', require('./routes/api/sales'))
app.use('/api/entitysubtype', require('./routes/api/entitysubtype'))
app.use('/api/warehouse', require('./routes/api/warehouse'))
app.use('/api/locationarea', require('./routes/api/locationarea'))
app.use('/api/location', require('./routes/api/location'))
app.use('/api/entitystatus', require('./routes/api/entitystatus'))
app.use('/api/actiongroup', require('./routes/api/actiongroup'))
app.use('/api/brand', require('./routes/api/brand'))
app.use('/api/material', require('./routes/api/material'))
app.use('/api/test', require('./routes/api/test'))
app.use('/api/search', require('./routes/api/search'))
app.use('/api/reports', require('./routes/api/Reports'))
app.use(express.static("trackr-client/build"));

app.post('/upload', function(req, res) {
    let sampleFile;
    let uploadPath;
    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400).send('No files were uploaded.');
      return;
    }
    console.log('req.files >>>', req.files); // eslint-disable-line
    sampleFile = req.files.sampleFile;
  
    uploadPath = __dirname + '/trackr-client/public/images/' + sampleFile.name;
  
    sampleFile.mv(uploadPath, function(err) {
      if (err) {
        return res.status(500).send(err);
      }
      res.send('File uploaded to ' + uploadPath);
    });
  });
// server static assests if in production
if(process.env.NODE_ENV === 'production')
{
    app.use(express.static('trackr-client/build'));
   const path = require('path')
   app.get("*",(req,res)=>{
       res.sendFile(path.resolve(__dirname,'trackr-client','build','index.html'))
   })
}


app.listen(Port, () => {

    console.log(`Server is running at Port + ${Port}` );
    logger.info('Starting server', { port: 4000 });
})

const bodyParser = require('body-parser');
const express= require('express');
const app= express();
const PORT= process.env.PORT || 3000;
//const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');
const studentRoutes=require('./routes/studentRoutes');

//middleware
app.use(bodyParser.json());

//mongodb
mongoose.connect('mongodb://127.0.0.1:27017/studentManagement',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() =>console.log('MongoDB connected'))
    .catch((err)=>console.log(err));

//Routes
app.use('/api/v1/students',studentRoutes);

//start the server
app.listen(PORT, ()=>{
    console.log('Server is running on port $(PORT)');
});


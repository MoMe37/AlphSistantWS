const express = require('express');
const path = require('path')
const app = express();

const fs = require('fs');

var nmbMeshs = -1;

fs.readdir( '../frontend/public/mesh', function(error, files) {  
    var totalFiles = files.length;
    nmbMeshs = totalFiles/2;
});

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/nmbFrame' , (req,res,next)=>{
    res.status(200).json({msg: nmbMeshs});
});

module.exports = app;
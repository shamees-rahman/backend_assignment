// Task1: initiate app and run server at 3000
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
var port = process.env.PORT || 8000;
const employee = require('./model.js')

const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));
// Task2: create mongoDB connection 
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Shamees:privacytermsmongodb@cluster0.vbrm5tw.mongodb.net/oct17session?retryWrites=true&w=majority')
.then(()=>{
    console.log("mongodb connected");
})
.catch(error=>{
    console.log(`connection`+ error);
});

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below





//TODO: get data from db  using api '/api/employeelist'
app.get('/api/employeelist',async(req,res)=>{
    try{
        employee.find().then((data)=>{
            res.send(data);})       
    } catch (error) {
        console.log(`Error:${error}`)
    }
})
    
    


//TODO: get single data from db  using api '/api/employeelist/:id'

app.get('/api/employeelist',async(req,res)=>{
    try{
        employee.findOne({"_id":req.params.id}).then((data)=>{
            res.send(data);})       
    } catch (error) {
        console.log(`Error:${error}`)
    }
})



//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.post('/api/employeelist',async(req,res)=>{
    try{
        let item = req.body;
        const user = new employee(item);
        const savedUser = await user.save()
        res.send(savedUser)        
    } catch (error) {
        console.log(`Error:${error}`)
    }
})





//TODO: delete a employee data from db by using api '/api/employeelist/:id'

app.delete('/api/employeelist/:id',async(req,res)=>{
    try{
        employee.remove({"_id":req.params.id}).then(()=>{
            console.log("Removed");})        
    } catch (error) {
        console.log(`Error:${error}`)
    }
})




//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.put('/api/employeelist',async(req,res)=>{

    if(req.body.name){
        if(req.body.location){
            try{employee.updateOne({"name":req.body.name},
        {$set:{
            "location":req.body.location
            }}).then(()=>{
                console.log("Updated")
            })} catch(error){
                console.log(`Error:${error}`)
            }
        }
        if(req.body.position){
            try{employee.updateOne({"name":req.body.name},
        {$set:{
            "position":req.body.position
        }}).then(()=>{
                console.log("Updated")
            })} catch(error){
                console.log(`Error:${error}`)
            }
        }
        if(req.body.salary){
            try{employee.updateOne({"name":req.body.name},
        {$set:{
            "salary":req.body.salary}}).then(()=>{
                console.log("Updated")
            })} catch(error){
                console.log(`Error:${error}`)
            }
        }   
    }
    


})

//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});


app.listen(port);

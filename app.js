const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();



mongoose.connect('mongodb://localhost:27017/Todo');

const todoSchema = new mongoose.Schema({
    item:String
})

const todo = mongoose.model('Items',todoSchema);

const greeting = new todo({
    item:"welcome todo list"
})

app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'))

app.get('/',(req,res)=>{


    todo.find({},(err,foundItems)=>{

        if(foundItems.length === 0){

            todo.insertMany(greeting,(err)=>{

                if(err){
                    console.log(err);
                }
                else
                {
                    console.log("New Database is created....")
                    res.redirect('/')
                }
            })
        }
        else{
            res.render('index',{title:"Today",newItems:foundItems})
        }
    })
    
})

app.post('/',(req,res)=>{
    const newItem = new todo({
        item:req.body.newItem,
    })
    newItem.save((err,result)=>{
        if(!err){
           res.redirect('/');
        }
    })

})

app.post('/delete',(req,res)=>{
    const deleteItem = req.body.checkbox;
   todo.findByIdAndDelete(deleteItem,(err)=>{
    if(!err){
        res.redirect('/');
    }
    else{
        console.log(err);
    }
   })
})



app.listen(3000,()=>{
    console.log("Server Has Started on port 3000");
})
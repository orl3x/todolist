const express = require("express");
const app = express();
const date = require(__dirname+"/date.js")
const mongoose = require('mongoose');


app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todoListDB", {useNewUrlParser: true, useUnifiedTopology: true});

const itemSchema = {
    name: String
};

const Item = mongoose.model("Item", itemSchema); 

const item1 = new Item({
    name: "Welcome to your todolist!"
})

const item2 = new Item({
    name: "Hit the + button to add a new item"
})

const item3 = new Item({
    name: "<-- Hit this to delete an item"
})

const defaultItems = [item1, item2, item3];


app.get("/", function(req, res){

    Item.find({}, function(err, foundItems){
        if(foundItems.length === 0){
            Item.insertMany(defaultItems, (err)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log("Default items saved succesfully.");
                }
            });
            res.redirect("/");
        }else{
            res.render("list", {
                listTitle: "Today", listItems: foundItems, formAction: "/"
            })
        }
    })

})

app.get("/:name", (req, res)=>{
    console.log(req.params.name);
})

app.get("/about", (req, res) => {
    res.render("about",{aboutTitle: date.helloWorld()})
})

app.post("/", function(req, res){
    const itemName = req.body.newItem;
    const item = new Item({
        name: itemName
    })
    	item.save();
        res.redirect("/");
})

app.post("/delete", function(req, res){
    const itemId = req.body.checkbox;
    Item.findByIdAndDelete(itemId, (err, doc)=>{
        if(err){
            console.log(err);
        }else{
            console.log('Removed: '+doc)
            res.redirect("/");
        }
    })
})

app.listen(3000, function(){
    console.log("Server is running on port 3000");
})


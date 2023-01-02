//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const app = express();

let items = [];
let workItems = [];

app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static("public"));

const uri =
  "mongodb+srv://taskapp:bigbang@cluster0.equpf.mongodb.net/todolistDB?retryWrites=true&w=majority";
const urilocal = "mongodb://localhost:27017/todolistDB";

mongoose.connect(uri, { useNewUrlParser: true });

const itemsSchema = {
  name: String,
  tag: String,
  category: String
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "My task 1",
});
const item2 = new Item({
  name: "My task 2",
});
const item3 = new Item({
  name: "My task 3",
});

const defaultItems = [item1, item2, item3];

// Item.insertMany(defaultItems, (err)=>{
//     if(err){
//         console.log('Something went wrong. Adding items failed',err)
//     } else {
//         console.log('Default items added succesfully.')
//     }
// })


app.get("/work", (req, res) => {
  let day = date.getDate();
  Item.find({}, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      if (results.length === 0) {
        Item.insertMany(defaultItems, (err) => {
          if (err) {
            console.log("Something went wrong. Adding items failed", err);
          } else {
            console.log("Default items added succesfully.");
          }
        });
        res.redirect("/work");
      } else {
        res.render("list", { title: day, items: results,postRoute:'/work',category:'work' });
      }
    }
  });
});
app.get("/personal", (req, res) => {
    let day = date.getDate();
    Item.find({}, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        if (results.length === 0) {
          Item.insertMany(defaultItems, (err) => {
            if (err) {
              console.log("Something went wrong. Adding items failed", err);
            } else {
              console.log("Default items added succesfully.");
            }
          });
          res.redirect('/personal');
        } else {
          res.render("list", { title: day, items: results,postRoute:'/personal',category:'personal' });
        }
      }
    });
  });

app.post('/delete', (req,res)=>{
    const itemData = JSON.parse(req.body.checkbox)
    Item.findByIdAndRemove(itemData._id, (err)=>{
        if(err){
            console.log(err)
        } else {
            res.redirect(`/${itemData.category}`)
        }
    })
   
})
app.post("/work", (req, res) => {
    console.log(req.body)
  const tag = req.body.button
  const newUserItem = new Item({
    name:req.body.newItem,
    tag:tag,
    category:'work'

  })
  Item.insertMany([newUserItem],(err)=>{
    if(err){
        console.log(err)
    } else {
        res.redirect('/work');
    }
  })
});

app.post("/personal", (req, res) => {
    console.log(req.body)
  const tag = req.body.button
  const newUserItem = new Item({
    name:req.body.newItem,
    tag:tag,
    category:'personal'

  })
  Item.insertMany([newUserItem],(err)=>{
    if(err){
        console.log(err)
    } else {
        res.redirect('/personal');
    }
  })
});

app.listen(3000, () => {
  console.log("Server up on port 3000.");
});

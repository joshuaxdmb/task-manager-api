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
    const permanentTasks = ['63ac556862336e4e52a85c31','63ac556e62336e4e52a85c34','63ac557762336e4e52a85c37','63ac558662336e4e52a85c3a','63ac559562336e4e52a85c3e','63ac559b62336e4e52a85c41','63ac55b062336e4e52a85c4f','63ac55c062336e4e52a85c52']
    if(!permanentTasks.includes(itemData._id)){
      Item.findByIdAndRemove(itemData._id, (err)=>{
        if(err){
            console.log(err)
        } else {
            res.redirect(`/${itemData.category}`)
        }
    })
    } else {
      res.redirect(`/${itemData.category}`)
    }
   
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

let port = process.env.PORT;
if(port===null|| port == "" || !port){
  port=3000;
}
app.listen(port, () => {
  console.log("Server up on port ",port);
});

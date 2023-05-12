const express = require("express");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const { Item, List } = require("./schemas/defaultSchema");
const _ = require("lodash")

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.static("public")); // express serves it out as a static folder

app.set("view engine", "ejs");

mongoose.connect("mongodb://127.0.0.1:27017/todolistDB");

const item1 = new Item({ text: "Welcome to your todolist" });
const item2 = new Item({ text: "Press + button to add a new item" });
const defaultActivities = [item1, item2];

const day = date.getDay();

app.get("/favicon.ico", () => {
  return "your faveicon";
});

app.get("/", async (req, res) => {
  const activities = await Item.find();

  res.render("list", {
    listTitle: day,
    activitiesPost: activities,
  });
});

app.get("/:customListName", async (req, res) => {
  const customListName = _.capitalize(req.params.customListName);

  const foundList = await List.findOne({ name: customListName }); //returns an object

  if (!foundList) {
    const list = new List({
      name: customListName,
      items: defaultActivities,
    });

    await list.save();

    res.redirect(`/${customListName}`);
  } else {
    res.render("list", {
      listTitle: foundList.name,
      activitiesPost: foundList.items,
    });
  }
});

app.post("/delete", async (req, res) => {
  const checkById = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === day) {
    await Item.findByIdAndRemove(checkById);
    res.redirect("/");
  } else {
    await List.findOneAndUpdate({ name: listName }, { $pull: { items: { _id: checkById }}})

    res.redirect(`/${listName}`);
  }
});

app.post("/", async (req, res) => {
  const itemName = req.body.activity;
  const listName = req.body.list;

  const newItem = new Item({
    text: itemName,
  });

  if (listName === day) {
    await newItem.save();
    res.redirect("/");
  } else {
    const foundList = await List.findOne({ name: listName });
    foundList.items.push(newItem);
    await foundList.save();
    res.redirect(`/${listName}`);
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

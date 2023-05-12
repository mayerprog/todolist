const mongoose = require("mongoose")

const itemsSchema = new mongoose.Schema({

    text: {
        type: String,
        required: true
    }

})

const Item = mongoose.model("item", itemsSchema)

const listSchema = new mongoose.Schema({
    name: String,
    items: [itemsSchema]
})

const List = mongoose.model("list", listSchema)


module.exports = { Item, List}
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const itemSchema = new Schema({
    title: String,
    price : String,
    category: [String],
    description: String,
    image: String,
    owner: { type: Schema.Types.ObjectId, ref: "User"},
    offers: [{type: Schema.Types.ObjectId, ref: 'Offer'}]
})
const ItemModel = mongoose.model('Item', itemSchema);


module.exports = ItemModel;
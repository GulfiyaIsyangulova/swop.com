// proposer: ID of the user who offers the trade
// receiver: ID of the user who had the thing that you wanted
// proposerItems: an array of IDS of the items that the proposer if offering
// receiverItems: array of IDS of the items that the proposer is asking for in return
// date: Date
// message: String
// isFinal: Boolean
// accepted: Boolean
// active: Boolean


const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const offerSchema = new Schema({
    proposer: { type: Schema.Types.ObjectId, ref: "User"},
    receiver : { type: Schema.Types.ObjectId, ref: "User"},
    proposerItems:[{ type: Schema.Types.ObjectId, ref: "Item"}],
    receiverItems: [{ type: Schema.Types.ObjectId, ref: "Item"}],
    date: Date,
    message: String,
    isFinal: Boolean,
    accepted: Boolean,
    active: Boolean,
})
const OfferModel = mongoose.model('Offer', offerSchema);


module.exports = OfferModel;
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BalanceSchema = new Schema({
    cash: { type: Number, min: 10, required: true },
    date: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Balance', BalanceSchema);
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    timestamp: { type: Date, default: Date.now },
    operation: { Type: String, enum: ['BUY', 'SELL'] },
    issuer: { type: Schema.Types.ObjectId, ref: 'Issuer', required: true },
    balance: { type: Schema.Types.ObjectId, ref: 'Balance', required: true },
    totalShares: { type: Number, min: 1, required: true },
    sharePrice: { type: Number, min: 1, required: true },
    result: { type: String, enum: ['SUCCESS', 'DUPLICATED_OPERATION', 'INVALID_OPERATION', 'INSUFFICIENT_BALANCE', 'INSUFFICIENT_STOCKS'] }
});

module.exports = mongoose.model('Order', OrderSchema);
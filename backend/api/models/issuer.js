const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const IssuerSchema = new Schema({
    issuerName: { type: String, required: true, max: 100 },
    balance: { type: Schema.Types.ObjectId, ref: 'Balance', required: true },
    totalShares: { type: Number, min: 1, required: true },
    sharePrice: { type: Number, min: 1, required: true }
});

module.exports = mongoose.model('Issuer', IssuerSchema);
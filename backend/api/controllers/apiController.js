const Balance = require('../models/balance');
const Issuer = require('../models/issuer');
const Order = require('../models/order');

exports.index = (req, res) => {
    console.log('Loading the balance');
    Balance.find()
        .sort([
            ['date', 'ascending']
        ])
        .populate('issuers')
        .exec((err, balance_list) => {
            if (err) res.send(err);
            console.log(`Response: ${balance_list}`);
            res.json(balance_list);
        })
}

exports.save_balance = (req, res) => {
    console.log('Saving balance');
    let newBalance = new Balance(req.body);
    newBalance.save((err, balance) => {
        if (err) res.send(err);
        res.json(balance);
    });
}

exports.save_issuers = (req, res) => {
    console.log('Saving issuers');
    let response = [];
    let issuers = req.body;
    issuers.forEach(issuer => {
        let newIssuer = new Issuer(issuer);
        newIssuer.save((err, result) => {
            if (err) res.send(err);
            response.push(result);
        });
    });
    res.json(response);
}

exports.process = (req, res) => {
    console.log('Processing the orders');
    let { orders } = req.body;
    orders.array.forEach(order => {
        let newOrder = new Order(order);
        //Aqui falta meter las validaciones antes de agregar la orden
        newOrder.save((err, ordered) => {
            if (err) res.send(err);
        });
    });
}

exports.show_balance = (req, res) => {
    console.log('Looking for balance');
    Balance.findById(req.params.id)
        .populate('issuers')
        .exec((err, balance) => {
            if (err) res.send(err);
            if (balance) {
                let err = new Error('Balance not found');
                err.status = 404;
                res.send(err);
            }
            res.json(balance);
        });
}

exports.issuers = (req, res) => {
    console.log('Querying the issuers');
    Issuer.find({ 'balance': req.params.id })
        .select('issuerName')
        .exec((err, issuers) => {
            if (err) res.send(err);
            res.json(issuers);
        });
}
const Balance = require('../models/balance');
const Issuer = require('../models/issuer');
const Order = require('../models/order');
const moment = require('moment');

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
    let balance = req.body.initialBalances;
    let issuers = balance.issuers;
    let orders = req.body.orders;
    let hour = moment().hour();
    console.log(hour);
    if(hour > 6 && hour < 15){
        let newBalance = new Balance({cash:balance.cash, date:Date.now()});
        newBalance.save((err, balance) => {
            if (err) res.send(err);
            save_issuers(issuers, balance._id);
        });
    }else{
        res.json({balance, bussinessErrors:['INVALID_OPERATION']});    
    }

}

save_issuers = ({issuers, balanceId}) => {
    console.log('Saving issuers');
    let savedIssuers = [];
    issuers.forEach(issuer => {
        let newIssuer = new Issuer({
                issuerName:issuer.issuerName, 
                balance:balanceId, 
                totalShares:issuer.totalShares,
                sharePrice: issuer.sharePrice
            });
        newIssuer.save((err, result) => {
            if (err) res.send(err);
            savedIssuers.push(newIssuer);
        });
    });
    return savedIssuers;
}

processOrders = ({orders, issuer}) => {
    console.log('Processing the orders');
    let response = [];
    orders.forEach(order => {
        idIssuer = Issuer.find({nameIssuer:issuer}, {_id:0}).exec((err,id) => {
            if(err) return err;
            return id;
        });
        if(order.timestamp < moment().add(5, 'minutes')){
            let newOrder = new Order(order);
            //Aqui falta meter las validaciones antes de agregar la orden
            newOrder.save((err, ordered) => {
                if (err) res.send(err);
                response.push('SUCESS');
            });
        }else{

        }
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
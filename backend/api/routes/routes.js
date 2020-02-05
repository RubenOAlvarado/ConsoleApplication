
const express = require('express'),
router = express.Router();

const apiController = require('../controllers/apiController');

    //Show the current balance state
    router.get('/', apiController.index);

    //Routes for procces the orders
    router.post('/process',apiController.process);

    //Route for save balance
    router.post('/balance',apiController.save_balance);

    //Route for get balance
    router.get('/balance/:balanceId',apiController.show_balance);

    //Route for save issuers
    router.post('/issuers',apiController.save_issuers);

module.exports = router;

const express = require('express'),
router = express.Router();

const apiController = require('../controllers/apiController');

    //Show the current balance state
    router.get('/', apiController.index);

    //Route for save balance
    router.post('/balance',apiController.save_balance);

module.exports = router;
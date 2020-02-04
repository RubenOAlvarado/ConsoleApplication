module.exports = (app) => {
    let apiController = require('../controllers/apiController');

    //Show the current balance state
    app.route('/')
        .get(apiController.index);

    //Routes for procces the orders
    app.route('/process')
        .post(apiController.process);

    //Route for save balance
    app.route('/balance')
        .post(apiController.save_balance);

    //Route for get balance
    app.route('/balance/:balanceId')
        .get(apiController.show_balance);

    //Route for save issuers
    app.route('/issuers')
        .post(apiController.save_issuers);
}
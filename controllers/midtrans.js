const midtransClient = require("midtrans-client");
const { User, Balance, sequelize } = require('../models');

class Controller {
    static snapPayment(req, res, next) {

    // Create Snap API instance
    let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
    });

    let random = Math.random() * 100;

    let parameter = {
        transaction_details: {
            order_id: `YOUR-ORDERID-${random}`,
            gross_amount: `${req.body.balance}`,
        },
        credit_card: {
            secure: true,
        },
        customer_details: {
            email: `${req.user.email}`,
        },
    };

    snap
        .createTransaction(parameter)
        .then((transaction) => {
        // transaction token
        let transactionToken = transaction.token;
        res.status(201).json({ transactionToken: transactionToken });
        })
        .catch((error) => {
        next(error);
        });
    }
}

module.exports = Controller
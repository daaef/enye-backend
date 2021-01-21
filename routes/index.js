const express = require('express');
const request = require("express");
const router = express.Router();
const axios = require('axios');

let users = {
    1: {
        id: '1',
        username: 'Robin Wieruch',
    },
    2: {
        id: '2',
        username: 'Dave Davids',
    },
};

let messages = {
    1: {
        id: '1',
        text: 'Hello World',
        userId: '1',
    },
    2: {
        id: '2',
        text: 'By World',
        userId: '2',
    },
};
/* GET home page. */
router.get('/', function (req, res, next) {
    res.redirect('/api');
});

router.get('/api', function (req, res, next) {
    res.send('Welcome to Enye Backend Test');
});


router.get("/api/rates", async (req, res, next) => {
    let base = req.query.base;
    let currency = req.query.currency
    axios.get(`https://api.exchangeratesapi.io/latest?base=${base}&currency=${currency}`)
        .then(
            response => {
                const myData = response.data;
                const rates = {}
                const allowed = currency.split(',');
                allowed.forEach((all)=>{
                    rates[`${all}`] = myData.rates[`${all}`]
                })
                console.log(rates)
                const toBeReturned = {
                    results: {
                        base: myData.base,
                        date: myData.date,
                        rates: rates
                    }
                }
                if (base || currency){
                    res.send(toBeReturned);
                } else {
                    res.send(response.data);
                }
            }
        )
        .catch(error => {
            console.log(error);
        });
});

module.exports = router;

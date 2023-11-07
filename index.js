require("dotenv").config();
var express = require('express');
var app     = express();
var cors    = require('cors');
var dal     = require('./dal.js');
const e = require('express');

// used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());

// create user account
app.get('/account/create/:name/:email/:password', function (req, res) {

    // check if account exists
    dal.find(req.params.email).
        then((users) => {

            // if user exists, return error message
            if(users.length > 0){
                console.log('User already in exists');
                res.send('User already in exists');    
            }
            else{
                // else create user
                dal.create(req.params.name,req.params.email,req.params.password).
                    then((user) => {
                        console.log(user);
                        res.send(user);            
                    });            
            }

        });
});


// login user 
app.get('/account/login/:email/:password', function (req, res) {

    dal.find(req.params.email).
        then((user) => {

            // if user exists, check password
            if(user.length > 0){
                if (user[0].password === req.params.password){
                    res.send(user[0]);
                }
                else{
                    res.send('Login failed: wrong password');
                }
            }
            else{
                res.send('Login failed: user not found');
            }
    });
    
});

// find user account
app.get('/account/find/:email', function (req, res) {

    dal.find(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});

// find one user by email - alternative to find
app.get('/account/findOne/:email', function (req, res) {

    dal.findOne(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});


// update - deposit/withdraw amount
app.get('/account/update/:email/:amount', function (req, res) {

    var amount = Number(req.params.amount);

    dal.update(req.params.email, amount).
        then((response) => {
            console.log(response);
            res.send(response);
    });    
});

// update - user
app.get('/user/update/:account/:name/:email/:password', function (req, res) {

    var account = Number(req.params.account);

    dal.updateUser(account, req.params.name, req.params.email, req.params.password).
        then((response) => {
            console.log(response);
            res.send(response);
    });    
});

// all accounts
app.get('/account/all', function (req, res) {

    dal.all().
        then((docs) => {
            console.log(docs);
            res.send(docs);
    });
});

// create transaction
app.get('/transaction/create/:initiator/:beneficiary/:amount', function (req, res) {
    console.log('funciona');
    // check if beneficiary exists
    dal.find(req.params.beneficiary).
        then((beneficiary) => {

            // if beneficiary exists, save transaction
            if(beneficiary.length > 0){
                // create transaction
                dal.createTransaction(req.params.initiator,req.params.beneficiary,req.params.amount).
                then((beneficiary) => {
                    console.log(beneficiary);
                    res.send(beneficiary);            
                });
            }
            else{
                // error message
                console.log('Beneficiary not found');
                res.send('Beneficiary not found');    
            }

        });
});

// my transactions
app.get('/transactions/:initiator/:beneficiary', function (req, res) {

    dal.myTransactions(req.params.initiator,req.params.beneficiary).
        then((docs) => {
            console.log(docs);
            res.send(docs);
    });
});

var PORT = process.env.PORT || 3000 ;
app.listen(PORT);
console.log('Running on port: ' + PORT);
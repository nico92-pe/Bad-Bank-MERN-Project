const MongoClient = require('mongodb').MongoClient;
// local: 'mongodb://localhost:27017'
// prd: 'mongodb+srv://badbank:badbank@cluster0.jmpyruv.mongodb.net/'
const url         = 'mongodb+srv://badbank:badbank@cluster0.jmpyruv.mongodb.net/';
let db            = null;

// connect to mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
    console.log("Connected successfully to db server");

    // connect to myproject database
    db = client.db('myproject');
});

// create user account
function create(name, email, password){
    return new Promise((resolve, reject) => {    
        const collection = db.collection('users');
        const doc = {name, email, password, balance: 0, account_id: Math.round(Math.random()*100000,0)};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });    
    })
}

// find user account
function find(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({email: email})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}

// find user account
function findOne(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .findOne({email: email})
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));    
    })
}

// update - deposit/withdraw amount
function update(email, amount){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')            
            .findOneAndUpdate(
                {email: email},
                { $inc: { balance: amount}},
                { returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );            


    });    
}

// update - user
function updateUser(account, name, email, password){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')            
            .findOneAndUpdate(
                {account_id: account},
                {
                    $set: {
                        name: name,
                        email: email,
                        password: password
                    }
                },
                { returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );            
    });    
}

// all users
function all(){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}

// create transaction
function createTransaction(initiator, beneficiary, amount){
    return new Promise((resolve, reject) => {    
        const collection = db.collection('transactions');
        const doc = {initiator, beneficiary, amount, transaction_id: Math.round(Math.random()*100000,0)};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });    
    })
}

// my transactions
function myTransactions(initiator, beneficiary){
    return new Promise((resolve, reject) => {    
        const transactions = db
            .collection('transactions')
            .find({
                $or: [
                    { initiator: initiator },
                    { beneficiary: beneficiary }
                ]
            })
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
            });
    })
}

module.exports = {create, findOne, find, update, all, createTransaction, myTransactions, updateUser};
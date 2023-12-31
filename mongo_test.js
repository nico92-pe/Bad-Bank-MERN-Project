const MongoClient = require('mongodb').MongoClient;
// local: 'mongodb://localhost:27017'
// prd: 'mongodb+srv://badbank:badbank@cluster0.dsjd3ns.mongodb.net/'
// node.js: 'mongodb+srv://badbank:badbank@cluster0.dsjd3ns.mongodb.net/?retryWrites=true&w=majority'
const url = 'mongodb+srv://noyague:48KEo5sO5xKMQrNu@cluster0.yl2xmm5.mongodb.net/?retryWrites=true&w=majority';
 
// connect to mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
  console.log("Connected successfully to server");

    // database Name
    const dbName = 'myproject';
    const db = client.db(dbName);

    // new user
    var name = 'user' + Math.floor(Math.random()*10000);
    var email = name + '@mit.edu';

    // insert into customer table
    var collection = db.collection('customers');
    var doc = {name, email};
    collection.insertOne(doc, {writeConcern: {w:1}}, function(err, result) {
        console.log('Document insert');
    });

    var customers = db
        .collection('customers')
        .find()
        .toArray(function(err, docs) {
            console.log('Collection:',docs);

            // clean up
            client.close();            
    });    

});

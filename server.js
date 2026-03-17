const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://morgan:123@ac-xdq5idg-shard-00-00.iotpjl4.mongodb.net:27017,ac-xdq5idg-shard-00-01.iotpjl4.mongodb.net:27017,ac-xdq5idg-shard-00-02.iotpjl4.mongodb.net:27017/?ssl=true&replicaSet=atlas-z9qjfc-shard-0&authSource=admin&appName=PropertyManagement';
const client = new MongoClient(url);
const dbname = 'SigmaProperty';
const express = require('express');
const app = express();

app.use(express.static('public'));

connectDB();

async function connectDB() {
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db(dbname);
    app.listen(3000, function() {
        console.log('listening on *:3000');
    });
}

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/', async function(req, res) {
    const [properties, tenants] = await Promise.all([
        db.collection('Properties').find({}).toArray(),
        db.collection('Tenants').find({}).toArray()
    ]);
    res.render('property-dashboard', {
        properties: properties,
        tenants: tenants
    });
});
app.get('/compliance', async function(req, res){
 
        const [properties, tenants] = await Promise.all([
        db.collection('Properties').find({}).toArray(),
        db.collection('Tenants').find({}).toArray()
    ]);
    res.render('compliancy-dashboard', {
        properties: properties,
        tenants: tenants
    });
});

app.get('/faults', async function(req, res){
 
        const [properties, tenants] = await Promise.all([
        db.collection('Properties').find({}).toArray(),
        db.collection('Tenants').find({}).toArray()
    ]);
    res.render('faults-dashboard', {
        properties: properties,
        tenants: tenants
    });
});

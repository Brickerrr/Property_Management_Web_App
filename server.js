const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://morgan:123@ac-xdq5idg-shard-00-00.iotpjl4.mongodb.net:27017,ac-xdq5idg-shard-00-01.iotpjl4.mongodb.net:27017,ac-xdq5idg-shard-00-02.iotpjl4.mongodb.net:27017/?ssl=true&replicaSet=atlas-z9qjfc-shard-0&authSource=admin&appName=PropertyManagement';
const dbname = 'SigmaProperty';
const express = require('express');
const app = express();

const client = new MongoClient(url);
let db;

app.use(express.static('public'));



async function connectDB() {
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db(dbname);
    app.listen(3510, function() {
        console.log('listening on *:3510');
    });
}
connectDB();
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

app.get('/compliance', async (req, res) => {
    try {
        const selectedPropertyId = req.query.property_id || null;
        const allProperties = await db.collection('Properties').find({}).toArray();
        const allCompliance = await db.collection('Compliency').find({}).toArray();
        const tenants = await db.collection('Tenants').find({}).toArray();
        const propertiesWithCompliance = allProperties.map(property => {
            const pID = String(property._id);
            const complianceRecord = allCompliance.find(c => String(c._id) === pID);
            
            return {
                ...property,
                property_id: pID,
                compliance_records: complianceRecord ? [complianceRecord] : []
            };
        });
        const selectedPropertyData = propertiesWithCompliance.find(p => p.property_id === selectedPropertyId);

        res.render('compliancy-dashboard', {
            properties: propertiesWithCompliance,
            tenants: tenants,
            selectedProperty: selectedPropertyId,
            selectedPropertyData: selectedPropertyData || null
        });

    } catch (err) {
        console.error('Route Error:', err);
        res.status(500).send("Error loading dashboard");
    }
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
const MongoClient = require('mongodb').MongoClient;

module.exports = {
    getCollection,
};

const dbName = 'NEWS-SITE';
const dbURL = process.env.MONGODB_URI || 'mongodb+srv://liron271292:liron271292@cluster0.sc44b.mongodb.net/NEWS-SITE?retryWrites=true&w=majority';
let dbConn = null;

async function getCollection(collectionName) {
    const db = await connect();
    return db.collection(collectionName);
}

async function connect() {
    if (dbConn) return dbConn;
    try {
        const client = await MongoClient.connect(dbURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const db = client.db(dbName);
        dbConn = db;
        return db;
    } catch (err) {
        console.log('Cannot Connect to DB', err);
        throw err;
    }
}

const { MongoClient, ObjectId } = require('mongodb')

const uri = "mongodb+srv://yuvalcohen006_db_user:ykNKOwQ071cTgrBg@clusteron.aftq1jr.mongodb.net/"

const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        console.log("Connected successfully to server");
    } catch (e) {
        console.error(e);
    }
}

run().catch(console.error);
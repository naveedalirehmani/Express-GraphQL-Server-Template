const { MongoClient } = require('mongodb');

const url = process.env.DATABSE_URL;
const dbName = process.env.DATABASE_NAME;

const collections = [
  {
    name: 'users',
    indexes: [{ field: 'email', options: { unique: true } }],
  },
  {
    name: 'products',
    indexes: [{ field: 'name', options: {} }],
  },
];

// Function to initialize the collections and indexes
async function initializeCollections(db) {
  for (const collection of collections) {
    const { name, indexes } = collection;
    const coll = db.collection(name);

    await coll.createCollection();

    for (const index of indexes) {
      await coll.createIndex(index.field, index.options);
    }
  }
}

async function connect() {
  try {
    const client = new MongoClient(url);
    await client.connect();

    const db = client.db(dbName);
    await initializeCollections(db);

    console.log('MongoDB connection established');

    module.exports = { client, db };
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

module.exports = connect
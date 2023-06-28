const http = require('http');
const app = require('./app.js');
require('dotenv').config();

const PORT = process.env.PORT || 8000;

const connect = require('./services/mongodb');

const httpServer = http.createServer(app);

async function startServer() {

  //* connecting to mongodb on server startup.
  // connect()

  httpServer.listen(PORT, () => { 
    console.log(' server is listning on ', PORT);
  });
}

startServer();

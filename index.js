const http = require("http");
const { app, graphqlServer } = require("./app.js");
require("dotenv").config();

const PORT = process.env.PORT || 8000;

const connect = require("./services/mongodb");

const httpServer = http.createServer(app);

async function startServer() {
  
  //* connecting to mongodb on server startup.
  // connect()

  await graphqlServer.start();

  graphqlServer.applyMiddleware({ app, path: "/graphql" });

  httpServer.listen(PORT, () => {
    console.log("listing to server on", PORT, graphqlServer.graphqlPath);
  });
}

startServer();

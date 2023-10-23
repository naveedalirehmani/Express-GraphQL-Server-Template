// const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const express = require("express");

const { ApolloServer } = require("apollo-server-express");

const Api1 = require("./routes/api.js");
const executableSchema = require("./graphql/index.js");
const context = require("./graphql/context.js");
const app = express();

const graphqlServer = new ApolloServer({
  introspection: true,
  schema: executableSchema,
  subscriptions: {
    path: '/subscriptions', // The WebSocket path
  },
  formatError: (error) => {
    return error;
  },
  context,
});

app.use(express.json());
app.use(morgan("combined"));
app.use("/static", express.static(path.join(__dirname, "public")));

app.use("/v1", Api1);

module.exports = { app, graphqlServer };

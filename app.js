const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const express = require("express");
const { graphqlHTTP } = require('express-graphql');

const Api1 = require("./routes/api.js");
const graphqlServer = require("./graphql/index.js");

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphqlServer,
    // context: {
      
    // },
    graphiql: true,
  })
)

app.use(
  cors({
    origin: "http://localhost:4000",
  })
);

app.use(express.json());
app.use(morgan("combined"));
app.use("/static", express.static(path.join(__dirname, "public")));

app.use("/v1", Api1);

app.get("/*", (request, response) => {
  response.sendFile(path.join(__dirname, "public", "index.html"));
});

module.exports = app;

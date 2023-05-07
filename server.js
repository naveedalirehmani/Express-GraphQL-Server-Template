const { ApolloServer } = require("apollo-server");
const schema = require("./graphql");

const server = new ApolloServer({
  schema,
  // context: {
  //   db,
  // },
});

server.listen().then(({ url }) => {
  console.log("listening on", url);
});

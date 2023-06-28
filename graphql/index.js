const path = require("path");

const { loadFilesSync } = require("@graphql-tools/load-files");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const typeDefs = loadFilesSync(path.join(__dirname, "**/*.graphql"));
const resolvers = loadFilesSync(path.join(__dirname,"**/*.resolver.js"))

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = executableSchema;

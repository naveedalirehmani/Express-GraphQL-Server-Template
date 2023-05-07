const path = require("path");

const { loadFilesSync } = require("@graphql-tools/load-files");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const typeDefs = loadFilesSync(path.join(__dirname, "**/*.graphql"));
const resolver = loadFilesSync(path.join(__dirname,"**/*.resolver"))

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolver,
});

module.exports = executableSchema;

import path from "path";

import { loadFilesSync } from "@graphql-tools/load-files";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { GraphQLSchema } from "graphql";

const typeDefs = loadFilesSync(path.join(__dirname, "**/*.graphql"));
const resolvers = loadFilesSync(path.join(__dirname, "**/*.resolver.js"));


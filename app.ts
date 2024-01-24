import path from "path";
import morgan from "morgan";
import express, { Express, Request, Response } from "express";
import { ApolloServer } from "apollo-server-express";
import context  from "./graphql/context";

import Api1 from "./routes/api";
import { executableSchema } from "./graphql/index";

const app: Express = express();

const graphqlServer = new ApolloServer({
  introspection: true,
  schema: executableSchema,
  formatError: (error) => {
    return error;
  },
  context,
});

app.use(express.json());
app.use(morgan("combined"));
app.use("/static", express.static(path.join(__dirname, "public")));

app.use("/v1", Api1);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ status: "Server is running" });
});

export { app, graphqlServer };

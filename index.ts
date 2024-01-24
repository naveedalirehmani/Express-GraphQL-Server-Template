import http from "http";
import { app, graphqlServer } from "./app";
import dotenv from "dotenv";
import prisma from "./prisma";

dotenv.config();

const PORT = process.env.PORT || 8000;
const httpServer = http.createServer(app);

async function startServer() {
  await graphqlServer.start();
  graphqlServer.applyMiddleware({ app, path: "/graphql" });

  httpServer.listen(PORT, () => {
    console.log("listening to server on", PORT, graphqlServer.graphqlPath);
  });
}

startServer();

httpServer.on("close", async () => {
  await prisma.$disconnect();
});

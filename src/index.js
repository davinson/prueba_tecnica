import express from "express";
import morgan from "morgan";
import { config } from "./config";
import { errorHandler } from "./middlewares/error-handler";
import { syncDatabase } from "./database/connection";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";

//import { combinedResolvers,combinedTypeDefs } from "./graphql";
import {resolvers,typeDefs} from "./graphql/main"

const server = new ApolloServer({ typeDefs, resolvers });
//const server = new ApolloServer({ typeDefs: combinedTypeDefs, resolvers: combinedResolvers });

await server.start();
const app = express();
const port = config.port;

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(expressMiddleware(server));

app.get("/", (req, res) => res.send("Root route."));
app.use(errorHandler);

const initializeApp = async () => {
  await syncDatabase();
  app.listen(port, () => console.log(`Server on port ${port}`));
};

initializeApp();

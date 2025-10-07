import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@apollo/server/adapters/start";
import { typeDefs } from "../../lib/graphql/schema";
import { resolvers } from "../../lib/graphql/resolvers";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler(server);

export default handler;

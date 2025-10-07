import { ApolloServer } from "apollo-server-micro";
import { typeDefs } from "../../lib/graphql/schema";
import { resolvers } from "../../lib/graphql/resolvers";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = server.start();

export default async function handler(req: any, res: any) {
  await startServer;
  await server.createHandler({ path: "/api/graphql" })(req, res);
}

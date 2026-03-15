import { ApolloServer } from '@apollo/server';
import { user } from './user';

async function createApolloGraphqlServer() {
  const gqlServer = new ApolloServer({
    typeDefs: user.typedefs,
    resolvers: {
      Query: {
        ...user.queries,
      },
      Mutation: {
        ...user.mutations,
      },
    },
  });

  await gqlServer.start();
  return gqlServer;
}

export default createApolloGraphqlServer;
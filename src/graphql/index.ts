import { ApolloServer } from "@apollo/server";
import {user } from './user';

async function createApolloGraphqlServer() {
    const gqlServer = new ApolloServer({
        typeDefs: `
          type Query {
            ${user.queries}
           
          }
          type Mutation {
            ${user.mutations}
          }
        `,
       resolvers: {
      Query: {
       ...user.resolvers.queris,
      },
      Mutation: { ...user.resolvers.mutations,
      },
    },
      });
    
      await gqlServer.start();

    return gqlServer;
}



export default  createApolloGraphqlServer;
import { ApolloServer } from "@apollo/server";
import { user } from './user';
import { typedefs } from "./user/typedefs";

async function createApolloGraphqlServer() {
    const gqlServer = new ApolloServer({
        typeDefs: 
        typedefs,
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
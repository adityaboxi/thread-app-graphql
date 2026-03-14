import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { prismaClient } from './lib/db';

async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;

  const gqlServer = new ApolloServer({
    typeDefs: `
      type Query {
        hello: String
        say(name: String): String
      }
      type Mutation {
        createUser(firstName: String!, lastName: String, email: String!, password: String!): Boolean
      }
    `,
   resolvers: {
  Query: {
    hello: () => 'hey there i am a graphql server',
    say: (_: unknown, { name }: { name: string }) =>
      `hey ${name}, how are you?`,
  },
  Mutation: {  // ✅ must be INSIDE resolvers
    createUser: async (
      _: unknown,
      { firstName, lastName, email, password }:
      { firstName: string, lastName: string, email: string, password: string }
    ) => {
      await prismaClient.user.create({
        data: {
          email,
          firstName,
          lastName,
          password,
          salt: 'random_salt',
        },
      });
      return true;
    },
  },
},
  });

  await gqlServer.start();

  app.get('/', (req, res) => {
    res.json({ message: 'server is up and running' });
  });

  app.use('/graphql',
    express.json(),
    expressMiddleware(gqlServer)
  );

  app.listen(PORT, () => console.log(`server started at ${PORT}`));
}

init();
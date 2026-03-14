import { prismaClient } from '../../lib/db';



const queris = {
    hello: () => 'hey there i am a graphql server',
        say: (_: unknown, { name }: { name: string }) =>
        `hey ${name}, how are you?`
}
 
const mutations = {  // ✅ must be INSIDE resolvers
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
    }
}

export const resolvers = { queris, mutations };
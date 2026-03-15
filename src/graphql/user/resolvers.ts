import { prismaClient } from '../../lib/db';
import UserService, { CreateUserPayload } from "../../services/user";


export const queries = {
  hello: () => 'hey there i am a graphql server',
  say: (_: unknown, { name }: { name: string }) =>
    `hey ${name}, how are you?`,
  getUserToken: async (_: unknown, { email, password }: { email: string, password: string }) => {
    const token = await UserService.getUserToken({ email, password });
    return token;
  },
};

export const mutations = {
  createUser: async (_: any, payload: CreateUserPayload) => {
    const res = await UserService.createUser(payload);
    return res.id;
  },
};

export const resolvers = { queries, mutations };
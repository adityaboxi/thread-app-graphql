import { queries } from './queries';
import { mutations } from './mutations';

export const typedefs = `#graphql
  type Query {
    ${queries}
  }
  type Mutation {
    ${mutations}
  }
  type User {
    id: ID!
    firstName: String!
    lastName: String
    email: String!
    profileImageURL: String
  }
`;
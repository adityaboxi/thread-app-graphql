import { queries } from './queries';
import { mutations } from './mutations';

export const typedefs = `#graphql
 type Query {
            ${queries}
           
          }
          type Mutation {
            ${mutations}
          }
`
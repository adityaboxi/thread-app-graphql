import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';


async function init() {
    
const app = express();
const PORT = Number(process.env.PORT) || 8000;

    app.use(express.json());
    
//graphql server
    const gqlServer = new ApolloServer({
        typeDefs: `
        type Query{
             hello: String
             say(name: String): String
        }
    `,//schema
        resolvers: {
            Query: {
                hello: () => `hey there i am a graph ql server`,
                say: (_, {name}:{name: string})=>`hey ${name}, how are you?`
        },
  },
});

await gqlServer.start();

app.get('/', (req, res) => {
    res.json({ message: 'server is up and running' });
});

    app.use('/graphql',  express.json(),expressMiddleware(gqlServer));

app.listen(PORT, () => console.log(`server started at ${PORT}`));
}

init();
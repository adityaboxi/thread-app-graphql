import express from 'express';
import { expressMiddleware } from '@as-integrations/express5';
import createApolloGraphqlServer from './graphql';

async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;

  app.use(express.json());

  const gqlServer = await createApolloGraphqlServer();

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
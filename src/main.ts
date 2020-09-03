import * as express from 'express';
import { env } from '@utils/env';
import { server } from '@config/apollo-server';

import { schema } from '@modules/schemas';
import { resolvers } from '@modules/resolvers';
import { providers } from '@modules/providers';
import { logger } from '@utils/logger';
import { database } from '@config/database';

async function bootstrap() {
    const host = env.get('app_host');
    const port = env.get('app_port');

    const app = express();

    // create apollo server
    const apolloServer = server.run(schema, resolvers, providers);

    // start database
    database.run();

    // add express middlewares
    apolloServer.applyMiddleware({ app, path: '/api' });

    // start server
    app.listen(port, () => logger.info(`server running at ${host}:${port}`));
}

bootstrap();

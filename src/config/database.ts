import { connect } from 'mongoose';
import { env } from '@utils/env';
import { logger } from '@utils/logger';
logger;

export const database = {
    async run() {
        /**
         * Setup mongodb connection
         */
        try {
            const uri: any = env.get('db_url');

            const mongodbOptions = {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            };

            await connect(uri, mongodbOptions);
            logger.info(`mongodb running at: ${uri}`);
        } catch (error) {
            logger.error(error);
        }
    }
};

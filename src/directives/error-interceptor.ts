import { createVisitObject } from 'graphql-directives-middlewares';
import { logger } from '@utils/logger';
import { ApolloError } from 'apollo-server-express';

export const errorInterceptorDirective = createVisitObject(
    'error_interceptor',
    (_params: any, next: () => any) => async (..._args: any) => {
        try {
            return await next();
        } catch (err) {
            logger.error(err);

            if (err.code === 11000) {
                throw new ApolloError("You're already registered", '400');
            }

            throw new ApolloError('Internal Server Error', '500');
        }
    }
);

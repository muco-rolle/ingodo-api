import { createVisitFieldDefinition } from 'graphql-directives-middlewares';

import { AuthenticationError, ForbiddenError } from 'apollo-server-express';
import { Context } from '@interfaces/apollo-server';
import { getUser } from '@utils/auth';

export const authGuardDirective = createVisitFieldDefinition(
    'auth_guard',
    (_params: any, next: () => any) => async (...args: any) => {
        const [, , context] = args;

        const { token } = context as Context;

        if (token) {
            const user = await getUser(token);
            if (user) {
                context.user = user;
                return next();
            } else {
                return new AuthenticationError('Access denied, Invalid Token.');
            }
        } else {
            return new ForbiddenError('Access denied, no token provided.');
        }
    }
);

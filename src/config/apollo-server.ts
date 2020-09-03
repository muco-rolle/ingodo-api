import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import {
    Context,
    Schema,
    Resolvers,
    Providers
} from '@interfaces/apollo-server';
import { errorInterceptorDirective } from '@directives/error-interceptor';
import { authGuardDirective } from '@directives/guard';

export const server = {
    run(
        typeDefs: Schema,
        resolvers: Resolvers,
        providers: Providers
    ): ApolloServer {
        const schema = makeExecutableSchema({
            typeDefs,
            resolvers,
            schemaDirectives: {
                error_interceptor: errorInterceptorDirective,
                auth_guard: authGuardDirective
            }
        });

        return new ApolloServer({
            schema,
            playground: true,

            context: async ({ req, res }: Context) => {
                const token = req.headers.authorization;

                return { req, res, token, providers };
            }
        });
    }
};

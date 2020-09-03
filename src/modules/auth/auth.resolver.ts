import { MutationSignupArgs, MutationLoginArgs } from '@interfaces/graphql';
import { Context } from '@interfaces/apollo-server';

export const authResolver = {
    Mutation: {
        async signup(_root: any, args: MutationSignupArgs, ctx: Context) {
            const { authProvider } = ctx.providers;

            return await authProvider.signup(args.user);
        },

        async login(_root: any, args: MutationLoginArgs, ctx: Context) {
            const { authProvider } = ctx.providers;
            return await authProvider.login(args.user);
        }
    }
};

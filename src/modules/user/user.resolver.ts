import { userProvider } from './user.provider';
import { Context } from '@interfaces/apollo-server';

export const userResolver = {
    Query: {
        hello: () => 'Hello, World!!!',
        async getCurrentUser(root: any, args: any, { user }: Context) {
            return await userProvider.getCurrentUser(user.email);
        }
    }
};

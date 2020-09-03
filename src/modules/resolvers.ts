import { userResolver } from '@modules/user';
import { authResolver } from '@modules/auth';
import { transactionResolver } from '@modules/transaction';

export const resolvers = [userResolver, authResolver, transactionResolver];

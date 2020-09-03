import { Context } from '@interfaces/apollo-server';
import { transactionProvider } from '@modules/transaction';
import {
    MutationCreateTransactionArgs,
    QueryTransactionArgs,
    MutationUpdateTransactionArgs,
    MutationDeleteTransactionArgs
} from '@interfaces/graphql';

export const transactionResolver = {
    Query: {
        async transactions(root: any, _args: any, ctx: Context) {
            return await transactionProvider.getTransactions(ctx.user.id);
        },

        async transaction(root: any, args: QueryTransactionArgs, ctx: Context) {
            return await transactionProvider.getTransaction(
                args.transactionId,
                ctx.user?.id
            );
        }
    },
    Mutation: {
        async createTransaction(
            root: any,
            args: MutationCreateTransactionArgs,
            ctx: Context
        ) {
            return await transactionProvider.createTransaction(
                args.transaction,
                ctx.user.id
            );
        },

        async updateTransaction(
            root: any,
            args: MutationUpdateTransactionArgs,
            ctx: Context
        ) {
            return await transactionProvider.updateTransaction(
                args.transaction,
                args.transactionId,
                ctx.user.id
            );
        },

        async deleteTransaction(
            root: any,
            args: MutationDeleteTransactionArgs,
            ctx: Context
        ) {
            return await transactionProvider.deleteTransaction(
                args.transactionId,
                ctx.user.id
            );
        }
    }
};

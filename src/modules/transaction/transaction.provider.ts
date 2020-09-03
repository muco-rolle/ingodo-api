import { TransactionInput, Transaction } from '@interfaces/graphql';
import { TransactionModel } from './transaction.model';
import { ApolloError } from 'apollo-server-express';
import { logger } from '@utils/logger';
export const transactionProvider = {
    async getTransactions(userId: string) {
        return await TransactionModel.find({ user: userId }).exec();
    },

    async getTransaction(
        transactionId: string,
        userId: string
    ): Promise<Transaction | ApolloError> {
        const transaction = await TransactionModel.findOne({
            _id: transactionId,
            user: userId
        }).exec();

        if (!transaction) {
            return new ApolloError(
                `No transaction with id: ${transactionId} found`,
                '404'
            );
        }

        return transaction;
    },

    async createTransaction(transaction: TransactionInput, userId: string) {
        const { type, description, amount } = transaction;

        return await TransactionModel.create({
            type,
            description,
            amount,
            user: userId
        });
    },

    async updateTransaction(
        transaction: TransactionInput,
        transactionId: string,
        userId: string
    ): Promise<Transaction | ApolloError> {
        const { type, description, amount } = transaction;
        const updatedTransaction = await TransactionModel.findOneAndUpdate(
            { _id: transactionId, user: userId },
            { type, description, amount },
            { new: true }
        ).exec();

        if (!updatedTransaction) {
            return new ApolloError(
                `Can't update a transaction with id: ${transactionId} not found`,
                '404'
            );
        }

        logger.info(`transaction updated ${updatedTransaction.description}`);
        return updatedTransaction;
    },

    async deleteTransaction(
        transactionId: string,
        userId: string
    ): Promise<Transaction | ApolloError> {
        const deletedTransaction = await TransactionModel.findOneAndDelete({
            _id: transactionId,
            user: userId
        }).exec();

        console.log(deletedTransaction);
        if (!deletedTransaction) {
            return new ApolloError(
                `Can't delete a transaction with id: ${transactionId} not found`,
                '404'
            );
        }

        return deletedTransaction;
    }
};

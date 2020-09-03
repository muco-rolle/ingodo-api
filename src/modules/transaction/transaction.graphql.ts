import { gql } from 'apollo-server-express';

export const TransactionGraphQLSchema = gql`
    # ---------------------------------------------------------
    # query types
    # ---------------------------------------------------------
    type Transaction {
        id: ID!
        type: String!
        description: String!
        amount: Int!
        createdAt: DateTime!
        updatedAt: DateTime!
    }

    # ---------------------------------------------------------
    # input types
    # ---------------------------------------------------------
    input TransactionInput {
        type: String!
        description: String!
        amount: Int!
    }

    # ---------------------------------------------------------
    # query
    # ---------------------------------------------------------
    extend type Query {
        transactions: [Transaction!]! @auth_guard
        transaction(transactionId: String!): Transaction! @auth_guard
    }

    # ---------------------------------------------------------
    # mutation
    # ---------------------------------------------------------
    extend type Mutation {
        createTransaction(transaction: TransactionInput!): Transaction!
            @auth_guard
        updateTransaction(
            transaction: TransactionInput!
            transactionId: String!
        ): Transaction! @auth_guard
        deleteTransaction(transactionId: String!): Transaction! @auth_guard
    }
`;

import { gql } from 'apollo-server-express';

export const UserGraphQLSchema = gql`
    # ---------------------------------------------------------
    # types
    # ---------------------------------------------------------
    type User {
        username: String!
        email: String!
    }

    extend type Query {
        hello: String!
        getCurrentUser: User! @auth_guard
    }
`;

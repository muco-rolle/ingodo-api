import { gql } from 'apollo-server-express';

export const AuthGraphQLSchema = gql`
    # ---------------------------------------------------------
    # query types
    # ---------------------------------------------------------
    type Login {
        token: String!
    }

    type Signup {
        token: String!
    }

    # ---------------------------------------------------------
    # input types
    # ---------------------------------------------------------
    input SignupInput {
        username: String!
        email: String!
        password: String!
    }

    input LoginInput {
        email: String!
        password: String!
    }

    # ---------------------------------------------------------
    # mutation
    # ---------------------------------------------------------
    extend type Mutation {
        signup(user: SignupInput): Signup!
        login(user: LoginInput!): Login!
    }
`;

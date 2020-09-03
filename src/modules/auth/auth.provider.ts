import { SignupInput, Signup, Login, LoginInput } from '@interfaces/graphql';
import { UserModel } from '@modules/user';
import { hash, compare } from 'bcryptjs';
import { generateJWT } from '@utils/auth';
import { env } from '@utils/env';
import { ApolloError } from 'apollo-server-express';
import { await } from 'signale';
import { logger } from '@utils/logger';

export const authProvider = {
    secretKey: env.get('secret_key'),
    async signup(user: SignupInput): Promise<Signup> {
        const { secretKey } = this;
        const { username, email, password } = user;

        const hashedPassword = await hash(password, 10);

        const savedUser = await UserModel.create({
            username,
            email,
            password: hashedPassword
        });

        const payload = {
            email: savedUser.email
        };
        const token = generateJWT(payload, secretKey, '1h');

        return { token };
    },

    async login(user: LoginInput): Promise<Login | ApolloError> {
        const { password, email } = user;
        const { secretKey } = this;

        const foundUser = await UserModel.findOne({ email }).exec();

        if (!foundUser) return new ApolloError('Invalid Credentials', '400');

        const isValidPassword = await compare(password, foundUser.password);

        if (!isValidPassword) {
            console.log(isValidPassword);
            return new ApolloError('Invalid Credentials', '400');
        }

        const payload = { email: foundUser.email };

        const token = generateJWT(payload, secretKey, '1h');

        logger.success(`${foundUser.username} logged in successfully.`);
        return { token };
    }
};

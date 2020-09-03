import { sign, verify } from 'jsonwebtoken';
import { logger } from './logger';
import { env } from './env';
import { UserModel } from '@modules/user';

interface Payload {
    email: string;
}

interface GenerateJWT {
    token: string;
}

export const generateJWT = (
    payload: Payload,
    key: string,
    duration: string
): string => {
    return sign(payload, key, { expiresIn: duration });
};

export const verifyToken = (token: string, key: string) => {
    try {
        return verify(token, key);
    } catch (error) {
        logger.error(error);
        return null;
    }
};

export const getUser = async (
    token: string
): Promise<{ id: string; username: string; email: string }> => {
    const key = env.get('secret_key');

    const result: any = verifyToken(token, key);

    try {
        const { _id, username, email } = await UserModel.findOne({
            email: result.email
        }).exec();

        return {
            id: _id,
            username,
            email
        };
    } catch (error) {
        return null;
    }
};

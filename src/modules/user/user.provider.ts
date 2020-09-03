import { UserModel } from './user.model';

export const userProvider = {
    async getCurrentUser(email: string) {
        return await UserModel.findOne({ email }).exec();
    }
};

import { Schema, models, model } from 'mongoose';

export const userSchema = new Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true }
    },
    { timestamps: true }
);

export const UserModel = models.User || model('User', userSchema);

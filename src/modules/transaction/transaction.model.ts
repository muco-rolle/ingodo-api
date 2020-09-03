import { Schema, models, model } from 'mongoose';

export const transactionSchema = new Schema(
    {
        type: { type: String, required: true },
        description: { type: String, required: true },
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        amount: { type: Number, required: true }
    },
    { timestamps: true }
);

export const TransactionModel =
    models.Transaction || model('Transaction', transactionSchema);

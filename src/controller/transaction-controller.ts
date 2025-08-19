import { transactionService } from '../service/transaction-service';
import { Request, Response } from 'express';
import { AppError } from '../utils/app-error';

class TransactionController {
    async create(req: Request, res: Response) {
        const { userId, title, description, value, type, categoryId } = req.body;

        if (!userId || !title || !value || !type) {
            throw new AppError('Missing required fields to create a transaction', 'bad_request');
        }

        const transaction = await transactionService.create({ userId, title, description, value, type, categoryId });
        res.status(201).json({ data: transaction });
    }

    async getByUserId(req: Request, res: Response) {
        const { userId } = req.body;

        if (!userId) {
            throw new AppError('Missing userId in request body', 'bad_request');
        }

        const transactions = await transactionService.getByUserId(userId);
        if (transactions.length === 0) {
            res.status(204).json({ message: 'No transactions found for this user' });
        }

        res.status(200).json({ data: transactions });
    }

    async deleteById(req: Request, res: Response) {
        const { transactionId } = req.body;

        if (!transactionId) {
            throw new AppError('Missing transactionId in request body', 'bad_request');
        }

        await transactionService.deleteById(transactionId);
        res.status(204).send();
    }

    async updateById(req: Request, res: Response) {
        const { transactionId, title, description, value, type, categoryId } = req.body;

        if (!transactionId) {
            throw new AppError('Missing transactionId in request body', 'bad_request');
        }

        await transactionService.updateById(transactionId, { title, description, value, type, categoryId });
        res.status(204).send();
    }
}

export const transactionController = new TransactionController();

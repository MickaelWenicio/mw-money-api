import { transactionService } from '../service/transaction-service';
import { Request, Response } from 'express';
import { AppError } from '../utils/app-error';

class TransactionController {
    async create(req: Request, res: Response) {
        const { userId, title, amount, type, categoryId } = req.body;
        if (!userId || !title || !amount || !type) {
            throw new AppError('Missing required fields to create a transaction', 'bad_request');
        }
        const transaction = await transactionService.create({ 
            userId,
            title,
            amount,
            type,
            categoryId 
        });
        res.status(201).json({ data: transaction });
    }

    async getByUserId(req: Request, res: Response) {
        const { userId } = req.params;
        if (!userId) {
            throw new AppError('Missing userId in request body', 'bad_request');
        }
        const transactions = await transactionService.getByUserId(userId);
        if (transactions.length === 0) {
            res.status(204).json({ message: 'No transactions found for this user' });
            return;
        }
        res.status(200).json({ data: transactions });
    }

    async deleteById(req: Request, res: Response) {
        const { transactionId } = req.params;
        if (!transactionId) {
            throw new AppError('Missing transactionId in request body', 'bad_request');
        }
        await transactionService.deleteById(transactionId);
        res.status(204).send();
    }

    async updateById(req: Request, res: Response) {
        const { title, amount, type, categoryId } = req.body;
        const { transactionId } = req.params;
        if (!transactionId) {
            throw new AppError('Missing transactionId in request body', 'bad_request');
        }
        await transactionService.updateById(transactionId, { title, amount, type, categoryId });
        res.status(204).send();
    }
}

export const transactionController = new TransactionController();

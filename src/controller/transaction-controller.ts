import { transactionService } from '../service/transaction-service';
import { Request, Response } from 'express';
import { BadRequestError } from '../utils/api-error';

class TransactionController {
    async create(req: Request, res: Response) {
        const { userId, title, amount, type, categoryId } = req.body;
        if (!userId || !title || !amount || !type) {
            throw new BadRequestError('Missing required fields to create a transaction');
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
            throw new BadRequestError('Missing userId in request body');
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
            throw new BadRequestError('Missing transactionId in request params');
        }
        await transactionService.deleteById(transactionId);
        res.status(204).send();
    }

    async updateById(req: Request, res: Response) {
        const { title, amount, type, categoryId } = req.body;
        const { transactionId } = req.params;
        if (!transactionId) {
            throw new BadRequestError('Missing transactionId in request body');
        }
        await transactionService.updateById(transactionId, { title, amount, type, categoryId });
        res.status(204).send();
    }

    async getById(req: Request, res: Response) {
        const { transactionId } = req.params;
        if(!transactionId) {
            throw new BadRequestError('Missing transactionId in request params');
        }
        const transaction = await transactionService.getById(transactionId);  
        res.status(200).json({ data: transaction });
    }
}

export const transactionController = new TransactionController();

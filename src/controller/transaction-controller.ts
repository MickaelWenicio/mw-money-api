import { transactionService } from "../service/transaction-service";
import { Request, Response } from "express";
import { AppError } from "../utils/app-error";

class TransactionController {
    async create(req: Request, res: Response) {
        try {
            const transaction = await transactionService.create(req.body);
            return res.status(201).json(transaction);
        } catch (error) {
            console.error('Error in TransactionController.create: ', error);
            if (error instanceof AppError) res.status(error.statusCode).json({message: error.message})
        }
    }

    async getByUserId(req: Request, res: Response) {
        try {
            const transactions = await transactionService.getByUserId(req.params.userId);
            return res.status(200).json(transactions);
        } catch (error) {
            if (error instanceof AppError) res.status(error.statusCode).json({message: error.message})
        }
    }
}
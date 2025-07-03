import { TransactionModel } from "../model/transaction-model";
import { CreateTransactionProps } from "../types/transaction-type";
import { transactionRepository } from "../repository/transaction-repository";
import { userService } from "./user-service";
import { AppError } from "../utils/app-error";

class TransactionService {
    constructor() {}

    async create(transaction: CreateTransactionProps): Promise<TransactionModel> {
        await userService.checkIfUserExists(transaction.userId);

        if(!transaction.title) {
            throw new AppError('Title is required');
        }

        if(!transaction.value || transaction.value <= 0) {
            throw new AppError('Value must be greater than zero');
        }
        
        try {
            const newTransaction = await transactionRepository.create(transaction);
            return new TransactionModel(newTransaction);
        } catch (error) {
            console.error('Error in transactionService.create: ' + error);
            throw new AppError('Internal server error', 500);
        }
    }

    async getByUserId (userId: string): Promise<TransactionModel[]> {
        await userService.checkIfUserExists(userId);

        try {
            const unformattedList = await transactionRepository.getByUserId(userId);
            const transactionList = unformattedList.map(item => {
                return new TransactionModel(item);
            })
            return transactionList;
        } catch (error) {
            console.error('Error in transactionService.getByUserId');
            throw new AppError('Internal server error', 500);
        }
    }

    async delete (transactionId: string) {
        return
    }
}

export const transactionService = new TransactionService();
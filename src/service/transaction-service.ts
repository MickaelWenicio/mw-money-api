import { TransactionModel } from "../model/transaction-model";
import { CreateTransactionProps } from "../types/transaction-type";
import { transactionRepository } from "../repository/transaction-repository";
import { userService } from "./user-service";
import { AppError } from "../utils/app-error";

class TransactionService {
    constructor() {}

    async create(transaction: CreateTransactionProps): Promise<TransactionModel> {
        const user = await userService.getById(transaction.userId);

        if(!user) {
            throw new AppError('User did not exists', 'not_found');
        }

        if(!transaction.value || transaction.value <= 0) {
            throw new AppError('Value must be greater than zero');
        }
        
        try {
            const newTransaction = await transactionRepository.create(transaction);
            return new TransactionModel(newTransaction);
        } catch (error) {
            console.error('Error in transactionService.create: ' + error);
            throw new AppError('Internal server error', 'internal_server_error');
        }
    }

    async getByUserId (userId: string): Promise<TransactionModel[]> {
        await userService.getById(userId);

        try {
            const unformattedList = await transactionRepository.getByUserId(userId);
            const transactionList = unformattedList.map(item => {
                return new TransactionModel(item);
            })
            return transactionList;
        } catch (error) {
            console.error('Error in transactionService.getByUserId');
            throw new AppError('Internal server error', 'internal_server_error');
        }
    }

    async deleteById (transactionId: string) {
        await transactionRepository.getById(transactionId);

        try {
            await transactionRepository.deleteById(transactionId);
        } catch (error) {
            console.error('Error in transactionService.deleteById');
            throw new AppError('Internal server error', 'internal_server_error');
        }
    }
}

export const transactionService = new TransactionService();
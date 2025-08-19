import { TransactionModel } from "../model/transaction-model";
import { CreateTransactionProps } from "../types/transaction-type";
import { transactionRepository } from "../repository/transaction-repository";
import { userService } from "./user-service";
import { AppError } from "../utils/app-error";

class TransactionService {
    async create(transaction: CreateTransactionProps): Promise<TransactionModel> {
        const user = await userService.getById(transaction.userId);
        if (!user) {
            throw new AppError('User does not exist', 'not_found');
        }

        if (!transaction.value || transaction.value <= 0) {
            throw new AppError('Value must be greater than zero');
        }

        const newTransaction = await transactionRepository.create(transaction);
        return new TransactionModel(newTransaction);
    }

    async getByUserId(userId: string): Promise<TransactionModel[]> {
        await userService.getById(userId);

        const unformattedList = await transactionRepository.getByUserId(userId);
        return unformattedList.map(item => new TransactionModel(item));
    }

    async deleteById(transactionId: string) {
        await transactionRepository.getById(transactionId);
        await transactionRepository.deleteById(transactionId);
    }

    async updateById(transactionId: string, transactionData: Partial<CreateTransactionProps>) {
        const transaction = await transactionRepository.getById(transactionId);
        if (!transaction) {
            throw new AppError('Transaction does not exist', 'not_found');
        }

        if (transactionData.value && transactionData.value <= 0) {
            throw new AppError('Value must be greater than zero');
        }

        await transactionRepository.updateById(transactionId, transactionData);
    }
}

export const transactionService = new TransactionService();

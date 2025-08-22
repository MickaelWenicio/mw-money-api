import { TransactionModel } from "../model/transaction-model";
import { CreateTransactionProps, SummaryProps, UpdateTransactionProps } from "../types/transaction-type";
import { transactionRepository } from "../repository/transaction-repository";
import { userService } from "./user-service";
import { AppError } from "../utils/app-error";
import { formatCurrency } from "../utils/utils";

class TransactionService {
    async create(transaction: CreateTransactionProps): Promise<TransactionModel> {
        const user = await userService.getById(transaction.userId);
        if (!user) {
            throw new AppError('User does not exist', 'not_found');
        }
        if (!Number(transaction.amount) || Number(transaction.amount) <= 0 ) {
            throw new AppError('Value must be greater than zero');
        }
        const newTransaction = await transactionRepository.create(transaction);
        return new TransactionModel(newTransaction);
    }

    async getByUserId(userId: string): Promise<TransactionModel[]> {
        const unformattedList = await transactionRepository.getByUserId(userId);
        return unformattedList.map(item => new TransactionModel(item));
    }

    async deleteById(transactionId: string) {
        await transactionRepository.getById(transactionId);
        await transactionRepository.deleteById(transactionId);
    }

    async updateById(transactionId: string, transactionData: UpdateTransactionProps) {
        const transaction = await transactionRepository.getById(transactionId);
        if (!transaction) {
            throw new AppError('Transaction does not exist', 'not_found');
        }
        if (transactionData.amount && transactionData.amount <= 0) {
            throw new AppError('Value must be greater than zero');
        }
        await transactionRepository.updateById(transactionId, transactionData);
    }

    async getSummary(userId: string): Promise<SummaryProps> {
        const summary = await transactionRepository.getSummary(userId);
        return {
            income: formatCurrency(summary.total_income || 0),
            expense: formatCurrency(summary.total_expense || 0),
            total: formatCurrency(summary.total_income - summary.total_expense || 0)
        }
    }
}

export const transactionService = new TransactionService();

import { TransactionModel } from "../model/transaction-model";
import { CreateTransactionProps, SummaryProps, UpdateTransactionProps } from "../types/transaction-type";
import { transactionRepository } from "../repository/transaction-repository";
import { userService } from "./user-service";
import { BadRequestError, NotFoundError } from "../utils/api-error";
import { formatCurrency } from "../utils/utils";

class TransactionService {
    async create(transaction: CreateTransactionProps): Promise<TransactionModel> {
        const user = await userService.getById(transaction.userId);
        if (!user) {
            throw new NotFoundError('User does not exist');
        }
        if (!Number(transaction.amount) || Number(transaction.amount) <= 0 ) {
            throw new BadRequestError('Value must be greater than zero');
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
            throw new NotFoundError('Transaction does not exist');
        }
        if (transactionData.amount && transactionData.amount <= 0) {
            throw new BadRequestError('Value must be greater than zero');
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

    async getById(transactionId: string): Promise<TransactionModel>  {
        const transaction = await transactionRepository.getById(transactionId);
        if(!transaction){
            throw new NotFoundError('Transaction does not exist');
        }
        return new TransactionModel(transaction);
    }
}

export const transactionService = new TransactionService();

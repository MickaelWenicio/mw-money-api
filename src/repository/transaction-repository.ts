import { TransactionProps, CreateTransactionProps, UpdateTransactionProps } from "../types/transaction-type";
import { client } from '../config/db';

class TransactionRepository {
    constructor () {}

    async create (transaction: CreateTransactionProps ): Promise<TransactionProps> {
        const sql = `
            INSERT INTO transactions
            (user_id, title, amount, type, category_id)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;
        const result = await client.query(sql, [
            transaction.userId,
            transaction.title,
            transaction.amount,
            transaction.type,
            transaction.categoryId
        ]);
        return result.rows[0];
    }

    async getByUserId (userId: string): Promise<TransactionProps[]> {
        const sql = `
            SELECT 
                transactions.id,
                transactions.title,
                transactions.amount,
                transactions.type,
                transactions.category_id,
                transactions.user_id,
                transactions.created_at,
                transactions.updated_at,
                categories.title AS category_title
            FROM transactions
            LEFT JOIN categories ON transactions.category_id = categories.id
            WHERE transactions.user_id = $1
            ORDER BY transactions.created_at DESC;
        `;
        const result = await client.query(sql, [userId]);
        return result.rows;
    }

    async getById (transactionId: string): Promise<TransactionProps> {
        const sql = `
            SELECT 
                transactions.id,
                transactions.title,
                transactions.amount,
                transactions.type,
                transactions.category_id,
                transactions.user_id,
                transactions.created_at,
                categories.title AS category_title
            FROM transactions
            LEFT JOIN categories ON transactions.category_id = categories.id
            WHERE transactions.id = $1
        `;
        const result = await client.query(sql, [transactionId]);
        return result.rows[0];
    }

    async deleteById (id: string): Promise<void> {
        const sql = `
            DELETE FROM transactions
            WHERE id = $1;
        `;
        await client.query(sql, [id]);
    }

    async updateById(transactionId: string, transactionData: UpdateTransactionProps): Promise<void> {
        const { title, amount, type, categoryId } = transactionData;
        const sql = `
            UPDATE transactions
            SET (title, amount, type, category_id, updated_at) = ($1, $2, $3, $4, NOW())
            WHERE id = $5;
        `;
        await client.query(sql, [
            title,
            amount,
            type,
            categoryId,
            transactionId
        ]);
    }

    async getSummary (userId: string) {
        const sql = `
            WITH income AS (
                SELECT SUM(amount) AS total_income
                FROM transactions
                WHERE user_id = $1 AND type = 'income'
            ),
            expense AS (
                SELECT SUM(amount) AS total_expense
                FROM transactions
                WHERE user_id = $1 AND type = 'expense'
            )
            SELECT income.total_income, expense.total_expense
            FROM income, expense;
        `;
        const result = await client.query(sql, [userId]);
        return result.rows[0]
    }
}

export const transactionRepository = new TransactionRepository();

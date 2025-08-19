import { TransactionProps, CreateTransactionProps, SummaryProps } from "../types/transaction-type";
import { client } from '../config/db';

class TransactionRepository {
    constructor () {}

    async create (transaction: CreateTransactionProps ): Promise<TransactionProps> {
        const sql = `
            INSERT INTO transactions
            (user_id, title, description, value, type, category_id)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;

        const result = await client.query(sql, [
            transaction.userId,
            transaction.title,
            transaction.description,
            transaction.value,
            transaction.type,
            transaction.categoryId
        ]);
        return result.rows[0];
    }

    async getByUserId (userId: string): Promise<TransactionProps[]> {
        const sql = `
            SELECT 
                transactions.user_id, 
                transactions.title, 
                transactions.description, 
                transactions.value, 
                transactions.type, 
                transactions.category_id, 
                transactions.created_at,
                categories.name
            FROM transactions
            INNER JOIN categories ON transactions.category_id = categories.id
            WHERE transactions.user_id = $1
            ORDER BY transactions.created_at DESC;
        `;
        const result = await client.query(sql, [userId]);
        return result.rows;
    }

    async getById (transactionId: string): Promise<TransactionProps> {
        const sql = `
            SELECT 
                transactions.user_id, 
                transactions.title, 
                transactions.description, 
                transactions.value, 
                transactions.type, 
                transactions.category_id, 
                transactions.created_at,
                categories.name 
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

    async updateById(transactionId: string, transactionData: Partial<TransactionProps>): Promise<void> {
        const { title, description, value, type, categoryId } = transactionData;

        const sql = `
            UPDATE transactions
            SET (title, description, value, type, category_id, updated_at) = ($1, $2, $3, $4, $5, NOW())
            WHERE id = $6;
        `;

        await client.query(sql, [
            title,
            description,
            value,
            type,
            categoryId,
            transactionId
        ]);
    }

    async getSummary (userId: string) {
        const sql = `
            WITH income AS (
                SELECT SUM(value) AS total_income
                FROM transactions
                WHERE user_id = $1 AND type = 'income'
            ),
            expense AS (
                SELECT SUM(value) AS total_expense
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

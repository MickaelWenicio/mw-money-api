import { TransactionProps, CreateTransactionProps } from "../types/transaction-type";
import { client } from '../config/db';

class TransactionRepository {
    constructor () {}

    async create (transaction: CreateTransactionProps ): Promise<TransactionProps> {
        const sql = `
            INSERT INTO transactions
            (user_id, title, description, value, type)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `

        try {
            const result = await client.query(sql, [
                transaction.userId,
                transaction.title,
                transaction.description,
                transaction.value,
                transaction.type
            ]);
            return result.rows[0];
        } catch (error) { 
            throw Error('Failed to create transaction: ' + error);
        }
    }

    async getByUserId (userId: string): Promise<TransactionProps[]> {
        const sql = `
            SELECT * FROM transactions
            WHERE user_id = $1
            ORDER BY created_at DESC;
        `;
        try {
            const result = await client.query(sql, [userId]);
            return result.rows;
        } catch (error) {
            throw Error('Failed to retrieve transactions: ' + error);
        }
    }

    async getById (id: string): Promise<TransactionProps> {
        const sql = `
            SELECT * FROM transactions
            WHERE id = $1;
        `;
        try {
            const result = await client.query(sql, [id]);
            if (result.rows.length === 0) {
                throw Error('Transaction not found');
            }
            return result.rows[0];
        } catch (error) {
            throw Error('Failed to retrieve transaction: ' + error);
        }
    }

    async delete (id: string): Promise<void> {
        const sql = `
            DELETE FROM transactions
            WHERE id = $1;
        `;
        try {
            await client.query(sql, [id]);
        } catch (error) {
            throw Error('Failed to delete transaction: ' + error);
        }
    }
}

export const transactionRepository = new TransactionRepository();
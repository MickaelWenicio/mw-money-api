export type TransactionProps = {
    id: string;
    userId: string;
    title: string;
    description: string | null;
    value: number;
    type: 'income' | 'expense';
    createdAt: Date;
    categoryId: number | null;
}

export type CreateTransactionProps = Omit<TransactionProps, 'id' | 'createdAt'>;
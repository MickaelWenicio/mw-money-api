export type TransactionProps = {
    id: string;
    userId: string;
    title: string;
    description: string;
    value: number;
    type: 'income' | 'expense';
    createdAt: Date;
}

export type CreateTransactionProps = Omit<TransactionProps, 'id' | 'createdAt'>;
export type TransactionProps = {
    id: string;
    user_id: string;
    title: string;
    amount: number;
    type: 'income' | 'expense';
    created_at: Date;
    updated_at: Date;
    category_id: string | null;
    category_title: string | null;
}

export type CreateTransactionProps = {
    userId: string;
    title: string;
    amount: number;
    type: 'income' | 'expense';
    categoryId: string | null;
}

export type UpdateTransactionProps = Omit<CreateTransactionProps, 'userId'>

export type SummaryProps = {
    income: string,
    expense: string,
    total: string
}
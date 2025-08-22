import { TransactionProps } from '../types/transaction-type';
import { formatCurrency } from '../utils/utils';

export class TransactionModel {
    readonly id: string;
    private userId: string;
    public title: string;
    public amount: number;
    public type: 'income' | 'expense';
    public createdAt: Date;
    public updatedAt: Date;
    public categoryId: string | null;
    public categoryTitle: string | null;

    constructor(props: TransactionProps) {
        this.id = props.id;
        this.userId = props.user_id;
        this.title = props.title;
        this.amount = props.amount;
        this.type = props.type;
        this.createdAt = props.created_at;
        this.updatedAt = props.updated_at
        this.categoryId = props.category_id;
        this.categoryTitle = props.category_title;
    }

    getId() {
        return this.id;
    }

    getUserId() {
        return this.userId;
    }

    getFormatedValue() {
        return formatCurrency(this.amount);
    }
}
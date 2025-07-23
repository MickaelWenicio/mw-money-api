import { TransactionProps } from '../types/transaction-type';

export class TransactionModel {
    readonly id: string;
    private userId: string;
    public title: string;
    public description: string | null;
    public value: number;
    public type: 'income' | 'expense';
    public createdAt: Date;
    public categoryId: number | null;

    constructor(props: TransactionProps) {
        this.id = props.id;
        this.userId = props.userId;
        this.title = props.title;
        this.description = props.description;
        this.value = props.value;
        this.type = props.type;
        this.createdAt = props.createdAt || new Date();
        this.categoryId = props.categoryId
    }

    getId() {
        return this.id;
    }

    getUserId() {
        return this.userId;
    }
}
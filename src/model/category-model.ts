import { CategoryProps } from "../types/category-types";

export class CategoryModel {
    public id: string;
    public title: string;
    public userId: string;
    public createdAt: Date;

    constructor (props: CategoryProps) {
        this.id = props.id,
        this.title = props.title,
        this.userId = props.user_id,
        this.createdAt = props.created_at
    }
}
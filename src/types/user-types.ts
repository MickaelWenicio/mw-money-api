export type UserProps = {
    id: string;
    name: string;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date
}

export type CreateUserProps = {
    name: string;
    email: string;
    password: string;
}
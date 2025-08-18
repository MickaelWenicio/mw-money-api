export type UserProps = {
    id: string;
    name: string;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date
}

export type CreateUserProps = Omit<UserProps, 'id' | 'created_at' | 'updated_at'>;
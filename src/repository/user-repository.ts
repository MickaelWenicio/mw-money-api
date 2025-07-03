import { client } from '../config/db';
import { CreateUserProps, UserProps } from '../types/user-types';

class UserRepository {
    constructor () {}

    async create (user: CreateUserProps): Promise<UserProps> { 
        const sql = `
            INSERT INTO users
            (name, email, password) values
            ($1, $2, $3)
            RETURNING *;
        `

        try {
            const result = await client.query(sql, [user.name, user.email, user.password]);
            return result.rows[0];
        } catch (error) {
            throw Error('Failed to create user: ' + error);
        }
    }

    async findByEmail (email: string): Promise<UserProps> {
        const sql = `
            SELECT * FROM users
            WHERE users.email = $1;
        `;
        const result = await client.query(sql, [email]);
        return result.rows[0];
    }

    async findById (id: string): Promise<UserProps> {
        const sql = `
            SELECT * FROM users
            WHERE users.id = $1;
        `;
        const result = await client.query(sql, [id]);
        return result.rows[0];
    }
}

export const userRepository = new UserRepository();
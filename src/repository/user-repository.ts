import { client } from '../config/db'
import { UserProps, CreateUserProps } from '../types/user-types'

class UserRepository {
    constructor () {}

    async create (user: CreateUserProps) { 
        const sql = `
            INSERT INTO users
            (name, email, password) values
            ($1, $2, $3);
        `

        try {
            const result = await client.query(sql, [user.name, user.email, user.password]);
            return result.rowCount;
        } catch (error) {
            throw new Error(`Failed to create user: ${error}` );
        }
    }

    async findByEmail (email: string): Promise<UserProps> {
        const sql = `
            SELECT * FROM users
            WHERE users.email = $1;
        `;

        try {
            const result = await client.query(sql, [email]);
            return result.rows[0];
        } catch (error) {
            throw new Error(`User not found: ${error}`);
        }
    }
}

export default new UserRepository();
import { client } from "../config/db"
import { UserProps, CreateUserProps } from "../types/user-types"

class UserRepository {
    constructor () {}

    async createUser (user: CreateUserProps) { 
        const sql = `
            INSERT INTO users
            (name, email, password) values
            ($1, $2, $3);
        `

        try {
            const result = await client.query(sql, [user.name, user.email, user.password]);
            return result.rowCount;
        } catch (error) {
            throw new Error( `Failed to create user: , ${error}` );
        }
    }
}

export default new UserRepository();
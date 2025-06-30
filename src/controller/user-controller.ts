import { userService } from '../service/user-service'
import { Request, Response } from 'express'
import { AppError } from '../utils/app-error';

class UserController {
    constructor () {}

    async create (req: Request, res: Response) {
        const { name, email, password } = req.body;
        if(!req.body.name || !req.body.email || !req.body.password) {
            res.status(400).json({message: 'Missing data to register a new user'});
            return;
        }

        const newUserData = {
            name,
            email, 
            password
        };

        try {
            const newUser = await userService.create(newUserData);
            res.status(201).json({message: `New user ${newUser.getId()} created successfully`});
        } catch (error) {
            if (error instanceof AppError) res.status(error.statusCode).json({message: error.message});
        }
    }
}

export const userController = new UserController();
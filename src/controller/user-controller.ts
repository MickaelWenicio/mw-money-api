import { userService } from '../service/user-service'
import { Request, Response } from 'express'
import { AppError } from '../utils/app-error';

class UserController {
    constructor () {}

    async create (req: Request, res: Response) {
        const newUserData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        };

        if(!newUserData.name || !newUserData.email || !newUserData.password) {
            res.status(400).json({message: 'Missing required fields to register a new user'});
            return;
        }

        try {
            const newUser = await userService.create(newUserData);
            res.status(201).json({message: `New user ${newUser.getId()} created successfully`});
        } catch (error) {
            if (error instanceof AppError) res.status(error.statusCode).json({message: error.message});
        }
    }
}

export const userController = new UserController();
import { userService } from '../service/user-service';
import { Request, Response } from 'express';
import { AppError } from '../utils/app-error';

class UserController {
    async create(req: Request, res: Response) {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            throw new AppError('Missing required fields to register a new user', 'bad_request');
        }

        const newUser = await userService.create({ name, email, password });
        res.status(201).json({ message: `New user ${newUser.getId()} created successfully` });
    }
}

export const userController = new UserController();
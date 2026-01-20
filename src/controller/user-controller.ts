import { userService } from '../service/user-service';
import { Request, Response } from 'express';
import { BadRequestError } from '../utils/api-error';

class UserController {
    async create(req: Request, res: Response) {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            throw new BadRequestError('Missing required fields to register a new user');
        }
        const newUser = await userService.create({ name, email, password });
        res.status(201).json({ message: `New user ${newUser.getId()} created successfully` });
    }

    async getAllUserInfo(req: Request, res: Response) {
        const { userId } = req.params;
        if (!userId) {
            throw new BadRequestError('Missing id in request body');
        }
        const user = await userService.getAllUserInfo(userId);
        res.status(200).json({ data: user });
    }
}

export const userController = new UserController();
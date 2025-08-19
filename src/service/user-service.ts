import { CreateUserProps } from '../types/user-types';
import { UserModel } from '../model/user-model';
import { AppError } from '../utils/app-error';
import { userRepository } from '../repository/user-repository';
import { transactionService } from './transaction-service';
import bcrypt from 'bcrypt';

class UserService {
    validadeData(user: CreateUserProps) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(user.email)) {
            throw new AppError('Invalid email');
        }

        if (!passwordRegex.test(user.password)) {
            throw new AppError('Weak password');
        }
    }

    async getById(id: string): Promise<UserModel> {
        const user = await userRepository.getById(id);
        if (!user) {
            throw new AppError('User not found', 'not_found');
        }
        return new UserModel(user);
    }

    async getAllUserInfo (userId: string) {
        const user = await this.getById(userId);
        const summary = await transactionService.getSummary(userId)

        return {
            user,
            summary
        }
    }

    async create(user: CreateUserProps): Promise<UserModel> {
        this.validadeData(user);

        const hashedPassword = await bcrypt.hash(user.password, 10);
        const emailExists = await userRepository.findByEmail(user.email);

        if (emailExists) {
            throw new AppError('Email is already registered');
        }

        const newUser = await userRepository.create({
            name: user.name,
            email: user.email,
            password: hashedPassword
        });

        return new UserModel(newUser);
    }
}

export const userService = new UserService();
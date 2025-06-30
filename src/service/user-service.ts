import { CreateUserProps } from '../types/user-types';
import { UserModel } from '../model/user-model';
import { AppError } from '../utils/app-error';
import { userRepository } from '../repository/user-repository';
import bcrypt from 'bcrypt';

class UserService {
    constructor () {}

    validadeData (user: CreateUserProps) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;

        if (!user.email.includes('@')) {
            throw new AppError('Invalid email');
        }

        if (!passwordRegex.test(user.password)) {
            throw new AppError('Weak password');
        }
    }

    async create (user: CreateUserProps): Promise<UserModel> {
        this.validadeData(user);

        try {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            const emailExists = await userRepository.findByEmail(user.email);

            if(emailExists) {
                throw new AppError('Email sent is already registered');
            }

            const newUser = await userRepository.create({
                name: user.name, 
                email: user.email, 
                password: hashedPassword
            });

            return new UserModel(newUser);
        } catch (error) {
            console.error('Error in userService.create: ' + error);
            throw new AppError('Internal server error', 500);
        }
    }
}

export const userService = new UserService(); 
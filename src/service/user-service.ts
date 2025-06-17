import { CreateUserProps, UserProps } from '../types/user-types';
import { UserModel } from '../model/user-model';
import { userRepository } from '../repository/user-repository';
import bcrypt from 'bcrypt';

class UserService {
    constructor () {}

    validadeData (user: CreateUserProps) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;

        if (!user.email.includes('@')) {
            throw new Error ('Invalid email');
        }

        if (!passwordRegex.test(user.password)) {
            throw new Error ('Invalid password');
        }
    }

    async create (user: CreateUserProps): Promise<UserModel> {
        this.validadeData(user);

        const hashedPassword = await bcrypt.hash(user.password, 10);
        const emailExists = await userRepository.findByEmail(user.email);
        
        if(emailExists) {
            throw new Error('Email sent is already registered');
        }

        const newUser = await userRepository.create({
            name: user.name, 
            email: user.email, 
            password: hashedPassword
        });

        return new UserModel(newUser);
    }
}
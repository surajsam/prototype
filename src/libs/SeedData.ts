import { UserRepository } from '../repositories';
import { IUserCreate } from 'IUser';
import * as bcrypt from 'bcrypt';

export const seedData = async() => {
    const userRepository = new UserRepository();
    try {
        const count = await userRepository.count();
        const hash = await bcrypt.hash('root@123', 10);
        console.log('number of users ', count);
        const initData: IUserCreate = {
            name: 'suraj aggarwal',
            password: hash,
            email: 'suraj@gmail.com',
            createdBy: 'suraj',
            role: 'admin',
        };
        if (!count) {
            const RootUser = await userRepository.create(initData);
            console.log('Root User ', RootUser);
        }
    } catch (err) {
        throw new Error(err);
    }
};

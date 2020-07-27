import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { UserRepository } from '../../repositories';
import { IUserCreate } from 'IUser';
import { ExpirationDate } from '../../libs/utils';
import { configuration } from '../../config';

class UserController {
    private static instance: UserController;
    private userRepository: UserRepository = new UserRepository();
    private constructor() {
    }

    static getInstance(): UserController {
        if (UserController.instance instanceof UserController) {
            return UserController.instance;
        }
        UserController.instance = new UserController();
        return UserController.instance;
    }

    public post = async (req: Request, res: Response) => {
        try {
            const { userRepository } = this;
            const payload: IUserCreate = req.body;
            const { password } = req.body;
            const hash = await bcrypt.hash(password, 10);
            payload.password = hash;
            const user = await userRepository.create(payload);
            res.send({
                message: 'User Created Successfully',
                status: 'success',
                statusCode: 201,
                user,
            });
        } catch (err) {
            res.send({
                message: 'Failed to Create User',
                status: 'error',
                statusCode: 500,
                error: err.message,
            });
        }
    }

    public put = async(req: Request, res: Response) => {
        try {

            const query = JSON.parse(JSON.stringify(req.query));
            const { userRepository } = this;
            const { originalId } = query;
            const payload: object = req.body;
            const user = await userRepository.update(originalId, 'suraj', payload);
            res.send({
                message: 'User Updated Successfully',
                status: 'success',
                statusCode: 200,
                user,
            });
        } catch (err) {
            res.send({
                message: 'Failed to Update User',
                status: 'error',
                statusCode: 500,
                error: err.message,
            });
        }
    }

    public delete = async(req: Request, res: Response) => {
        try {
            const { userRepository } = this;
            const { originalId } = req.params;
            const ownerId = 'suraj';
            const user = await userRepository.delete(originalId, ownerId);
            res.send({
                message: 'User Deleted Successfully',
                status: 'success',
                statusCode: 200,
                user,
            });
        } catch (err) {
            res.send({
                message: 'Failed to Delete User',
                status: 'error',
                statusCode: 500,
                error: err.message,
            });
        }
    }

    public get = async(req: Request, res: Response) => {
        try {
            const { userRepository } = this;
            const condition = req.body;
            const user = await userRepository.get(condition);
            res.send({
                message: 'User profile',
                status: 'success',
                statusCode: 200,
                user,
            });
        } catch (err) {
            res.send({
                message: 'Internal Server Error',
                status: 'error',
                statusCode: 500,
            });
        }
    }

    public login = async(req: Request, res: Response) => {
        try {
            const { secretKey } = configuration;
            const { userRepository } = this;
            const { email, password } = req.body;
            const condition = { email };
            const document = await userRepository.get(condition);
            const match = await bcrypt.compare(password, document.password);
            if (!document || !match) {
                res.send({
                    message: 'Incorrect email or password',
                    status: 'error',
                    statusCode: 403,
                    error: 'forbidden'
                });
                return;
            }
            const { originalId, role, createAt } = document;
            const data = { email, originalId, role, createAt};
            const token = jwt.sign({ExpirationDate, data }, secretKey);
            res.send({
                message: 'token generated',
                status: 'success',
                statusCode: 200,
                token,
            });
        } catch (err) {
            res.send({
                message: 'Internal server error',
                status: 'error',
                statusCode: 500,
                error: err.message
            });
        }
    };

    public getAll = async (req: Request, res: Response, ) => {
        try {
            const { condition, skip, limit, sortBy } = JSON.parse(JSON.stringify(req.query));
            const filter: object = JSON.parse(condition);
            const from: number = Number.parseInt(skip, 10);
            const to: number = Number.parseInt(limit, 10);
            const { userRepository } = this;
            const data = await userRepository.getAll(filter, from, to, sortBy);
            res.send({
                message: 'user list',
                status: 'success',
                statusCode: 200,
                count: data.length,
                data,
            });
        } catch (err) {
            res.send({
                message: 'Internal server error',
                status: 'error',
                statusCode: 500,
                err: err.message
            });
        }
    }
}

export default UserController.getInstance();

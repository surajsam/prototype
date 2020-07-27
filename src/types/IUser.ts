import * as mongoose from 'mongoose';

export interface IUserCreate extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    createdBy: string;
    role: string;
}

export interface IUser extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    createAt: Date;
    role: string;
    status: string;
    originalId: string;
    createdBy: string;
    updatedAt?: Date;
    updatedBy?: string;
    deletedAt?: Date;
    deletedBy?: string;
}

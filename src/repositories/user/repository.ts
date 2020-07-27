import { VersionableRepository } from '../../services';
import { userModel } from './model';
import { IUserCreate, IUser } from '../../types/IUser';

class UserRepository extends VersionableRepository {
    constructor() {
        super(userModel);
    }

    count = (): number => {
        return userModel.countDocuments();
    }
    public create(record: IUserCreate): Promise<IUser> {
        try {
            return super.create(record);
        } catch (err) {
            throw new Error(err);
        }
    }

    public delete(originalId: string, ownerId: string): Promise<IUser> {
        try {
            return super.delete(originalId, ownerId);
        } catch (err) {
            throw new Error(err);
        }
    }

    public update(originalId: string = '', ownerId: string = '', data: object = {}): Promise<IUser> {
        try {
            return super.update(originalId, ownerId, data);
        } catch (err) {
            throw new Error(err);
        }
    }

    public get(condition: object): Promise<IUser> {
        try {
            return super.get(condition);
        } catch (err) {
            throw new Error(err);
        }
    }

    public getAll(condition: object, skip: number = 0, limit: number = 5, sortBy: string = 'createdAt -1'): Promise<IUser[]> {
        try {
            return super.getAll(condition, skip, limit, sortBy);
        } catch (err) {
            throw new Error(err);
        }
    }
}

export default UserRepository;

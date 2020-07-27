import * as mongoose from 'mongoose';

export class VersionableRepository {
    private modelType;
    constructor(model) {
        this.modelType = model;
    }

    getObjectId = () => {
        return mongoose.Types.ObjectId();
    }

    public async create (record: object = {}): Promise<mongoose.document> {
        try {
            const data = {
                ...record,
                originalId: this.getObjectId(),
            };
            return this.modelType.create(data);
        } catch (err) {
            throw new Error(err);
        }
    }

    public async delete(originalId: string = '', ownerId: string = ''): Promise<mongoose.document> {
        try {
            const condition: object = { originalId, deletedAt: undefined };
            const document: any = await this.modelType.findOne(condition).lean();
            delete document._id;
            const record: object = {
                ...document,
                deletedAt: new Date(),
                deletedBy: ownerId,
            };
            return this.modelType.create(record);
        } catch (err) {
            throw new Error(err);
        }
    }

    public async update(originalId: string = '', ownerId: string = '', data: object = {}): Promise<mongoose.document> {
        try {
            const condition: object = { originalId, deletedAt: undefined };
            const update: object = { deletedAt: Date.now(), deletedBy: ownerId};
            const document: any = await this.modelType.findOneAndUpdate(condition, update, {useFindAndModify : false}).lean();
            delete document._id;
            const record: object = {
                ...document,
                ...data,
                updatedBy: ownerId,
                updatedAt: new Date(),
            };
            return this.modelType.create(record);
        } catch (err) {
            throw new Error(err);
        }
    }

    public get(condition: object): Promise<mongoose.document> {
        try {
            return this.modelType.findOne(condition).lean();
        } catch (err) {
            throw new Error(err);
        }
    }

    public getAll(condition: object, skip: number, limit: number, sortBy: string): Promise<mongoose.document> {
        try {
            return this.modelType.find(condition).sort(sortBy).skip(skip).limit(limit);
        } catch (err) {
            throw new Error(err);
        }
    }
}

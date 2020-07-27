import { Schema } from 'mongoose';

export class VersionableSchema extends Schema {
    constructor(schema, options) {
        const genericSchema = new Schema({
            createdBy: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                required: true,
                default: Date.now
            },
            deletedBy: {
                type: String,
                required: false
            },
            deletedAt: {
                type: Date,
                required: false,
            },
            updatedBy: {
                type: String,
                required: false
            },
            updatedAt: {
                type: Date,
                required: false,
            },
            originalId: {
                type: String,
                required: true
            },
            ...schema
        });
        super(genericSchema, options);
    }
}

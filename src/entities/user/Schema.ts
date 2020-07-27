import { VersionableSchema } from '../versionable/Schema';
import { emailRegex, onlyAlphbetRegex } from '../../libs/utils';

export class UserSchema extends VersionableSchema {
    constructor(options) {
        const userschema = {
            name: {
                type: String,
                required: true,
                validate: [onlyAlphbetRegex, 'Name must be a string']
            },
            email: {
                type: String,
                required: true,
                index: {unique: true, dropDups: true},
                validate: [emailRegex, 'Must be a valid email']
            },
            password: {
                type: String,
                required: true,
            },
            role: {
                type: String,
                required: true,
            },
            status: {
                type: String,
                required: true,
                default: 'pending'
            }
        };
        super(userschema, options);
    }
}

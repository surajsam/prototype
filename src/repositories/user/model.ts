import { model } from 'mongoose';
import { UserSchema } from '../../entities/user/Schema';

const userschema = new UserSchema({
    collection: 'Users'
});

export const userModel = model('User', userschema, 'Users', true);

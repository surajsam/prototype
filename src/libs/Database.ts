import * as mongoose from 'mongoose';
import { seedData } from './SeedData';

class Database {
    static open = (url: string) => new Promise((resolve, reject) => {
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true },
            (err) => {
                if (!err) {
                    seedData();
                    resolve('Database connection sucessfull');
                }
                reject('Database connection failed');
            });
        })

    disconnect() {
        mongoose.disconnect();
    }
}

export default Database;

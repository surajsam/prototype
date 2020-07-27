import {
adminOperations,
consumerOperations,
admin,
consumer,
} from './utils';

export const hasPermission = (role: string, operation: string): boolean => {
        switch (role) {
        case admin:
        return adminOperations.indexOf(operation) !== -1 ?  true : false;
        case consumer:
        return consumerOperations.indexOf(operation) !== -1 ? true : false;
        default:
        return false;
        }
};

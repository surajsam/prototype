import { Request, Response, NextFunction } from 'express';
import { hasPermission } from '../libs/permission';
import * as jwt from  'jsonwebtoken';
import { configuration } from '../config';

export const authMiddleWare = (operation: string) => (
    req: Request,
    res: Response,
    next: NextFunction
    ) => {
    const { secretKey = '' } = configuration;
    const { token = '' }  = req.query;
    const decoded = jwt.verify(token, secretKey);
    const { data: { role = '' } } = decoded;
    if (!token || !hasPermission(role, operation)) {
        res.send({
            message: 'UnAuthorized Access',
            status: 'error',
            statusCode: 403,
        });
        return;
    }
    next();
};

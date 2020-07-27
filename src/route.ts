import { Router } from 'express';
import { userRouter } from './controllers/index';

const mainRouter = Router();

mainRouter.use('/user', userRouter);

export default mainRouter;

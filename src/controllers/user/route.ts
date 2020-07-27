import { Router } from 'express';
import { authMiddleWare } from '../../middlewares';
import Controller from './controller';

const router = Router();

router.post('/post', Controller.post);
router.put('/put', authMiddleWare('update'), Controller.put);
router.delete('/delete/:originalId', authMiddleWare('delete'), Controller.delete);
router.post('/login', Controller.login);
router.get('/getAll', authMiddleWare('verify'), Controller.getAll);

export default router;

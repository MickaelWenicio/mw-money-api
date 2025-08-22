import { Router } from 'express';
import { transactionController } from '../controller/transaction-controller';

const router = Router();

router.post('/', transactionController.create);
router.delete('/:transactionId', transactionController.deleteById);
router.put('/:transactionId', transactionController.updateById);
router.get('/:transactionId', transactionController.getById);
router.get('/user/:userId', transactionController.getByUserId);

export default router;
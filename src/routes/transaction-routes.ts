import { Router } from 'express';
import { transactionController } from '../controller/transaction-controller';

const router = Router();

router.post('/', transactionController.create);
router.get('/:userId', transactionController.getByUserId);
router.delete('/:transactionId', transactionController.deleteById);

export default router;
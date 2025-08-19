import { Router } from 'express';
import { transactionController } from '../controller/transaction-controller';

const router = Router();

router.post('/', transactionController.create);
router.get('/:id', transactionController.getByUserId);
router.delete('/:id', transactionController.deleteById);

export default router;
import { Router } from 'express';
import { transactionController } from '../controller/transaction-controller';

const router = Router();

router.post('/', transactionController.create);
router.get('/', transactionController.getByUserId);
router.delete('/delete', transactionController.deleteById);

export default router;
import { Router } from 'express';
import * as riskController from '../controllers/riskController';

const router = Router();

router.get('/', riskController.getAllRisks);
router.get('/:id', riskController.getRisk);
router.post('/', riskController.createRisk);
router.put('/:id', riskController.updateRisk);
router.delete('/:id', riskController.deleteRisk);

export default router;
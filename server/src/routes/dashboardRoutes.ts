import { Router } from 'express';
import * as dashboardController from '../controllers/dashboardController';

const router = Router();

router.get('/stats', dashboardController.getDashboardStats);
router.get('/heatmap', dashboardController.getHeatmapData);
router.get('/top-risks', dashboardController.getTopRisks);
router.get('/category-breakdown', dashboardController.getCategoryBreakdown);

export default router;
import { Request, Response } from 'express';
import db from '../config/database';

export const getDashboardStats = (req: Request, res: Response) => {
  try {
    const totalRisks = db.prepare('SELECT COUNT(*) as count FROM risks').get() as { count: number };
    const criticalRisks = db.prepare('SELECT COUNT(*) as count FROM risks WHERE risk_score >= 16').get() as { count: number };
    const highRisks = db.prepare('SELECT COUNT(*) as count FROM risks WHERE risk_score BETWEEN 12 AND 15').get() as { count: number };
    const mediumRisks = db.prepare('SELECT COUNT(*) as count FROM risks WHERE risk_score BETWEEN 6 AND 11').get() as { count: number };
    const lowRisks = db.prepare('SELECT COUNT(*) as count FROM risks WHERE risk_score BETWEEN 1 AND 5').get() as { count: number };
    const avgScore = db.prepare('SELECT AVG(risk_score) as avg FROM risks').get() as { avg: number };
    const openRisks = db.prepare("SELECT COUNT(*) as count FROM risks WHERE status = 'Open'").get() as { count: number };


    res.json({
      success: true,
      data: {
        totalRisks: totalRisks.count,
        criticalRisks: criticalRisks.count,
        highRisks: highRisks.count,
        mediumRisks: mediumRisks.count,
        lowRisks: lowRisks.count,
        averageRiskScore: Math.round(avgScore.avg * 10) / 10,
        openRisks: openRisks.count,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getHeatmapData = (req: Request, res: Response) => {
  try {
    const heatmapMatrix = [];

    for (let impact = 5; impact >= 1; impact--) {
      for (let probability = 1; probability <= 5; probability++) {
        const risks = db.prepare('SELECT risk_id FROM risks WHERE impact_score = ? AND probability_score = ?')
          .all(impact, probability) as { risk_id: string }[];

        const riskScore = impact * probability;
        let severity = 'low';
        if (riskScore >= 16) severity = 'critical';
        else if (riskScore >= 12) severity = 'high';
        else if (riskScore >= 6) severity = 'medium';

        heatmapMatrix.push({
          impact,
          probability,
          count: risks.length,
          riskScore,
          severity,
          riskIds: risks.map(r => r.risk_id),
        });
      }
    }

    res.json({ success: true, data: heatmapMatrix });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTopRisks = (req: Request, res: Response) => {
  try {
    const topRisks = db.prepare('SELECT * FROM risks ORDER BY risk_score DESC LIMIT 10').all();
    res.json({ success: true, data: topRisks });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCategoryBreakdown = (req: Request, res: Response) => {
  try {
    const breakdown = db.prepare('SELECT category, COUNT(*) as count FROM risks GROUP BY category').all();
    res.json({ success: true, data: breakdown });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
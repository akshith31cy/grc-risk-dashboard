import { Request, Response } from 'express';
import * as riskModel from '../models/riskModel';

export const getAllRisks = (req: Request, res: Response) => {
  try {
    const filters = {
      category: req.query.category as string,
      status: req.query.status as string,
      minRiskScore: req.query.minRiskScore ? parseInt(req.query.minRiskScore as string) : undefined,
      maxRiskScore: req.query.maxRiskScore ? parseInt(req.query.maxRiskScore as string) : undefined,
    };

    const risks = riskModel.getRisks(filters);
    res.json({ success: true, data: risks, count: risks.length });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getRisk = (req: Request, res: Response) => {
  try {
    const risk = riskModel.getRiskById(req.params.id);
    if (!risk) {
      return res.status(404).json({ success: false, message: 'Risk not found' });
    }
    res.json({ success: true, data: risk });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createRisk = (req: Request, res: Response) => {
  try {
    const newRisk = riskModel.createRisk(req.body);
    res.status(201).json({ success: true, data: newRisk });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateRisk = (req: Request, res: Response) => {
  try {
    const updatedRisk = riskModel.updateRisk(req.params.id, req.body);
    if (!updatedRisk) {
      return res.status(404).json({ success: false, message: 'Risk not found' });
    }
    res.json({ success: true, data: updatedRisk });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteRisk = (req: Request, res: Response) => {
  try {
    const deleted = riskModel.deleteRisk(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Risk not found' });
    }
    res.json({ success: true, message: 'Risk deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
import db from '../config/database';
import { Risk } from '../types';

export const getRisks = (filters?: any): Risk[] => {
  let query = 'SELECT * FROM risks WHERE 1=1';
  const params: any[] = [];

  if (filters?.category) {
    query += ' AND category = ?';
    params.push(filters.category);
  }

  if (filters?.status) {
    query += ' AND status = ?';
    params.push(filters.status);
  }

  if (filters?.minRiskScore) {
    query += ' AND risk_score >= ?';
    params.push(filters.minRiskScore);
  }

  if (filters?.maxRiskScore) {
    query += ' AND risk_score <= ?';
    params.push(filters.maxRiskScore);
  }

  query += ' ORDER BY risk_score DESC';

  const stmt = db.prepare(query);
  return stmt.all(...params) as Risk[];
};

export const getRiskById = (risk_id: string): Risk | undefined => {
  const stmt = db.prepare('SELECT * FROM risks WHERE risk_id = ?');
  return stmt.get(risk_id) as Risk | undefined;
};

export const createRisk = (risk: Omit<Risk, 'risk_score' | 'created_at' | 'updated_at'>): Risk => {
  const stmt = db.prepare(`
    INSERT INTO risks (risk_id, risk_name, category, description, impact_score, probability_score, status, owner)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    risk.risk_id,
    risk.risk_name,
    risk.category,
    risk.description || null,
    risk.impact_score,
    risk.probability_score,
    risk.status,
    risk.owner || null
  );

  return getRiskById(risk.risk_id)!;
};

export const updateRisk = (risk_id: string, updates: Partial<Risk>): Risk | undefined => {
  const fields = [];
  const values = [];

  if (updates.risk_name) {
    fields.push('risk_name = ?');
    values.push(updates.risk_name);
  }
  if (updates.category) {
    fields.push('category = ?');
    values.push(updates.category);
  }
  if (updates.description !== undefined) {
    fields.push('description = ?');
    values.push(updates.description);
  }
  if (updates.impact_score) {
    fields.push('impact_score = ?');
    values.push(updates.impact_score);
  }
  if (updates.probability_score) {
    fields.push('probability_score = ?');
    values.push(updates.probability_score);
  }
  if (updates.status) {
    fields.push('status = ?');
    values.push(updates.status);
  }
  if (updates.owner !== undefined) {
    fields.push('owner = ?');
    values.push(updates.owner);
  }

  fields.push('updated_at = CURRENT_TIMESTAMP');
  values.push(risk_id);

  const stmt = db.prepare(`UPDATE risks SET ${fields.join(', ')} WHERE risk_id = ?`);
  stmt.run(...values);

  return getRiskById(risk_id);
};

export const deleteRisk = (risk_id: string): boolean => {
  const stmt = db.prepare('DELETE FROM risks WHERE risk_id = ?');
  const result = stmt.run(risk_id);
  return result.changes > 0;
};
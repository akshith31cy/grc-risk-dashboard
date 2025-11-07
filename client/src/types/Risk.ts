export interface Risk {
  risk_id: string;
  risk_name: string;
  category: string;
  description?: string;
  impact_score: number;
  probability_score: number;
  risk_score: number;
  status: 'Open' | 'Mitigated' | 'Accepted' | 'Transferred' | 'Closed';
  owner?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Control {
  control_id: string;
  control_name: string;
  control_type: 'Preventive' | 'Detective' | 'Corrective' | 'Compensating';
  description?: string;
  implementation_status: 'Planned' | 'In Progress' | 'Implemented' | 'Not Implemented';
  effectiveness_rating?: number;
  nist_csf?: string;
  iso27001_ref?: string;
  created_at?: string;
  updated_at?: string;
}

export interface RiskControlMapping {
  mapping_id: number;
  risk_id: string;
  control_id: string;
  mapping_type: 'Primary' | 'Secondary' | 'Compensating';
  created_at?: string;
}

export interface DashboardStats {
  totalRisks: number;
  criticalRisks: number;
  highRisks: number;
  mediumRisks: number;
  lowRisks: number;
  averageRiskScore: number;
  openRisks: number;
}

export interface HeatmapCell {
  impact: number;
  probability: number;
  count: number;
  riskScore: number;
  severity: string;
  riskIds: string[];
}

export interface CategoryBreakdown {
  category: string;
  count: number;
}
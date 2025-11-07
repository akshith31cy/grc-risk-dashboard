import api from './api';
import type { Risk, DashboardStats, HeatmapCell } from '../types/Risk';

export const riskService = {
  // Get all risks
  getAllRisks: async (filters?: any) => {
    const response = await api.get<{ success: boolean; data: Risk[] }>('/risks', { params: filters });
    return response.data.data;
  },

  // Get single risk
  getRiskById: async (id: string) => {
    const response = await api.get<{ success: boolean; data: Risk }>(`/risks/${id}`);
    return response.data.data;
  },

  // Create risk
  createRisk: async (risk: Omit<Risk, 'risk_score' | 'created_at' | 'updated_at'>) => {
    const response = await api.post<{ success: boolean; data: Risk }>('/risks', risk);
    return response.data.data;
  },

  // Update risk
  updateRisk: async (id: string, updates: Partial<Risk>) => {
    const response = await api.put<{ success: boolean; data: Risk }>(`/risks/${id}`, updates);
    return response.data.data;
  },

  // Delete risk
  deleteRisk: async (id: string) => {
    const response = await api.delete<{ success: boolean }>(`/risks/${id}`);
    return response.data.success;
  },

  // Dashboard APIs
  getDashboardStats: async () => {
    const response = await api.get<{ success: boolean; data: DashboardStats }>('/dashboard/stats');
    return response.data.data;
  },

  getHeatmapData: async () => {
    const response = await api.get<{ success: boolean; data: HeatmapCell[] }>('/dashboard/heatmap');
    return response.data.data;
  },

  getTopRisks: async () => {
    const response = await api.get<{ success: boolean; data: Risk[] }>('/dashboard/top-risks');
    return response.data.data;
  },

  getCategoryBreakdown: async () => {
    const response = await api.get<{ success: boolean; data: any[] }>('/dashboard/category-breakdown');
    return response.data.data;
  },
};
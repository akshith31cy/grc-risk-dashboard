import React, { useEffect, useState } from 'react';
import { riskService } from '../services/riskService';
import type { Risk } from '../types/Risk';
import { getRiskSeverity, getStatusColor } from '../utils/riskCalculations';
import { Button } from '../components/common/Button';
import { Plus, Eye, Edit, Trash2, Loader } from 'lucide-react';

export const RiskRegister: React.FC = () => {
  const [risks, setRisks] = useState<Risk[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRisks();
  }, []);

  const fetchRisks = async () => {
    try {
      setLoading(true);
      const data = await riskService.getAllRisks();
      setRisks(data);
    } catch (err: any) {
      setError('Failed to load risks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (riskId: string) => {
    if (window.confirm('Are you sure you want to delete this risk?')) {
      try {
        await riskService.deleteRisk(riskId);
        setRisks(risks.filter(r => r.risk_id !== riskId));
      } catch (err) {
        alert('Failed to delete risk');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader className="animate-spin text-blue-600" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Risk Register</h1>
          <p className="text-gray-600 mt-1">Comprehensive enterprise risk inventory</p>
        </div>
        <Button onClick={() => alert('Add Risk Modal - Coming Soon')}>
          <Plus className="inline mr-2" size={20} />
          Add New Risk
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Risk ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Risk Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Impact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Probability
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Risk Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {risks.map((risk) => {
                const severity = getRiskSeverity(risk.risk_score);
                return (
                  <tr key={risk.risk_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {risk.risk_id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {risk.risk_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {risk.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {risk.impact_score}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {risk.probability_score}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${severity.bgColor} ${severity.color}`}>
                        {risk.risk_score} - {severity.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(risk.status)}`}>
                        {risk.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => alert(`View ${risk.risk_id}`)}
                          className="text-blue-600 hover:text-blue-900"
                          title="View"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => alert(`Edit ${risk.risk_id}`)}
                          className="text-green-600 hover:text-green-900"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(risk.risk_id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-sm text-gray-600">
        Showing {risks.length} risk{risks.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
};
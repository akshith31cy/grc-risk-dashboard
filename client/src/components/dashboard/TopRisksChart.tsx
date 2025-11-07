import type { FC } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { Risk } from '../../types/Risk';
import { Card } from '../common/Card';

interface TopRisksChartProps {
  risks: Risk[];
}

export const TopRisksChart: FC<TopRisksChartProps> = ({ risks }) => {
  const chartData = risks.slice(0, 5).map(risk => ({
    name: risk.risk_name.length > 30 ? risk.risk_name.substring(0, 30) + '...' : risk.risk_name,
    score: risk.risk_score,
    fullName: risk.risk_name,
    riskId: risk.risk_id,
  }));

  const getBarColor = (score: number): string => {
    if (score >= 16) return 'url(#criticalGradient)';
    if (score >= 12) return 'url(#highGradient)';
    if (score >= 6) return 'url(#mediumGradient)';
    return 'url(#lowGradient)';
  };

  return (
    <Card title="Top 5 Critical Risks" className="animate-fade-in">
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
          <defs>
            <linearGradient id="criticalGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
            <linearGradient id="highGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
            <linearGradient id="mediumGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
            <linearGradient id="lowGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis type="number" domain={[0, 25]} stroke="#6b7280" style={{ fontSize: '12px' }} />
          <YAxis 
            dataKey="name" 
            type="category" 
            width={170} 
            stroke="#6b7280"
            style={{ fontSize: '12px', fontWeight: '500' }}
          />
          <Tooltip 
            cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-white p-4 rounded-xl shadow-2xl border-2 border-blue-200 animate-scale-in">
                    <p className="font-bold text-gray-800 mb-1">{data.fullName}</p>
                    <p className="text-xs text-gray-500 mb-2">{data.riskId}</p>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                      <span className="text-sm text-gray-600">Risk Score:</span>
                      <span className="text-lg font-bold text-blue-600">{data.score}</span>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="score" radius={[0, 12, 12, 0]} barSize={30}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.score)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Risk score reference */}
      <div className="mt-6 pt-4 border-t border-gray-200 grid grid-cols-4 gap-2 text-center">
        {[
          { label: 'Critical', range: '16-25', color: 'text-red-600' },
          { label: 'High', range: '12-15', color: 'text-orange-600' },
          { label: 'Medium', range: '6-11', color: 'text-yellow-600' },
          { label: 'Low', range: '1-5', color: 'text-green-600' },
        ].map((item) => (
          <div key={item.label} className="p-2">
            <p className={`text-xs font-bold ${item.color}`}>{item.label}</p>
            <p className="text-xs text-gray-500">{item.range}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};
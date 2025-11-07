import type { FC } from 'react';
import { StatCard } from '../common/StatCard';
import { AlertTriangle, Shield, TrendingUp, CheckCircle } from 'lucide-react';
import type { DashboardStats as Stats } from '../../types/Risk';

interface DashboardStatsProps {
  stats: Stats;
}

export const DashboardStats: FC<DashboardStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up">
      <StatCard
        title="Total Risks"
        value={stats.totalRisks}
        icon={<Shield size={24} />}
        color="blue"
        trend="+2 this week"
      />
      <StatCard
        title="Critical Risks"
        value={stats.criticalRisks}
        icon={<AlertTriangle size={24} />}
        color="red"
        subtitle="Requires immediate attention"
        pulse={stats.criticalRisks > 0}
      />
      <StatCard
        title="High Risks"
        value={stats.highRisks}
        icon={<TrendingUp size={24} />}
        color="orange"
        trend="-1 from last week"
      />
      <StatCard
        title="Avg Risk Score"
        value={stats.averageRiskScore.toFixed(1)}
        icon={<CheckCircle size={24} />}
        color="green"
        subtitle="Out of 25"
      />
    </div>
  );
};
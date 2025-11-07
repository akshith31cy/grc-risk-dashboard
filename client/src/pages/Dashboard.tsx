import { useEffect, useState } from 'react';
import { DashboardStats } from '../components/dashboard/DashboardStats';
import { RiskHeatmap } from '../components/dashboard/RiskHeatmap';
import { TopRisksChart } from '../components/dashboard/TopRisksChart';
import { riskService } from '../services/riskService';
import type { DashboardStats as Stats, HeatmapCell, Risk } from '../types/Risk';
import { Loader, AlertCircle, RefreshCw } from 'lucide-react';

export const Dashboard = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [heatmapData, setHeatmapData] = useState<HeatmapCell[]>([]);
  const [topRisks, setTopRisks] = useState<Risk[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [statsData, heatmap, risks] = await Promise.all([
        riskService.getDashboardStats(),
        riskService.getHeatmapData(),
        riskService.getTopRisks(),
      ]);
      
      setStats(statsData);
      setHeatmapData(heatmap);
      setTopRisks(risks);
    } catch (err: any) {
      console.error('Dashboard fetch error:', err);
      setError('Failed to load dashboard data. Make sure the backend server is running on port 3001.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-4">
        <div className="relative">
          <Loader className="animate-spin text-blue-600" size={64} />
          <div className="absolute inset-0 bg-blue-600/20 blur-2xl rounded-full animate-pulse"></div>
        </div>
        <p className="text-gray-600 font-medium">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
        <div className="flex items-start space-x-4">
          <AlertCircle className="text-red-500 flex-shrink-0" size={32} />
          <div className="flex-1">
            <h3 className="text-lg font-bold text-red-800 mb-2">Error Loading Dashboard</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-red-700 font-semibold mb-2">Troubleshooting Steps:</p>
              <ol className="text-sm text-red-600 space-y-1 list-decimal list-inside">
                <li>Check if backend is running: <code className="bg-red-100 px-2 py-1 rounded">npm run dev</code> in server folder</li>
                <li>Verify backend URL: <a href="http://localhost:3001/api/health" target="_blank" className="underline">http://localhost:3001/api/health</a></li>
                <li>Check browser console for detailed errors (F12)</li>
              </ol>
            </div>
            <button
              onClick={fetchDashboardData}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all"
            >
              <RefreshCw size={18} className="mr-2" />
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header with Gradient */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-3xl blur-3xl"></div>
        <div className="relative glass rounded-2xl p-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">
            Risk Management Dashboard
          </h1>
          <p className="text-gray-600">Enterprise-wide risk visibility and governance overview</p>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && <DashboardStats stats={stats} />}

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {heatmapData.length > 0 && <RiskHeatmap data={heatmapData} />}
        {topRisks.length > 0 && <TopRisksChart risks={topRisks} />}
      </div>
    </div>
  );
};
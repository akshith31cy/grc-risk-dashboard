import type { FC, ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number | string;
  icon?: ReactNode;
  color?: string;
  subtitle?: string;
  trend?: string;
  pulse?: boolean;
}

export const StatCard: FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  color = 'blue', 
  subtitle,
  trend,
  pulse = false 
}) => {
  const colorClasses = {
    blue: {
      gradient: 'from-blue-500 via-cyan-500 to-teal-500',
      bg: 'from-blue-50 to-cyan-50',
      glow: 'shadow-blue-500/50',
      border: 'border-blue-300',
    },
    red: {
      gradient: 'from-red-500 via-pink-500 to-rose-500',
      bg: 'from-red-50 to-pink-50',
      glow: 'shadow-red-500/50',
      border: 'border-red-300',
    },
    orange: {
      gradient: 'from-orange-500 via-amber-500 to-yellow-500',
      bg: 'from-orange-50 to-yellow-50',
      glow: 'shadow-orange-500/50',
      border: 'border-orange-300',
    },
    green: {
      gradient: 'from-green-500 via-emerald-500 to-teal-500',
      bg: 'from-green-50 to-emerald-50',
      glow: 'shadow-green-500/50',
      border: 'border-green-300',
    },
  };

  const colors = colorClasses[color as keyof typeof colorClasses] || colorClasses.blue;
  const isPositiveTrend = trend?.startsWith('+');

  return (
    <div className={`relative overflow-hidden rounded-3xl border-2 ${colors.border} bg-gradient-to-br ${colors.bg} backdrop-blur-lg transition-all duration-500 hover:scale-110 hover:shadow-2xl ${colors.glow} ${pulse ? 'animate-pulse' : ''} card-hover group`}>
      {/* Animated gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
      
      {/* Decorative circles */}
      <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${colors.gradient} opacity-20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500`}></div>
      <div className={`absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br ${colors.gradient} opacity-20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500`}></div>
      
      <div className="relative p-6 z-10">
        <div className="flex items-start justify-between mb-5">
          <div className="flex-1">
            <p className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-2">
              {title}
            </p>
            {trend && (
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold ${isPositiveTrend ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {isPositiveTrend ? (
                  <TrendingUp size={14} className="mr-1" />
                ) : (
                  <TrendingDown size={14} className="mr-1" />
                )}
                {trend}
              </div>
            )}
          </div>
          {icon && (
            <div className={`p-4 rounded-2xl bg-gradient-to-br ${colors.gradient} text-white shadow-2xl ${colors.glow} transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500`}>
              {icon}
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <p className={`text-5xl font-black bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent drop-shadow-sm`}>
            {value}
          </p>
          {subtitle && (
            <p className="text-sm font-semibold text-gray-600 flex items-center">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Bottom accent with shimmer */}
      <div className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${colors.gradient}`}>
        <div className="shimmer absolute inset-0"></div>
      </div>
    </div>
  );
};
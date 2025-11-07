import { useState, Fragment } from 'react';
import type { HeatmapCell } from '../../types/Risk';
import { Card } from '../common/Card';
import { X } from 'lucide-react';

interface RiskHeatmapProps {
  data: HeatmapCell[];
}

export const RiskHeatmap: React.FC<RiskHeatmapProps> = ({ data }) => {
  const [selectedCell, setSelectedCell] = useState<HeatmapCell | null>(null);

  const getColor = (score: number, count: number): string => {
    if (count === 0) return 'bg-gray-100 border-gray-200';
    if (score >= 16) return 'bg-gradient-to-br from-red-500 to-red-600 border-red-400 shadow-lg shadow-red-500/30';
    if (score >= 12) return 'bg-gradient-to-br from-orange-500 to-orange-600 border-orange-400 shadow-lg shadow-orange-500/30';
    if (score >= 6) return 'bg-gradient-to-br from-yellow-400 to-yellow-500 border-yellow-300 shadow-lg shadow-yellow-500/30';
    return 'bg-gradient-to-br from-green-500 to-green-600 border-green-400 shadow-lg shadow-green-500/30';
  };

  const gridRows: HeatmapCell[][] = [];
  for (let i = 0; i < 5; i++) {
    gridRows.push(data.slice(i * 5, (i + 1) * 5));
  }

  return (
    <Card title="Risk Heatmap Matrix" className="animate-fade-in">
      <div className="flex gap-4">
        {/* Y-axis labels */}
        <div className="flex flex-col justify-between pt-8 pb-6 pr-3 border-r border-gray-200">
          <div className="flex flex-col justify-around flex-1 gap-2">
            {[5, 4, 3, 2, 1].map((num) => (
              <div key={num} className="flex items-center justify-center">
                <span className="font-bold text-gray-700 text-sm">{num}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 -rotate-90 origin-center whitespace-nowrap">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Impact →
            </span>
          </div>
        </div>

        {/* Heatmap grid */}
        <div className="flex-1">
          <div className="grid grid-cols-5 gap-3">
            {gridRows.map((row, rowIndex) => (
              <Fragment key={`row-${rowIndex}`}>
                {row.map((cell, colIndex) => (
                  <button
                    key={`cell-${rowIndex}-${colIndex}`}
                    onClick={() => setSelectedCell(cell)}
                    className={`aspect-square border-2 rounded-xl cursor-pointer transition-all duration-300 hover:scale-110 hover:z-10 flex flex-col items-center justify-center ${getColor(cell.riskScore, cell.count)} ${selectedCell?.impact === cell.impact && selectedCell?.probability === cell.probability ? 'ring-4 ring-blue-500 scale-105' : ''}`}
                    title={`Impact: ${cell.impact}, Probability: ${cell.probability}\nRisks: ${cell.count}\nScore: ${cell.riskScore}`}
                  >
                    <span className={`text-2xl font-bold ${cell.count > 0 ? 'text-white drop-shadow-lg' : 'text-gray-400'}`}>
                      {cell.count}
                    </span>
                    <span className="text-xs font-semibold text-white/90 mt-1">
                      {cell.riskScore}
                    </span>
                  </button>
                ))}
              </Fragment>
            ))}
          </div>

          {/* X-axis labels */}
          <div className="flex justify-around mt-4 pt-3 border-t border-gray-200">
            {[1, 2, 3, 4, 5].map((num) => (
              <span key={num} className="font-bold text-gray-700 text-sm">{num}</span>
            ))}
          </div>
          <div className="text-center mt-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              ← Probability
            </span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Risk Severity</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Critical', range: '(16-25)', color: 'from-red-500 to-red-600' },
            { label: 'High', range: '(12-15)', color: 'from-orange-500 to-orange-600' },
            { label: 'Medium', range: '(6-11)', color: 'from-yellow-400 to-yellow-500' },
            { label: 'Low', range: '(1-5)', color: 'from-green-500 to-green-600' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.color} shadow-md`}></div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{item.label}</p>
                <p className="text-xs text-gray-500">{item.range}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected cell modal */}
      {selectedCell && selectedCell.count > 0 && (
        <div className="mt-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 p-6 animate-scale-in shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="text-lg font-bold text-gray-800 mb-1">
                Risk Cell Details
              </h4>
              <p className="text-sm text-gray-600">
                Impact <span className="font-bold text-blue-600">{selectedCell.impact}</span> × 
                Probability <span className="font-bold text-blue-600">{selectedCell.probability}</span> = 
                Score <span className="font-bold text-blue-600">{selectedCell.riskScore}</span>
              </p>
            </div>
            <button
              onClick={() => setSelectedCell(null)}
              className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>
          
          <div className="bg-white rounded-lg p-4 mb-3">
            <p className="text-sm font-semibold text-gray-700 mb-2">
              {selectedCell.count} risk{selectedCell.count !== 1 ? 's' : ''} identified
            </p>
          </div>

          <ul className="space-y-2">
            {selectedCell.riskIds.map((riskId) => (
              <li key={riskId}>
                <button className="w-full text-left px-4 py-2 bg-white rounded-lg hover:bg-blue-50 border border-blue-100 transition-colors text-sm font-medium text-blue-600 hover:text-blue-700">
                  {riskId}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
};
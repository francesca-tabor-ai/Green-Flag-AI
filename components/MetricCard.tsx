
import React from 'react';
import { TrendingUp, TrendingDown, Minus, Info } from 'lucide-react';
import { AssuranceMetric } from '../types';

const MetricCard: React.FC<{ metric: AssuranceMetric; onClick?: () => void }> = ({ metric, onClick }) => {
  const isPos = metric.status === 'positive';
  const isNeg = metric.status === 'negative';

  return (
    <div 
      onClick={onClick}
      className={`p-6 rounded-[32px] border border-gray-100 transition-all duration-300 bg-white group relative overflow-hidden ${
        onClick ? 'cursor-pointer hover:shadow-2xl hover:shadow-gray-200/40 hover:border-gray-300 hover:-translate-y-1 active:scale-[0.98]' : 'cursor-default'
      }`}
    >
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="flex items-center gap-1.5">
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{metric.name}</h3>
          {metric.technicalLabel && (
            <div className="group/tip relative">
              <Info className="w-3 h-3 text-gray-300 cursor-help hover:text-gray-900 transition-colors" />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-48 p-3 bg-gray-900 text-[10px] text-white rounded-2xl opacity-0 group-hover/tip:opacity-100 transition-opacity pointer-events-none z-20 shadow-xl font-bold border border-white/10">
                {metric.technicalLabel}
              </div>
            </div>
          )}
        </div>
        <div className={`transition-transform duration-500 group-hover:scale-125 ${isPos ? 'text-green-500' : isNeg ? 'text-red-500' : 'text-gray-400'}`}>
          {isPos ? <TrendingUp className="w-4 h-4" /> : 
           isNeg ? <TrendingDown className="w-4 h-4" /> : 
           <Minus className="w-4 h-4" />}
        </div>
      </div>
      <div className="flex items-baseline gap-2 relative z-10">
        <span className="text-3xl font-black text-gray-900 tracking-tighter tabular-nums">{metric.value}</span>
        <span className={`text-[9px] font-black px-2 py-0.5 rounded-lg border transition-all duration-500 ${
          isPos ? 'bg-green-50 text-green-600 border-green-100 group-hover:bg-green-100' : 
          isNeg ? 'bg-red-50 text-red-600 border-red-100 group-hover:bg-red-100' : 
          'bg-gray-50 text-gray-600 border-gray-100'
        }`}>
          {isPos ? '↓' : isNeg ? '↑' : ''} {Math.abs(metric.change)}%
        </span>
      </div>
      <div className="mt-6 flex gap-1 h-1 items-end relative z-10">
        {[4, 7, 2, 8, 5, 9, 3, 6, 8, 10].map((h, i) => (
          <div 
            key={i} 
            className={`flex-1 rounded-full transition-all duration-1000 delay-${i * 100} ${isPos ? 'bg-green-100 group-hover:bg-green-400' : isNeg ? 'bg-red-100 group-hover:bg-red-400' : 'bg-gray-100 group-hover:bg-gray-400'}`} 
            style={{ height: `${h * 10}%` }}
          ></div>
        ))}
      </div>
      
      {/* Background decoration */}
      <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-gray-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-0"></div>
    </div>
  );
};

export default MetricCard;

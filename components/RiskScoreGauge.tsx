
import React from 'react';
import { RiskLevel } from '../types';
import { MessageSquare, ChevronRight, Activity } from 'lucide-react';

interface RiskScoreGaugeProps {
  score: number;
  level: RiskLevel;
  onDrillDown: () => void;
  onFeedback: () => void;
}

const RiskScoreGauge: React.FC<RiskScoreGaugeProps> = ({ score, level, onDrillDown, onFeedback }) => {
  const getLevelStyles = () => {
    switch (level) {
      case RiskLevel.LOW: return { color: 'text-green-500', label: 'Insignificant Risk', bg: 'bg-green-50', glow: 'shadow-green-500/20' };
      case RiskLevel.MEDIUM: return { color: 'text-yellow-500', label: 'Moderate Risk', bg: 'bg-yellow-50', glow: 'shadow-yellow-500/20' };
      case RiskLevel.HIGH: return { color: 'text-orange-500', label: 'Substantial Risk', bg: 'bg-orange-50', glow: 'shadow-orange-500/20' };
      case RiskLevel.CRITICAL: return { color: 'text-red-500', label: 'Critical Risk', bg: 'bg-red-50', glow: 'shadow-red-500/20' };
      default: return { color: 'text-gray-400', label: 'Unknown', bg: 'bg-gray-50', glow: 'shadow-gray-500/20' };
    }
  };

  const styles = getLevelStyles();
  
  // Larger radius for better legibility and distinct appearance
  const radius = 92; 
  const strokeWidth = 10; 
  const circumference = 2 * Math.PI * radius;
  const arcDegree = 240; 
  const arcLength = (arcDegree / 360) * circumference;
  
  const progressOffset = arcLength - (score / 100) * arcLength;

  const ticks = Array.from({ length: 9 }).map((_, i) => {
    const angle = 150 + (i * (240 / 8)); 
    const x1 = 100 + 84 * Math.cos((angle * Math.PI) / 180);
    const y1 = 100 + 84 * Math.sin((angle * Math.PI) / 180);
    const x2 = 100 + 88 * Math.cos((angle * Math.PI) / 180);
    const y2 = 100 + 88 * Math.sin((angle * Math.PI) / 180);
    return { x1, y1, x2, y2 };
  });

  return (
    <div className="flex flex-col items-center pt-8 pb-10 px-8 bg-white rounded-[40px] border border-gray-100 shadow-xl shadow-gray-200/20 relative overflow-hidden group h-full transition-all duration-500 hover:shadow-2xl">
      
      {/* 1. Inference Ingestion Live - Now at the top in the flex flow */}
      <div className="mb-6 flex items-center gap-2 px-4 py-2 bg-gray-50/80 backdrop-blur-sm rounded-full border border-gray-100 transition-transform group-hover:scale-105">
        <div className="relative w-2 h-2">
          <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-25"></div>
          <div className="relative w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(74,222,128,1)]"></div>
        </div>
        <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Inference Ingestion Live</span>
      </div>

      {/* 2. Progress Ring - Positioned below the pill */}
      <div className="relative w-64 h-64 flex items-center justify-center mb-4 transition-transform duration-700 group-hover:scale-[1.02]">
        {/* Background Ticks */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 200">
          {ticks.map((tick, i) => (
            <line
              key={i}
              x1={tick.x1}
              y1={tick.y1}
              x2={tick.x2}
              y2={tick.y2}
              stroke="#e5e7eb"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          ))}
        </svg>

        <svg 
          className="w-full h-full transform -rotate-[210deg] drop-shadow-sm" 
          viewBox="0 0 200 200"
        >
          {/* Background Track Arc */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="transparent"
            stroke="#f9fafb"
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
          />
          
          {/* Progress Bar Arc */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="transparent"
            stroke="url(#riskGradientDashboard)"
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset={progressOffset}
            strokeLinecap="round"
            className="transition-all duration-[1500ms] cubic-bezier(0.34, 1.56, 0.64, 1)"
          />
          
          <defs>
            <linearGradient id="riskGradientDashboard" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#facc15" />
              <stop offset="35%" stopColor="#4ade80" />
              <stop offset="70%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Central Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center -mt-2">
          <div className="flex items-baseline gap-1">
            <span className="text-7xl font-black text-gray-900 tracking-tighter tabular-nums leading-none">
              {score}
            </span>
            <span className="text-lg font-black text-gray-300">/100</span>
          </div>
          <div className="flex flex-col items-center mt-6">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 rounded-lg border border-gray-100 mb-3">
              <Activity className="w-3 h-3 text-blue-500" />
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">CRI Metrics</span>
            </div>
            <div className="h-1.5 w-24 bg-gray-100 rounded-full overflow-hidden shadow-inner">
               <div 
                className="h-full signature-gradient transition-all duration-[2000ms] ease-out" 
                style={{ width: `${score}%` }}
               />
            </div>
          </div>
        </div>
      </div>

      <div className="text-center z-10 w-full space-y-6">
        <div className={`px-6 py-2.5 rounded-2xl ${styles.bg} ${styles.color} text-[10px] font-black uppercase tracking-widest border border-current/10 shadow-sm inline-block`}>
          {styles.label}
        </div>
        
        <div className="flex items-center gap-3 justify-center">
          <button 
            onClick={onDrillDown}
            className="flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gray-900 text-[10px] font-black text-white uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-gray-200/50 active:scale-[0.95]"
          >
            Investigate Issues <ChevronRight className="w-4 h-4" />
          </button>
          <button 
            onClick={onFeedback}
            className="p-3.5 rounded-2xl bg-gray-50 text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-all border border-transparent hover:border-blue-100 group/feedback"
            title="Flag Discrepancy"
          >
            <MessageSquare className="w-4 h-4 transition-transform group-hover/feedback:rotate-12" />
          </button>
        </div>
      </div>
      
      {/* Accent glow in background */}
      <div className="absolute top-0 right-0 w-64 h-64 signature-gradient opacity-[0.03] blur-[100px] -mr-32 -mt-32 pointer-events-none"></div>
    </div>
  );
};

export default RiskScoreGauge;

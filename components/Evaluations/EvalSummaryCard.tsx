
import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { CheckCircle2, XCircle, AlertCircle, ChevronRight } from 'lucide-react';

interface EvalSummaryCardProps {
  title: string;
  score: number;
  status: 'PASS' | 'FAIL' | 'WARNING';
  trend: number[];
  onClick: () => void;
}

const EvalSummaryCard: React.FC<EvalSummaryCardProps> = ({ title, score, status, trend, onClick }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'PASS': return 'text-green-500 bg-green-50 border-green-100';
      case 'FAIL': return 'text-red-500 bg-red-50 border-red-100';
      default: return 'text-yellow-500 bg-yellow-50 border-yellow-100';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'PASS': return <CheckCircle2 className="w-4 h-4" />;
      case 'FAIL': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const data = trend.map((v, i) => ({ val: v, id: i }));

  return (
    <div 
      onClick={onClick}
      className="p-6 rounded-[32px] border border-gray-100 bg-white hover:shadow-xl hover:shadow-gray-200/40 transition-all cursor-pointer group"
    >
      <div className="flex justify-between items-start mb-4">
        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{title}</h4>
        <div className={`px-2 py-0.5 rounded-full flex items-center gap-1.5 text-[9px] font-black uppercase tracking-tighter border ${getStatusColor()}`}>
          {getStatusIcon()}
          {status}
        </div>
      </div>
      
      <div className="flex items-baseline gap-2 mb-4">
        <span className="text-3xl font-black text-gray-900 tracking-tight">{score}%</span>
        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Aggregate</span>
      </div>

      <div className="h-12 w-full mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line 
              type="monotone" 
              dataKey="val" 
              stroke={status === 'PASS' ? '#10b981' : status === 'FAIL' ? '#f87171' : '#facc15'} 
              strokeWidth={2} 
              dot={false} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="pt-4 border-t border-gray-50 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-black transition-colors">
        Deep Analysis
        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
      </div>
    </div>
  );
};

export default EvalSummaryCard;

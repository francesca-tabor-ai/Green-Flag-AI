
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { subject: 'Safety', A: 120, full: 150 },
  { subject: 'Security', A: 98, full: 150 },
  { subject: 'Quality', A: 86, full: 150 },
  { subject: 'Compliance', A: 99, full: 150 },
  { subject: 'Bias', A: 85, full: 150 },
  { subject: 'Latency', A: 65, full: 150 },
];

const RiskFactorBreakdown: React.FC = () => {
  return (
    <div className="p-8 bg-white rounded-[40px] border border-gray-100 shadow-xl shadow-gray-200/20">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Risk Vector Breakdown</h3>
          <p className="text-xs text-gray-500 font-medium mt-1 italic">Multi-dimensional sensitivity analysis</p>
        </div>
      </div>
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="#f3f4f6" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 700 }} 
            />
            <Radar
              name="Current Posture"
              dataKey="A"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.1}
              strokeWidth={2}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 pt-6 border-t border-gray-50 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Highest Variance</span>
          <span className="text-xs font-black text-red-500 uppercase tracking-tight">Security Hardening</span>
        </div>
        <button className="text-[9px] font-black text-blue-500 uppercase tracking-widest hover:text-blue-600 transition-colors">View Deep Scan</button>
      </div>
    </div>
  );
};

export default RiskFactorBreakdown;

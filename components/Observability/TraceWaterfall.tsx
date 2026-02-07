
import React, { useState } from 'react';
import { TraceSpan } from '../../types';
import { ChevronDown, ChevronRight, Activity, Terminal, Clock } from 'lucide-react';

interface TraceWaterfallProps {
  spans: TraceSpan[];
  totalDuration: number;
}

const SpanRow: React.FC<{ span: TraceSpan; totalDuration: number; depth: number }> = ({ span, totalDuration, depth }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const leftOffset = (span.startTime / totalDuration) * 100;
  const width = (span.duration / totalDuration) * 100;

  return (
    <div className="flex flex-col">
      <div 
        className="group flex items-center hover:bg-gray-50/80 border-b border-gray-50 transition-colors"
      >
        <div className="w-64 shrink-0 flex items-center gap-1 border-r border-gray-100 py-3 px-4">
          <div style={{ marginLeft: `${depth * 16}px` }} className="flex items-center gap-2 overflow-hidden">
            {span.children && span.children.length > 0 ? (
              <button onClick={() => setIsExpanded(!isExpanded)} className="p-0.5 hover:bg-gray-200 rounded">
                {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
              </button>
            ) : <div className="w-4" />}
            <span className="text-[11px] font-bold text-gray-700 truncate">{span.name}</span>
          </div>
        </div>
        
        <div className="flex-1 relative h-10 px-4 flex items-center">
          <div 
            className={`h-4 rounded-full relative ${span.status === 'error' ? 'bg-red-400' : 'bg-blue-400'} shadow-sm transition-all hover:brightness-110 cursor-help`}
            style={{ 
              left: `${leftOffset}%`, 
              width: `${Math.max(width, 0.5)}%` 
            }}
          >
            <div className="absolute top-full left-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
              <span className="bg-gray-900 text-white text-[9px] px-2 py-1 rounded-lg shadow-xl font-mono">
                {span.service} • {span.duration}ms
              </span>
            </div>
          </div>
        </div>
        
        <div className="w-24 shrink-0 text-[10px] font-mono text-gray-400 text-right px-4">
          {span.duration}ms
        </div>
      </div>
      
      {isExpanded && span.children && span.children.map(child => (
        <SpanRow key={child.id} span={child} totalDuration={totalDuration} depth={depth + 1} />
      ))}
    </div>
  );
};

export const TraceWaterfall: React.FC<TraceWaterfallProps> = ({ spans, totalDuration }) => {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
      <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Activity className="w-4 h-4 text-blue-500" />
          <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500">Distributed Trace waterfall</h4>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Clock className="w-3 h-3 text-gray-300" />
            <span className="text-[10px] font-bold text-gray-400">Total Latency: {totalDuration}ms</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-blue-400"></div>
              <span className="text-[10px] font-medium text-gray-500">Service Span</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-400"></div>
              <span className="text-[10px] font-medium text-gray-500">Error Span</span>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="flex border-b border-gray-100">
            <div className="w-64 border-r border-gray-100 px-4 py-2 text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50/30">Span Identity</div>
            <div className="flex-1 px-4 py-2 text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50/30">Timeline Distribution</div>
            <div className="w-24 px-4 py-2 text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50/30 text-right">Duration</div>
          </div>
          <div className="max-h-[500px] overflow-y-auto">
            {spans.map(span => (
              <SpanRow key={span.id} span={span} totalDuration={totalDuration} depth={0} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

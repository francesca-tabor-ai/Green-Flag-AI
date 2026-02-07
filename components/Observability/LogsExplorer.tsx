
import React, { useState, useEffect } from 'react';
import { LogEntry } from '../../types';
import { Terminal, Search, Filter, Download, Activity, Play, Pause, X } from 'lucide-react';

interface LogsExplorerProps {
  externalFilter?: string;
  onClearFilter?: () => void;
}

export const LogsExplorer: React.FC<LogsExplorerProps> = ({ externalFilter, onClearFilter }) => {
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: 'l1', timestamp: '2024-05-18T10:30:12.124Z', level: 'INFO', service: 'inference-node-01', message: 'Inference request received for session gf-8822.' },
    { id: 'l2', timestamp: '2024-05-18T10:30:13.442Z', level: 'DEBUG', service: 'vector-db', message: 'Similarity search complete. Found 4 relevant clusters.' },
    { id: 'l3', timestamp: '2024-05-18T10:30:14.001Z', level: 'WARN', service: 'safety-filter', message: 'Semantic drift threshold approaching (0.68).' },
    { id: 'l4', timestamp: '2024-05-18T10:30:15.892Z', level: 'ERROR', service: 'external-api-sink', message: 'Failed to push telemetry to Datadog. HTTP 503 Service Unavailable.' },
    { id: 'l5', timestamp: '2024-05-18T10:30:16.200Z', level: 'INFO', service: 'inference-node-01', message: 'Token generation completed. 512 tokens in 1.2s.' },
  ]);
  const [internalFilter, setInternalFilter] = useState('');
  const [isLive, setIsLive] = useState(true);

  const activeFilter = externalFilter || internalFilter;

  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(() => {
      const newLog: LogEntry = {
        id: Math.random().toString(36),
        timestamp: new Date().toISOString(),
        level: Math.random() > 0.8 ? 'WARN' : 'INFO',
        service: 'inference-node-01',
        message: 'Telemetric sync point reached. No anomalies detected.',
      };
      setLogs(prev => [newLog, ...prev].slice(0, 50));
    }, 5000);
    return () => clearInterval(interval);
  }, [isLive]);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'ERROR': return 'text-red-500 bg-red-50 border-red-100';
      case 'WARN': return 'text-yellow-500 bg-yellow-50 border-yellow-100';
      case 'DEBUG': return 'text-purple-500 bg-purple-50 border-purple-100';
      default: return 'text-blue-500 bg-blue-50 border-blue-100';
    }
  };

  const filteredLogs = logs.filter(l => 
    l.message.toLowerCase().includes(activeFilter.toLowerCase()) || 
    l.service.toLowerCase().includes(activeFilter.toLowerCase()) ||
    l.timestamp.includes(activeFilter)
  );

  return (
    <div className="bg-white rounded-[40px] border border-gray-100 overflow-hidden shadow-2xl shadow-gray-200/20 flex flex-col h-[600px] animate-in fade-in">
      <div className="px-8 py-6 border-b border-gray-50 bg-gray-50/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Terminal className="w-5 h-5 text-gray-400" />
          <h4 className="text-sm font-black uppercase tracking-[0.2em] text-gray-900">Telemetry logs</h4>
          {externalFilter && (
            <div className="flex items-center gap-2 px-2 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black border border-blue-100 animate-in zoom-in-95">
              FILTER: {externalFilter}
              <button onClick={onClearFilter} className="hover:text-blue-800"><X className="w-3 h-3" /></button>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          {!externalFilter && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search logs..." 
                value={internalFilter}
                onChange={(e) => setInternalFilter(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-xl border border-gray-100 text-xs focus:ring-2 focus:ring-green-100 outline-none w-64 bg-white"
              />
            </div>
          )}
          <button 
            onClick={() => setIsLive(!isLive)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isLive ? 'bg-green-500 text-white shadow-lg shadow-green-200/50' : 'bg-gray-100 text-gray-400'}`}
          >
            {isLive ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            {isLive ? 'Live Stream' : 'Paused'}
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto font-mono text-[11px] p-2 space-y-1 bg-gray-900">
        {filteredLogs.map(log => (
          <div key={log.id} className="group flex gap-4 p-2 hover:bg-white/5 rounded-lg transition-colors border-l-2 border-transparent hover:border-green-400">
            <span className="text-gray-500 shrink-0 w-44">{log.timestamp.split('T')[1].replace('Z', '')}</span>
            <span className={`px-2 py-0.5 rounded uppercase font-black tracking-tighter w-14 text-center shrink-0 ${getLevelColor(log.level)}`}>
              {log.level}
            </span>
            <span className="text-blue-400 font-bold w-32 shrink-0 truncate">[{log.service}]</span>
            <span className="text-gray-200 flex-1">{log.message}</span>
          </div>
        ))}
        {filteredLogs.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-gray-500 py-20">
            <Activity className="w-12 h-12 opacity-10 mb-4" />
            <p className="font-bold text-[10px] uppercase tracking-widest">No telemetry found matching parameters</p>
          </div>
        )}
      </div>
    </div>
  );
};

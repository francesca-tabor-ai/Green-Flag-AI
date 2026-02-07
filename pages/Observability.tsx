
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { LogsExplorer } from '../components/Observability/LogsExplorer';
import { TraceWaterfall } from '../components/Observability/TraceWaterfall';
import AlertsConfigModal from '../components/Observability/AlertsConfigModal';
import { Trace, AlertMonitor } from '../types';
// Added Hash to the import list from lucide-react
import { Activity, LayoutGrid, Terminal, Share2, Filter, RefreshCw, Layers, Bell, Plus, Clock, Search, Zap, CheckCircle2, Hash } from 'lucide-react';

const mockMetricData = [
  { t: '10:00', latency: 120, throughput: 450, errorRate: 0.1 },
  { t: '10:05', latency: 135, throughput: 480, errorRate: 0.2 },
  { t: '10:10', latency: 110, throughput: 420, errorRate: 0.1 },
  { t: '10:15', latency: 480, throughput: 550, errorRate: 0.8 }, // Spike
  { t: '10:20', latency: 140, throughput: 510, errorRate: 0.2 },
  { t: '10:25', latency: 125, throughput: 490, errorRate: 0.1 },
  { t: '10:30', latency: 130, throughput: 505, errorRate: 0.1 },
];

const mockTrace: Trace = {
  id: 'tr-9921',
  rootService: 'edge-gateway',
  startTime: '2024-05-18T10:30:00Z',
  totalDuration: 1240,
  spans: [
    {
      id: 's1', name: 'POST /v1/inference', service: 'edge-gateway', startTime: 0, duration: 1240, status: 'ok',
      children: [
        { id: 's2', name: 'Auth Verification', service: 'auth-service', startTime: 5, duration: 45, status: 'ok' },
        { 
          id: 's3', name: 'Vector Embedding generation', service: 'embedding-engine', startTime: 60, duration: 180, status: 'ok',
          children: [
            { id: 's4', name: 'LLM Tokenization', service: 'model-tokenizer', startTime: 65, duration: 25, status: 'ok' },
            { id: 's5', name: 'Inference Pass (E)', service: 'cuda-node-01', startTime: 95, duration: 140, status: 'ok' },
          ]
        },
        { id: 's6', name: 'Similarity Search (vDB)', service: 'pinecone-sink', startTime: 250, duration: 85, status: 'ok' },
        { 
          id: 's7', name: 'Main Inference Chain', service: 'inference-coordinator', startTime: 350, duration: 850, status: 'ok',
          children: [
            { id: 's8', name: 'Prompt Template Hydration', service: 'orchestrator', startTime: 355, duration: 20, status: 'ok' },
            { id: 's9', name: 'Llama-3 GPU Cluster Inference', service: 'gpu-pool-v100', startTime: 380, duration: 810, status: 'ok' },
          ]
        },
        { id: 's10', name: 'Safety Guardrail Audit', service: 'greenflag-assurance', startTime: 1210, duration: 25, status: 'ok' },
      ]
    }
  ]
};

const Observability: React.FC = () => {
  const [view, setView] = useState<'metrics' | 'logs' | 'traces' | 'alerts' | 'combined'>('combined');
  const [selectedTimeFilter, setSelectedTimeFilter] = useState<string | undefined>(undefined);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [alerts, setAlerts] = useState<AlertMonitor[]>([
    { id: 'a1', name: 'Severe Latency Spike', type: 'METRIC', target: 'latency', threshold: 400, operator: '>', channels: ['slack'], status: 'ACTIVE', lastTriggered: '10:15' }
  ]);

  const handleChartClick = (data: any) => {
    if (data && data.activeLabel) {
      setSelectedTimeFilter(data.activeLabel);
      // Auto navigate to logs or traces for deeper investigation
      if (view === 'metrics' || view === 'combined') {
        setView('logs');
      }
    }
  };

  const addAlert = (alert: AlertMonitor) => {
    setAlerts([alert, ...alerts]);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">System Observability</h2>
          <p className="text-sm text-gray-500 mt-1 uppercase tracking-widest font-bold">Telemetric aggregation across inference vectors</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-2xl">
            {(['combined', 'metrics', 'logs', 'traces', 'alerts'] as const).map(v => (
              <button 
                key={v}
                onClick={() => setView(v)}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === v ? 'bg-white text-black shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {v}
              </button>
            ))}
          </div>
          <button 
            onClick={() => setIsAlertModalOpen(true)}
            className="p-3 rounded-2xl bg-black text-white hover:bg-gray-800 transition-all shadow-xl shadow-gray-200/50"
          >
            <Bell className="w-5 h-5" />
          </button>
        </div>
      </div>

      {view === 'combined' && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="p-8 rounded-[40px] bg-white border border-gray-100 shadow-xl shadow-gray-200/20 relative group">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">P99 Latency Distribution</h3>
                  <p className="text-xs text-gray-500 font-medium mt-1">Click a spike to correlate with system logs</p>
                </div>
                <RefreshCw className="w-4 h-4 text-gray-200 cursor-pointer hover:text-blue-500 transition-colors" />
              </div>
              <div className="h-[250px] cursor-crosshair">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockMetricData} onClick={handleChartClick}>
                    <defs>
                      <linearGradient id="colorLat" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="t" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10}} />
                    <Tooltip cursor={{ stroke: '#3b82f6', strokeWidth: 2 }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                    <Area type="monotone" dataKey="latency" stroke="#3b82f6" fillOpacity={1} fill="url(#colorLat)" strokeWidth={4} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <TraceWaterfall spans={mockTrace.spans} totalDuration={mockTrace.totalDuration} />
          </div>
          <div>
            <LogsExplorer externalFilter={selectedTimeFilter} onClearFilter={() => setSelectedTimeFilter(undefined)} />
          </div>
        </div>
      )}

      {view === 'metrics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="p-8 rounded-[40px] bg-white border border-gray-100 shadow-xl shadow-gray-200/20">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-8">System Throughput Correlation</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockMetricData} onClick={handleChartClick}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="t" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10}} />
                    <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                    <Bar dataKey="throughput" fill="#4ade80" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="p-8 rounded-[40px] bg-white border border-gray-100 shadow-xl shadow-gray-200/20">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-8">Anomaly Probability (%)</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockMetricData} onClick={handleChartClick}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="t" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10}} />
                    <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                    <Area type="stepAfter" dataKey="errorRate" stroke="#f87171" fill="#f87171" fillOpacity={0.1} strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
        </div>
      )}

      {view === 'logs' && <LogsExplorer externalFilter={selectedTimeFilter} onClearFilter={() => setSelectedTimeFilter(undefined)} />}
      {view === 'traces' && <TraceWaterfall spans={mockTrace.spans} totalDuration={mockTrace.totalDuration} />}
      
      {view === 'alerts' && (
        <div className="space-y-6 animate-in slide-in-from-bottom-4">
          <div className="flex justify-between items-center mb-4 px-2">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Active Assurance Monitors</h3>
            <button 
              onClick={() => setIsAlertModalOpen(true)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-black text-white text-[10px] font-black uppercase tracking-widest shadow-xl shadow-gray-200/50"
            >
              <Plus className="w-4 h-4" /> Initialize Monitor
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {alerts.map(alert => (
              <div key={alert.id} className="p-8 rounded-[40px] border border-gray-100 bg-white shadow-xl shadow-gray-200/20 hover:border-gray-200 transition-all">
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${alert.type === 'METRIC' ? 'bg-green-50 text-green-500' : 'bg-blue-50 text-blue-500'}`}>
                    {alert.type === 'METRIC' ? <Hash className="w-6 h-6" /> : <Terminal className="w-6 h-6" />}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(74,222,128,1)]"></div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{alert.status}</span>
                  </div>
                </div>
                <h4 className="text-xl font-black text-gray-900 mb-2">{alert.name}</h4>
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-[10px] font-mono bg-gray-50 px-2 py-1 rounded-lg text-gray-500">
                    {alert.target} {alert.operator} {alert.threshold}
                  </span>
                </div>
                <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex gap-2">
                    {alert.channels.map(c => (
                      <div key={c} className="w-6 h-6 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                        <Share2 className="w-3.5 h-3.5" />
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Last Trigger: {alert.lastTriggered || 'Never'}</p>
                </div>
              </div>
            ))}
            {alerts.length === 0 && (
              <div className="col-span-full py-24 text-center border-2 border-dashed border-gray-100 rounded-[40px] bg-gray-50/30">
                <Bell className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                <h4 className="text-gray-900 font-black">No Active Monitors</h4>
                <p className="text-gray-400 text-sm mt-2">Define threshold-based alerts to proactively secure your inference chain.</p>
              </div>
            )}
          </div>
        </div>
      )}

      <AlertsConfigModal 
        isOpen={isAlertModalOpen} 
        onClose={() => setIsAlertModalOpen(false)} 
        onSave={addAlert}
      />
    </div>
  );
};

export default Observability;

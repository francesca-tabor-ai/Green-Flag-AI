
import React, { useState } from 'react';
import { X, Bell, Zap, Terminal, Hash, ChevronRight, Slack, Mail, Phone, CheckCircle2 } from 'lucide-react';

interface AlertsConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (alert: any) => void;
}

const AlertsConfigModal: React.FC<AlertsConfigModalProps> = ({ isOpen, onClose, onSave }) => {
  const [step, setStep] = useState(1);
  const [type, setType] = useState<'METRIC' | 'LOG_PATTERN'>('METRIC');
  const [config, setConfig] = useState({
    name: '',
    target: '',
    threshold: 500,
    operator: '>',
    channels: [] as string[]
  });

  if (!isOpen) return null;

  const toggleChannel = (c: string) => {
    setConfig(prev => ({
      ...prev,
      channels: prev.channels.includes(c) 
        ? prev.channels.filter(x => x !== c) 
        : [...prev.channels, c]
    }));
  };

  const handleComplete = () => {
    onSave({ ...config, id: Date.now().toString(), type, status: 'ACTIVE' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-xl rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95">
        <div className="p-8 border-b border-gray-50 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Configuration Suite</span>
            <h2 className="text-2xl font-black text-gray-900 mt-1 tracking-tight">Create Assurance Monitor</h2>
          </div>
          <button onClick={onClose} className="p-3 rounded-full hover:bg-gray-50 transition-colors">
            <X className="w-6 h-6 text-gray-300" />
          </button>
        </div>

        <div className="p-10 min-h-[400px]">
          {step === 1 && (
            <div className="space-y-8 animate-in slide-in-from-right-4">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Monitor Type</label>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setType('METRIC')}
                    className={`p-6 rounded-3xl border text-left transition-all ${type === 'METRIC' ? 'border-green-500 bg-green-50/50 ring-1 ring-green-100' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                  >
                    <Hash className={`w-6 h-6 mb-3 ${type === 'METRIC' ? 'text-green-500' : 'text-gray-400'}`} />
                    <p className="font-bold text-gray-900">Metric Threshold</p>
                    <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">Alert based on numerical system telemetry (latency, CPU, Drift Index).</p>
                  </button>
                  <button 
                    onClick={() => setType('LOG_PATTERN')}
                    className={`p-6 rounded-3xl border text-left transition-all ${type === 'LOG_PATTERN' ? 'border-blue-500 bg-blue-50/50 ring-1 ring-blue-100' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                  >
                    <Terminal className={`w-6 h-6 mb-3 ${type === 'LOG_PATTERN' ? 'text-blue-500' : 'text-gray-400'}`} />
                    <p className="font-bold text-gray-900">Log Pattern</p>
                    <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">Alert when specific string patterns or errors appear in telemetry logs.</p>
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">General Identity</label>
                <input 
                  type="text" 
                  placeholder="e.g. High Latency Spike - Prod Cluster"
                  value={config.name}
                  onChange={e => setConfig({...config, name: e.target.value})}
                  className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-100 outline-none text-sm font-medium"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in slide-in-from-right-4">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Trigger Conditions</label>
                {type === 'METRIC' ? (
                  <div className="space-y-4">
                    <select 
                      className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 outline-none text-sm font-bold"
                      onChange={e => setConfig({...config, target: e.target.value})}
                    >
                      <option value="latency">P99 Inference Latency</option>
                      <option value="drift">Statistical Drift Index</option>
                      <option value="throughput">Requests Per Second</option>
                    </select>
                    <div className="flex gap-4">
                      <select className="w-24 px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 outline-none text-sm font-black">
                        <option>{'>'}</option>
                        <option>{'<'}</option>
                        <option>{'=='}</option>
                      </select>
                      <input 
                        type="number" 
                        value={config.threshold}
                        onChange={e => setConfig({...config, threshold: Number(e.target.value)})}
                        className="flex-1 px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 outline-none text-sm font-bold"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 flex gap-3 text-blue-700">
                      <Zap className="w-4 h-4 shrink-0 mt-0.5" />
                      <p className="text-[10px] font-bold leading-relaxed">Uses Regex matching. Example: /ERROR|TIMEOUT|FAIL/</p>
                    </div>
                    <input 
                      type="text" 
                      placeholder="Regex Pattern..."
                      value={config.target}
                      onChange={e => setConfig({...config, target: e.target.value})}
                      className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white outline-none text-sm font-mono"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Notification Sinks</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'slack', label: 'Slack', icon: Slack },
                    { id: 'email', label: 'Email', icon: Mail },
                    { id: 'sms', label: 'PagerDuty', icon: Phone },
                  ].map(c => (
                    <button 
                      key={c.id}
                      onClick={() => toggleChannel(c.id)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${config.channels.includes(c.id) ? 'border-black bg-black text-white' : 'border-gray-100 bg-white text-gray-400 hover:border-gray-200'}`}
                    >
                      <c.icon className="w-5 h-5" />
                      <span className="text-[10px] font-black uppercase tracking-widest">{c.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-8 border-t border-gray-50 bg-gray-50/30 flex items-center justify-between">
          <button 
            onClick={() => step === 1 ? onClose() : setStep(1)}
            className="px-6 py-3 rounded-xl text-sm font-black text-gray-400 uppercase tracking-widest hover:text-black transition-colors"
          >
            {step === 1 ? 'Cancel' : 'Back'}
          </button>
          <button 
            onClick={() => step === 1 ? setStep(2) : handleComplete()}
            className="flex items-center gap-2 px-8 py-3.5 rounded-2xl signature-gradient text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-green-200/50 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {step === 1 ? 'Configure Thresholds' : 'Initialize Monitor'}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertsConfigModal;

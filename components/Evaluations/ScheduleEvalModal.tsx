
import React, { useState } from 'react';
import { X, Calendar, Clock, RefreshCw, ChevronRight, CheckCircle2, Server, Shield } from 'lucide-react';

interface ScheduleEvalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSchedule: (config: any) => void;
}

const ScheduleEvalModal: React.FC<ScheduleEvalModalProps> = ({ isOpen, onClose, onSchedule }) => {
  const [frequency, setFrequency] = useState<'ADHOC' | 'DAILY' | 'WEEKLY'>('ADHOC');
  const [suites, setSuites] = useState<string[]>(['Hallucination']);
  const [config, setConfig] = useState({
    name: 'Scheduled Baseline Evaluation',
    model: 'Customer-Service-Llama',
    version: 'v2.4.0'
  });

  if (!isOpen) return null;

  const toggleSuite = (suite: string) => {
    setSuites(prev => prev.includes(suite) ? prev.filter(s => s !== suite) : [...prev, suite]);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-xl rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95">
        <div className="p-8 border-b border-gray-50 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-gradient">Provisioning Orchestrator</span>
            <h2 className="text-2xl font-black text-gray-900 mt-1 tracking-tight">Schedule New Evaluation</h2>
          </div>
          <button onClick={onClose} className="p-3 rounded-full hover:bg-gray-50 transition-colors">
            <X className="w-6 h-6 text-gray-300" />
          </button>
        </div>

        <div className="p-10 space-y-8 max-h-[70vh] overflow-y-auto">
          <div className="space-y-4">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Evaluation Scope</label>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col gap-1">
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Selected Model</span>
                <span className="text-sm font-bold text-gray-900">{config.model}</span>
              </div>
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col gap-1">
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Target Version</span>
                <span className="text-sm font-bold text-gray-900">{config.version}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Frequency Configuration</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'ADHOC', label: 'Manual Run', icon: RefreshCw },
                { id: 'DAILY', label: 'Daily Sweep', icon: Clock },
                { id: 'WEEKLY', label: 'Weekly Audit', icon: Calendar },
              ].map(f => (
                <button 
                  key={f.id}
                  onClick={() => setFrequency(f.id as any)}
                  className={`flex flex-col items-center gap-3 p-6 rounded-3xl border transition-all ${frequency === f.id ? 'bg-black text-white border-black shadow-xl shadow-gray-300/50' : 'bg-white text-gray-400 border-gray-100 hover:border-gray-200'}`}
                >
                  <f.icon className="w-5 h-5" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-center">{f.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Verification Suites</label>
            <div className="grid grid-cols-1 gap-2">
              {[
                { id: 'Hallucination', desc: 'Verify factual alignment and grounding' },
                { id: 'Safety', desc: 'Test adversarial jailbreaks and PII leakage' },
                { id: 'Regression', desc: 'Analyze performance delta vs baseline' },
                { id: 'Alignment', desc: 'Assess persona and instruction adherence' },
              ].map(suite => (
                <button 
                  key={suite.id}
                  onClick={() => toggleSuite(suite.id)}
                  className={`flex items-center gap-4 p-4 rounded-2xl border transition-all text-left group ${suites.includes(suite.id) ? 'border-green-500 bg-green-50/30' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                >
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${suites.includes(suite.id) ? 'bg-green-500 border-green-500 text-white' : 'border-gray-200 bg-white'}`}>
                    {suites.includes(suite.id) && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">{suite.id}</p>
                    <p className="text-[9px] text-gray-500 font-medium">{suite.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-8 border-t border-gray-50 bg-gray-50/30 flex items-center justify-between">
          <button 
            onClick={onClose}
            className="px-6 py-3 rounded-xl text-sm font-black text-gray-400 uppercase tracking-widest hover:text-black transition-colors"
          >
            Discard
          </button>
          <button 
            onClick={() => { onSchedule({ ...config, suites, frequency }); onClose(); }}
            className="flex items-center gap-2 px-8 py-3.5 rounded-2xl signature-gradient text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-green-200/50 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Register Schedule
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleEvalModal;

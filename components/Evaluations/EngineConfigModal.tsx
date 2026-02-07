
import React, { useState } from 'react';
import { X, Settings2, Shield, Zap, Target, Sliders, Check, Info } from 'lucide-react';

interface EngineConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EngineConfigModal: React.FC<EngineConfigModalProps> = ({ isOpen, onClose }) => {
  const [rigor, setRigor] = useState<'STRICT' | 'BALANCED' | 'RELAXED'>('STRICT');
  const [weights, setWeights] = useState({
    hallucination: 80,
    safety: 100,
    compliance: 90,
    performance: 60
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95">
        <div className="p-8 border-b border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gray-900 flex items-center justify-center text-blue-400">
              <Settings2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Core Architecture</span>
              <h2 className="text-2xl font-black text-gray-900 mt-1 tracking-tight">Assurance Engine v3</h2>
            </div>
          </div>
          <button onClick={onClose} className="p-3 rounded-full hover:bg-gray-50 transition-colors">
            <X className="w-6 h-6 text-gray-300" />
          </button>
        </div>

        <div className="p-10 space-y-10 max-h-[70vh] overflow-y-auto">
          {/* Rigor Presets */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
              <Target className="w-3.5 h-3.5" /> Heuristic Rigor Presets
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { id: 'STRICT', label: 'High Stakes', desc: 'Maximum sensitivity. Zero-tolerance for drift.', icon: Shield },
                { id: 'BALANCED', label: 'Standard', desc: 'Optimal for general production use.', icon: Zap },
                { id: 'RELAXED', label: 'Exploratory', desc: 'Focus on performance over compliance.', icon: Sliders },
              ].map(preset => (
                <button 
                  key={preset.id}
                  onClick={() => setRigor(preset.id as any)}
                  className={`p-6 rounded-[32px] border text-left transition-all relative ${
                    rigor === preset.id ? 'border-blue-500 bg-blue-50/30' : 'border-gray-100 bg-white hover:border-gray-200'
                  }`}
                >
                  <preset.icon className={`w-5 h-5 mb-3 ${rigor === preset.id ? 'text-blue-500' : 'text-gray-400'}`} />
                  <p className="text-xs font-black text-gray-900 uppercase tracking-tight">{preset.label}</p>
                  <p className="text-[10px] text-gray-400 font-medium mt-1 leading-relaxed">{preset.desc}</p>
                  {rigor === preset.id && (
                    <div className="absolute top-4 right-4 bg-blue-500 rounded-full p-1 text-white">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* Dimension Weights */}
          <section className="space-y-6">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5" /> Dimensional Influence Tuning
            </h3>
            <div className="space-y-6">
              {Object.entries(weights).map(([key, val]) => (
                <div key={key} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{key}</p>
                    <span className="text-xs font-black text-gray-900">{val}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={val} 
                    onChange={(e) => setWeights({...weights, [key]: parseInt(e.target.value)})}
                    className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-blue-500" 
                  />
                </div>
              ))}
            </div>
          </section>

          <div className="p-6 rounded-[32px] bg-gray-50 border border-gray-100 flex gap-4">
            <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <p className="text-[10px] text-gray-500 font-medium leading-relaxed">
              Adjusting these weights will retroactively affect the <span className="text-gray-900 font-black">Composite Risk Index (CRI)</span> calculation for all active assets in the registry. Changes are propagated via mTLS to all cluster nodes.
            </p>
          </div>
        </div>

        <div className="p-8 border-t border-gray-50 bg-gray-50/30 flex items-center justify-between">
          <button onClick={onClose} className="px-6 py-3 rounded-xl text-sm font-black text-gray-400 uppercase tracking-widest hover:text-black">Discard</button>
          <button 
            onClick={onClose}
            className="px-10 py-4 rounded-2xl bg-black text-white text-[10px] font-black uppercase tracking-widest shadow-xl shadow-gray-200/50 hover:bg-gray-800 transition-all"
          >
            Apply Engine Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EngineConfigModal;

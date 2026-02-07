
import React from 'react';
import { X, ArrowLeftRight, Check, AlertCircle, Info } from 'lucide-react';

interface ComparisonOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  itemA: { version: string; text?: string; metadata?: Record<string, string>; date: string };
  itemB: { version: string; text?: string; metadata?: Record<string, string>; date: string };
}

const ComparisonOverlay: React.FC<ComparisonOverlayProps> = ({ isOpen, onClose, title, itemA, itemB }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-8 bg-gray-900/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="w-full max-w-7xl h-full flex flex-col">
        <div className="flex items-center justify-between py-8">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10 shadow-inner shadow-white/5">
              <ArrowLeftRight className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-black text-white tracking-tight">{title}</h2>
              <p className="text-gray-400 text-sm mt-1 uppercase tracking-[0.2em] font-bold">Delta Verification: Baseline {itemA.version} vs Iterate {itemB.version}</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors group"
          >
            <X className="w-7 h-7 text-white group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-10 min-h-0 py-4">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between px-2">
              <span className="px-5 py-2 rounded-xl bg-white/5 text-white text-[10px] font-black uppercase tracking-[0.3em] border border-white/10 shadow-lg">Baseline: {itemA.version}</span>
              <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{itemA.date}</span>
            </div>
            <div className="flex-1 bg-white rounded-[48px] p-10 overflow-y-auto shadow-2xl relative border border-gray-100">
              {itemA.text ? (
                <div className="font-mono text-xs text-gray-800 leading-[2] whitespace-pre-wrap">
                  {itemA.text}
                </div>
              ) : itemA.metadata ? (
                <div className="space-y-6">
                  <div className="pb-4 border-b border-gray-100">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Inference Parameters</h4>
                  </div>
                  {Object.entries(itemA.metadata).map(([key, val]) => (
                    <div key={key} className="flex justify-between items-center py-4 border-b border-gray-50 last:border-0">
                      <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{key}</span>
                      <span className="text-gray-900 font-black font-mono text-sm">{val}</span>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between px-2">
              <span className="px-5 py-2 rounded-xl signature-gradient text-white text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-blue-500/20">Iterate: {itemB.version}</span>
              <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{itemB.date}</span>
            </div>
            <div className="flex-1 bg-white rounded-[48px] p-10 overflow-y-auto shadow-2xl relative border-2 border-green-400/10">
              {itemB.text ? (
                <div className="font-mono text-xs text-gray-800 leading-[2] whitespace-pre-wrap">
                  {itemB.text.split(' ').map((word, i) => {
                    const isDiff = !itemA.text?.includes(word);
                    return (
                      <span key={i} className={isDiff ? 'bg-green-100 text-green-900 rounded-md px-1 py-0.5 border border-green-200' : ''}>
                        {word}{' '}
                      </span>
                    );
                  })}
                </div>
              ) : itemB.metadata ? (
                <div className="space-y-6">
                  <div className="pb-4 border-b border-gray-100">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Structural Delta Registry</h4>
                  </div>
                  {Object.entries(itemB.metadata).map(([key, val]) => {
                    const isDiff = itemA.metadata?.[key] !== val;
                    return (
                      <div key={key} className={`flex justify-between items-center py-4 border-b border-gray-50 last:border-0 transition-all ${isDiff ? 'bg-green-50/50 -mx-6 px-6 rounded-xl border-x-2 border-x-green-400/20' : ''}`}>
                        <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{key}</span>
                        <div className="flex flex-col items-end">
                          <span className={`font-black font-mono text-sm ${isDiff ? 'text-green-700' : 'text-gray-900'}`}>{val}</span>
                          {isDiff && <span className="text-[9px] text-gray-300 font-mono line-through mt-1 italic">{itemA.metadata?.[key]}</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="py-10 flex justify-center gap-12 border-t border-white/5 mt-4">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-md bg-green-100 border border-green-200"></div>
            <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Assurance Additions / Deltas</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-md border border-gray-700 bg-transparent"></div>
            <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Inference Invariants</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5">
            <Info className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-[10px] text-gray-400 font-bold italic leading-none">Automated diff analysis conducted via Green Flag Assurance Engine.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonOverlay;


import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, History, Send, MessageSquare, Globe, Shield, User, Info, Edit3, ChevronRight, Activity, ArrowLeftRight, Plus, Check } from 'lucide-react';
import { MOCK_MODELS } from './ModelRegistry';
import { ReadinessStatus } from '../types';
import RegistrationModal from '../components/RegistrationModal';
import ComparisonOverlay from '../components/ComparisonOverlay';

const ModelDetail: React.FC = () => {
  const { modelId } = useParams();
  const model = MOCK_MODELS.find(m => m.id === modelId);
  const [activeTab, setActiveTab] = useState<'history' | 'prompts' | 'deployments'>('history');
  
  const [selectedVersions, setSelectedVersions] = useState<string[]>([]);
  const [selectedPrompts, setSelectedPrompts] = useState<string[]>([]);
  
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [compareData, setCompareData] = useState<any>(null);

  if (!model) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <DatabaseIcon className="w-16 h-16 text-gray-100" />
        <h2 className="text-3xl font-black text-gray-900">Asset Record Not Found</h2>
        <p className="text-gray-500 max-w-md text-center">The requested model identifier does not correlate with any verified records in the System Registry.</p>
        <Link to="/registry" className="px-6 py-3 rounded-2xl bg-black text-white font-bold text-sm">Return to System Registry</Link>
      </div>
    );
  }

  const versions = [
    { 
      version: 'v2.4.0', 
      date: '2024-05-15', 
      author: 'Sarah Chen', 
      status: ReadinessStatus.READY, 
      note: 'Applied structural reinforcement for financial sector edge cases and token variance.', 
      metadata: { 
        "Base Architecture": "Llama-3-70b-Instruct", 
        "Quantization": "INT8 (Weight-Only)", 
        "Context Window": "128k Tokens",
        "Assurance Profile": "Financial Standard v4"
      } 
    },
    { 
      version: 'v2.3.1', 
      date: '2024-04-22', 
      author: 'Sarah Chen', 
      status: ReadinessStatus.READY, 
      note: 'Latency optimization for distributed inference clusters.', 
      metadata: { 
        "Base Architecture": "Llama-3-70b", 
        "Quantization": "FP16", 
        "Context Window": "32k Tokens",
        "Assurance Profile": "Standard Beta"
      } 
    },
    { 
      version: 'v2.3.0', 
      date: '2024-04-01', 
      author: 'James Wilson', 
      status: ReadinessStatus.READY, 
      note: 'Baseline foundation alignment and dataset provenance verification.', 
      metadata: { 
        "Base Architecture": "Llama-2-70b", 
        "Quantization": "FP16", 
        "Context Window": "4k Tokens",
        "Assurance Profile": "Legacy Support"
      } 
    },
  ];

  const prompts = [
    { version: 'P-12', text: 'STRICT INSTRUCTION: You are a technical financial support oracle. Maintain a formal, factual, and strictly objective tone. Do not provide speculative analysis. Cross-reference all inputs against verified internal ledger APIs.', date: '2024-05-15', author: 'Sarah Chen' },
    { version: 'P-11', text: 'You are a customer representative bot. Help users with general banking questions and account information queries. Be polite.', date: '2024-04-20', author: 'James Wilson' },
  ];

  const deployments = [
    { env: 'Production', status: 'Operational', date: '2024-05-16 09:12', version: 'v2.4.0' },
    { env: 'Staging', status: 'Operational', date: '2024-05-15 14:00', version: 'v2.4.0' },
    { env: 'Development', status: 'Operational', date: '2024-05-15 10:30', version: 'v2.4.0' },
  ];

  const handleToggleSelection = (list: string[], setList: (v: string[]) => void, id: string) => {
    if (list.includes(id)) {
      setList(list.filter(x => x !== id));
    } else if (list.length < 2) {
      setList([...list, id]);
    }
  };

  const startCompare = (type: 'version' | 'prompt') => {
    if (type === 'version') {
      const vA = versions.find(v => v.version === selectedVersions[0]);
      const vB = versions.find(v => v.version === selectedVersions[1]);
      if (vA && vB) {
        setCompareData({ title: 'Architectural Delta Analysis', itemA: vA, itemB: vB });
        setIsCompareOpen(true);
      }
    } else {
      const pA = prompts.find(p => p.version === selectedPrompts[0]);
      const pB = prompts.find(p => p.version === selectedPrompts[1]);
      if (pA && pB) {
        setCompareData({ title: 'Prompt Instruction Differentiation', itemA: pA, itemB: pB });
        setIsCompareOpen(true);
      }
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <Link to="/registry" className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 transition-all group">
            <ArrowLeft className="w-5 h-5 text-gray-500 group-hover:-translate-x-1 transition-transform" />
          </Link>
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">{model.name}</h2>
            <div className="flex items-center gap-3 mt-1 font-mono">
              <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-widest">{model.category}</span>
              <span className="text-gray-200">/</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">{model.currentVersion}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsRegisterModalOpen(true)}
            className="flex items-center gap-2 px-8 py-3.5 rounded-2xl signature-gradient text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-green-200/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Plus className="w-4 h-4" />
            Provision Iteration
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <div className="p-8 rounded-[40px] border border-gray-100 bg-white shadow-xl shadow-gray-200/20">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Structural Metadata</h3>
              <Edit3 className="w-4 h-4 text-gray-300 cursor-pointer hover:text-gray-900 transition-colors" />
            </div>
            <div className="space-y-5">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500 font-medium">Last Assurance Cycle</span>
                <span className="font-black text-gray-900 font-mono">{model.lastAssessed}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500 font-medium">Operational Status</span>
                <span className={`font-black uppercase tracking-widest ${model.status === ReadinessStatus.READY ? 'text-green-500' : 'text-red-500'}`}>{model.status}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500 font-medium">Foundation Model</span>
                <span className="font-black text-gray-900">Llama-3-70b-Base</span>
              </div>
              <div className="pt-6 border-t border-gray-50">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Functional Invariant</p>
                <p className="text-xs leading-relaxed text-gray-500 font-medium italic">"{model.description}"</p>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-[40px] border border-gray-100 bg-white shadow-xl shadow-gray-200/20">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Technical Stewardship</h3>
            <div className="flex items-center gap-4">
              <img src={model.owner.avatar} alt="" className="w-14 h-14 rounded-2xl border border-gray-100 shadow-sm" />
              <div>
                <p className="font-black text-gray-900 text-base">{model.owner.name}</p>
                <p className="text-xs text-gray-400 font-medium">{model.owner.email}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="flex gap-2 p-1.5 bg-gray-50 rounded-2xl w-fit">
            {(['history', 'prompts', 'deployments'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
                  activeTab === tab ? 'bg-white text-black shadow-sm' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab === 'history' ? 'Audit History' : tab === 'prompts' ? 'Instructions' : 'Infrastructure'}
              </button>
            ))}
          </div>

          <div className="min-h-[400px]">
            {activeTab === 'history' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-2 px-2">
                  <div className="flex items-center gap-2">
                    <Info className="w-3.5 h-3.5 text-blue-400" />
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Select iterative pairs for structural delta analysis.</p>
                  </div>
                  {selectedVersions.length === 2 && (
                    <button 
                      onClick={() => startCompare('version')}
                      className="flex items-center gap-2 px-5 py-2 rounded-full bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gray-800 transition-all animate-in zoom-in-95"
                    >
                      <ArrowLeftRight className="w-3 h-3" /> Analyze Coefficients
                    </button>
                  )}
                </div>
                <div className="space-y-4">
                  {versions.map((v, i) => (
                    <div 
                      key={i} 
                      onClick={() => handleToggleSelection(selectedVersions, setSelectedVersions, v.version)}
                      className={`flex gap-6 p-6 rounded-[32px] border transition-all cursor-pointer ${
                        selectedVersions.includes(v.version) 
                          ? 'bg-green-50/50 border-green-200 ring-1 ring-green-100 shadow-lg shadow-green-100/20' 
                          : 'bg-white border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border-2 transition-all ${
                          selectedVersions.includes(v.version) 
                            ? 'border-green-500 bg-green-500 text-white' 
                            : 'border-gray-50 bg-gray-50 text-gray-300'
                        }`}>
                          {selectedVersions.includes(v.version) ? <Check className="w-5 h-5" /> : <div className="w-3 h-3 rounded bg-transparent" />}
                        </div>
                        {i !== versions.length - 1 && <div className="w-0.5 h-full bg-gray-50 my-2"></div>}
                      </div>
                      <div className="flex-1 pb-2">
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-black text-gray-900 font-mono">{v.version}</span>
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{v.date}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-2 font-medium leading-relaxed">{v.note}</p>
                        <div className="flex items-center gap-2 mt-4">
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${v.author}`} className="w-6 h-6 rounded-lg" alt="" />
                          <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Assurance by {v.author}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'prompts' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-2 px-2">
                   <div className="flex items-center gap-2">
                    <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Instructional Repository</h4>
                  </div>
                  {selectedPrompts.length === 2 && (
                    <button 
                      onClick={() => startCompare('prompt')}
                      className="flex items-center gap-2 px-5 py-2 rounded-full bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gray-800 transition-all animate-in zoom-in-95"
                    >
                      <ArrowLeftRight className="w-3 h-3" /> Execute Diff
                    </button>
                  )}
                </div>
                {prompts.map((p, i) => (
                  <div 
                    key={i} 
                    onClick={() => handleToggleSelection(selectedPrompts, setSelectedPrompts, p.version)}
                    className={`p-6 rounded-[32px] border transition-all cursor-pointer group ${
                      selectedPrompts.includes(p.version) 
                        ? 'bg-white border-green-300 shadow-xl shadow-green-100/30' 
                        : 'border-gray-100 bg-gray-50/50 hover:bg-white hover:border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${selectedPrompts.includes(p.version) ? 'bg-green-500 border-green-500 text-white' : 'border-gray-200 bg-white'}`}>
                          {selectedPrompts.includes(p.version) && <Check className="w-4 h-4" />}
                        </div>
                        <span className="text-[10px] font-black text-gray-900 bg-white border border-gray-100 px-3 py-1.5 rounded-xl uppercase tracking-[0.1em]">Record {p.version}</span>
                      </div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{p.date} • Lead: {p.author}</span>
                    </div>
                    <div className="text-xs text-gray-600 font-mono bg-white p-5 rounded-3xl border border-gray-50 border-dashed leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all">
                      {p.text}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'deployments' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {['Development', 'Staging', 'Production'].map(env => {
                    const activeDep = deployments.find(d => d.env === env);
                    return (
                      <div key={env} className="p-6 rounded-[32px] border border-gray-100 bg-white shadow-xl shadow-gray-200/10 text-center flex flex-col items-center">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-2">{env}</p>
                        <p className="text-lg font-black text-gray-900 font-mono">{activeDep?.version || 'NULL'}</p>
                        <div className="flex items-center justify-center gap-2 mt-4 px-4 py-1.5 rounded-full bg-gray-50">
                          <div className={`w-2 h-2 rounded-full ${activeDep?.status === 'Operational' ? 'bg-green-500 shadow-[0_0_8px_rgba(74,222,128,0.8)]' : 'bg-gray-300 animate-pulse'}`}></div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                            {activeDep?.status || 'Non-Active'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-2 mb-4">Inference Topology State</h4>
                <div className="bg-white rounded-[40px] border border-gray-50 overflow-hidden shadow-2xl shadow-gray-200/10">
                  {deployments.map((d, i) => (
                    <div key={i} className="flex items-center justify-between px-8 py-6 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                      <div className="flex items-center gap-5">
                        <div className="p-3 rounded-2xl bg-gray-50">
                          <Activity className="w-5 h-5 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-gray-900 tracking-tight">{d.env} Cluster Vector</p>
                          <p className="text-[10px] text-gray-400 font-mono mt-1 uppercase tracking-widest">{d.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-black text-gray-900 font-mono">{d.version}</p>
                        <p className={`text-[10px] font-black uppercase tracking-[0.1em] mt-1 ${d.status === 'Operational' ? 'text-green-500' : 'text-blue-400'}`}>{d.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <RegistrationModal 
        isOpen={isRegisterModalOpen} 
        onClose={() => setIsRegisterModalOpen(false)} 
        type="version"
        modelName={model.name}
      />

      {isCompareOpen && compareData && (
        <ComparisonOverlay
          isOpen={isCompareOpen}
          onClose={() => setIsCompareOpen(false)}
          title={compareData.title}
          itemA={compareData.itemA}
          itemB={compareData.itemB}
        />
      )}
    </div>
  );
};

const DatabaseIcon = (props: any) => (
  <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/></svg>
);

export default ModelDetail;

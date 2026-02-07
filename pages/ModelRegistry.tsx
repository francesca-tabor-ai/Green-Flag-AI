
import React, { useState, useMemo } from 'react';
import { Search, Filter, Plus, ChevronRight, User, MoreHorizontal, Database, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AIModel, ReadinessStatus } from '../types';
import RegistrationModal from '../components/RegistrationModal';

export const MOCK_MODELS: AIModel[] = [
  {
    id: 'm1',
    name: 'Customer-Service-Llama',
    currentVersion: 'v2.4.0',
    riskScore: 12,
    status: ReadinessStatus.READY,
    category: 'NLP/Transformer',
    lastAssessed: '2024-05-15',
    description: 'Autonomous dialogue agent utilizing RAG (Retrieval-Augmented Generation) architecture for Tier 1 customer fulfillment.',
    owner: { name: 'Sarah Chen', email: 'sarah@greenflag.ai', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
    versions: [],
    prompts: [],
    deployments: []
  },
  {
    id: 'm2',
    name: 'Fraud-Detection-Core',
    currentVersion: 'v1.1.2',
    riskScore: 45,
    status: ReadinessStatus.IN_PROGRESS,
    category: 'Stochastic Modeling',
    lastAssessed: '2024-05-10',
    description: 'Transaction-level anomaly detection system based on ensemble classification and feature variance analysis.',
    owner: { name: 'James Wilson', email: 'james@greenflag.ai', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James' },
    versions: [],
    prompts: [],
    deployments: []
  },
  {
    id: 'm3',
    name: 'HR-Screener-v2',
    currentVersion: 'v2.0.1',
    riskScore: 82,
    status: ReadinessStatus.BLOCKED,
    category: 'Ranking/Scoring',
    lastAssessed: '2024-05-12',
    description: 'Candidate prioritization engine; currently restricted due to bias variance thresholds exceeding regulatory limits.',
    owner: { name: 'Elena Rodriguez', email: 'elena@greenflag.ai', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena' },
    versions: [],
    prompts: [],
    deployments: []
  }
];

const ModelRegistry: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const filteredModels = useMemo(() => {
    return MOCK_MODELS.filter(m => {
      const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            m.owner.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || m.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, filterStatus]);

  const getStatusBadge = (status: ReadinessStatus) => {
    switch (status) {
      case ReadinessStatus.READY: return 'bg-green-50 text-green-600 border-green-100';
      case ReadinessStatus.IN_PROGRESS: return 'bg-yellow-50 text-yellow-600 border-yellow-100';
      case ReadinessStatus.BLOCKED: return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Asset ID, Taxonomy, or Technical Lead..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-100 transition-all outline-none text-sm font-medium"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 rounded-2xl border border-gray-100 bg-white text-xs font-bold uppercase tracking-wider focus:ring-2 focus:ring-green-100 outline-none cursor-pointer"
          >
            <option value="all">Certification Status: All</option>
            <option value={ReadinessStatus.READY}>Certified Assets</option>
            <option value={ReadinessStatus.IN_PROGRESS}>Assets in Audit</option>
            <option value={ReadinessStatus.BLOCKED}>Restricted Assets</option>
          </select>
          <button 
            onClick={() => setIsRegisterModalOpen(true)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-2xl signature-gradient text-white font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-all shadow-sm active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            Provision Asset
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 overflow-hidden shadow-2xl shadow-gray-200/20">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-50 bg-gray-50/30">
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Asset Configuration</th>
              <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Inference Status</th>
              <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Risk Coefficient</th>
              <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Technical Lead</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Verification</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredModels.map((model) => (
              <tr key={model.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-8 py-6">
                  <Link to={`/registry/${model.id}`} className="block group-hover:translate-x-1 transition-transform">
                    <div className="font-bold text-gray-900 text-base leading-tight">{model.name}</div>
                    <div className="text-xs text-gray-400 mt-1 font-mono">{model.currentVersion} • <span className="text-blue-500 font-bold">{model.category}</span></div>
                  </Link>
                </td>
                <td className="px-6 py-6">
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${getStatusBadge(model.status)}`}>
                    {model.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-6">
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${model.riskScore < 30 ? 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]' : model.riskScore < 70 ? 'bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.5)]' : 'bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.5)]'}`} 
                        style={{ width: `${model.riskScore}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-black text-gray-600 font-mono">{model.riskScore.toFixed(1)}</span>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <div className="flex items-center gap-3">
                    <img src={model.owner.avatar} alt={model.owner.name} className="w-9 h-9 rounded-xl border border-gray-100 shadow-sm" />
                    <div className="hidden lg:block">
                      <div className="text-sm font-bold text-gray-900 leading-none">{model.owner.name}</div>
                      <div className="text-[10px] text-gray-400 mt-1 font-medium">{model.owner.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <Link 
                    to={`/registry/${model.id}`}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-2xl text-gray-400 hover:text-black hover:bg-white border border-transparent hover:border-gray-200 hover:shadow-sm transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredModels.length === 0 && (
          <div className="py-24 text-center">
            <Database className="w-16 h-16 text-gray-100 mx-auto mb-4" />
            <h4 className="text-gray-900 font-black text-xl">Registry Query Empty</h4>
            <p className="text-gray-400 text-sm mt-2 max-w-sm mx-auto">No assets matched your technical criteria. Adjust inference filters or search parameters.</p>
          </div>
        )}
      </div>

      <RegistrationModal 
        isOpen={isRegisterModalOpen} 
        onClose={() => setIsRegisterModalOpen(false)} 
        type="model"
      />
    </div>
  );
};

export default ModelRegistry;

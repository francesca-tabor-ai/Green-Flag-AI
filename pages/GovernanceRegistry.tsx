
import React, { useState } from 'react';
import { 
  FileText, 
  ShieldCheck, 
  Scale, 
  BookOpen, 
  Download, 
  Plus, 
  Search, 
  Filter, 
  ChevronRight, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  FileCode, 
  Gavel,
  ExternalLink,
  History,
  X,
  Upload,
  Link as LinkIcon,
  Copy,
  Eye
} from 'lucide-react';

interface PolicyFramework {
  id: string;
  name: string;
  version: string;
  status: 'Aligned' | 'Gap identified' | 'Under review';
  progress: number;
  lastAudited: string;
  authority: string;
}

interface GovernanceArtifact {
  id: string;
  name: string;
  type: 'DPIA' | 'AIA' | 'Transparency Report' | 'Technical Doc';
  format: 'PDF' | 'JSON' | 'DOCX';
  date: string;
  status: 'Certified' | 'Draft' | 'Archived';
  owner: string;
  description?: string;
}

const MOCK_FRAMEWORKS: PolicyFramework[] = [
  {
    id: 'f1',
    name: 'EU AI Act',
    version: '2024 Final Draft',
    status: 'Gap identified',
    progress: 74,
    lastAudited: '2024-05-10',
    authority: 'European Commission'
  },
  {
    id: 'f2',
    name: 'NIST AI RMF',
    version: 'v1.0',
    status: 'Aligned',
    progress: 100,
    lastAudited: '2024-05-15',
    authority: 'NIST'
  },
  {
    id: 'f3',
    name: 'ISO/IEC 42001',
    version: '2023',
    status: 'Under review',
    progress: 42,
    lastAudited: '2024-04-28',
    authority: 'ISO'
  }
];

const MOCK_ARTIFACTS: GovernanceArtifact[] = [
  { id: 'a1', name: 'Customer-Service-Llama DPIA', type: 'DPIA', format: 'PDF', date: '2024-05-12', status: 'Certified', owner: 'Sarah Chen', description: 'Data Protection Impact Assessment for the customer support RAG pipeline.' },
  { id: 'a2', name: 'Fraud-Detection Algorithmic Audit', type: 'AIA', format: 'PDF', date: '2024-05-08', status: 'Certified', owner: 'James Wilson', description: 'Internal audit of the stochastic modeling core for bias and drift.' },
  { id: 'a3', name: 'Technical Spec v2.4.0', type: 'Technical Doc', format: 'JSON', date: '2024-05-15', status: 'Draft', owner: 'Sarah Chen', description: 'Full architectural specification including vector ingestion paths.' },
  { id: 'a4', name: 'Transparency Declaration Art. 13', type: 'Transparency Report', format: 'DOCX', date: '2024-04-30', status: 'Certified', owner: 'Legal Team', description: 'Mandatory transparency requirements as per EU AI Act Article 13.' }
];

const GovernanceRegistry: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedFramework, setSelectedFramework] = useState<PolicyFramework | null>(null);
  const [selectedArtifact, setSelectedArtifact] = useState<GovernanceArtifact | null>(null);
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aligned':
      case 'Certified':
        return 'text-green-500 bg-green-50 border-green-100';
      case 'Gap identified':
        return 'text-red-500 bg-red-50 border-red-100';
      case 'Under review':
      case 'Draft':
        return 'text-yellow-500 bg-yellow-50 border-yellow-100';
      default:
        return 'text-gray-400 bg-gray-50 border-gray-100';
    }
  };

  const handleGenerateLink = () => {
    setIsGeneratingLink(true);
    setTimeout(() => {
      setIsGeneratingLink(false);
      setGeneratedLink(`https://audit.greenflag.ai/auth/${Math.random().toString(36).substring(7)}`);
    }, 1200);
  };

  return (
    <div className="space-y-12 animate-in slide-in-from-right-4 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Policy & Governance Registry</h2>
          <p className="text-sm text-gray-500 mt-1 uppercase tracking-widest font-bold">Legal framework alignment & artifact repository</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsUploadOpen(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-black text-white text-[10px] font-black uppercase tracking-widest shadow-xl shadow-gray-200/50 hover:bg-gray-800 transition-all active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" /> Upload Artifact
          </button>
        </div>
      </div>

      {/* Framework Compliance Grid */}
      <section className="space-y-6">
        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] px-2">Active Regulatory Frameworks</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_FRAMEWORKS.map((framework) => (
            <div key={framework.id} className="p-8 rounded-[40px] border border-gray-100 bg-white shadow-xl shadow-gray-200/20 group hover:border-gray-200 transition-all">
              <div className="flex items-start justify-between mb-8">
                <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center border border-gray-100 group-hover:scale-110 transition-transform">
                  <Scale className="w-7 h-7 text-blue-500" />
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(framework.status)}`}>
                  {framework.status}
                </span>
              </div>
              
              <h4 className="text-xl font-black text-gray-900 mb-1">{framework.name}</h4>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">{framework.authority} • {framework.version}</p>
              
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Alignment Progress</span>
                  <span className="text-xs font-black text-gray-900">{framework.progress}%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full signature-gradient transition-all duration-1000" 
                    style={{ width: `${framework.progress}%` }}
                  />
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-gray-300" />
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Audited: {framework.lastAudited}</span>
                </div>
                <button 
                  onClick={() => setSelectedFramework(framework)}
                  className="text-[9px] font-black uppercase tracking-widest text-blue-500 hover:text-blue-600 flex items-center gap-1 transition-colors"
                >
                  Compliance Map <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Artifact Repository */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Compliance Artifact Repository</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search artifacts..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-xl border border-gray-100 text-[10px] font-bold outline-none focus:ring-2 focus:ring-blue-100 w-64 bg-white"
            />
          </div>
        </div>

        <div className="bg-white rounded-[40px] border border-gray-100 overflow-hidden shadow-2xl shadow-gray-200/20">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-50 bg-gray-50/30">
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Artifact Identity</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Classification</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Lifecycle Status</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Date of Record</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {MOCK_ARTIFACTS.filter(a => a.name.toLowerCase().includes(searchTerm.toLowerCase())).map((artifact) => (
                <tr 
                  key={artifact.id} 
                  onClick={() => setSelectedArtifact(artifact)}
                  className="hover:bg-gray-50/50 transition-colors group cursor-pointer"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 group-hover:text-blue-500 transition-colors">
                        {artifact.format === 'PDF' ? <FileText className="w-5 h-5" /> : artifact.format === 'JSON' ? <FileCode className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="text-sm font-black text-gray-900">{artifact.name}</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{artifact.owner}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className="text-[10px] font-black text-blue-500 bg-blue-50 px-2 py-1 rounded-lg border border-blue-100 uppercase tracking-widest">
                      {artifact.type}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${getStatusColor(artifact.status)}`}>
                      {artifact.status}
                    </span>
                  </td>
                  <td className="px-6 py-6 text-xs font-mono font-bold text-gray-500">
                    {artifact.date}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button 
                      onClick={(e) => { e.stopPropagation(); /* Download logic */ }}
                      className="p-2 rounded-xl text-gray-300 hover:text-black hover:bg-white border border-transparent hover:border-gray-100 transition-all"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Enforcement & Audits Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-10 rounded-[48px] border border-gray-100 bg-white shadow-xl shadow-gray-200/10">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl font-black text-gray-900 tracking-tight">Active Policy Enforcement</h3>
            <ShieldCheck className="w-6 h-6 text-green-500" />
          </div>
          <div className="space-y-4">
            {[
              { rule: 'PII Scrubbing Integrity Check', status: 'Enforced', color: 'text-green-500' },
              { rule: 'Bias Variance Threshold (Art. 10)', status: 'Enforced', color: 'text-green-500' },
              { rule: 'Third-party Model Vetting', status: 'Pending Approval', color: 'text-yellow-500' },
            ].map((rule, i) => (
              <div key={i} className="flex items-center justify-between p-5 rounded-[24px] bg-gray-50/50 border border-transparent hover:border-gray-100 transition-all">
                <span className="text-xs font-bold text-gray-700">{rule.rule}</span>
                <span className={`text-[9px] font-black uppercase tracking-widest ${rule.color}`}>{rule.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-10 rounded-[48px] bg-gray-900 text-white relative overflow-hidden flex flex-col justify-between shadow-2xl">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <History className="w-6 h-6 text-blue-400" />
              <h3 className="text-xl font-black tracking-tight">External Auditor Portal</h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed font-medium">Provision restricted, read-only access for third-party regulatory bodies to conduct structural audits of verified model artifacts.</p>
          </div>
          
          <div className="relative z-10 mt-10 space-y-4">
            {generatedLink ? (
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between animate-in zoom-in-95">
                <p className="text-[10px] font-mono text-blue-400 truncate pr-4">{generatedLink}</p>
                <button 
                  onClick={() => { navigator.clipboard.writeText(generatedLink); }}
                  className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            ) : null}
            <button 
              onClick={handleGenerateLink}
              disabled={isGeneratingLink}
              className="w-full py-4 bg-white/10 border border-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isGeneratingLink ? 'Generating Access Token...' : 'Generate Audit Access Link'} <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
          
          <div className="absolute top-0 right-0 w-64 h-64 signature-gradient opacity-10 blur-[100px] -mr-32 -mt-32"></div>
        </div>
      </div>

      {/* Modals */}

      {/* Upload Artifact Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-xl rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95">
            <div className="p-8 border-b border-gray-50 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Repository Ingestion</span>
                <h2 className="text-2xl font-black text-gray-900 mt-1 tracking-tight">Upload Artifact</h2>
              </div>
              <button onClick={() => setIsUploadOpen(false)} className="p-3 rounded-full hover:bg-gray-50 transition-colors">
                <X className="w-6 h-6 text-gray-300" />
              </button>
            </div>
            <div className="p-10 space-y-6">
              <div className="p-12 border-2 border-dashed border-gray-100 rounded-[32px] bg-gray-50/50 flex flex-col items-center text-center group hover:border-blue-200 hover:bg-blue-50/20 transition-all cursor-pointer">
                <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6 text-blue-500" />
                </div>
                <p className="text-sm font-black text-gray-900">Drag artifact file here</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">PDF, JSON, or DOCX (Max 50MB)</p>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Classification Type</p>
                  <select className="w-full px-5 py-3 rounded-xl border border-gray-100 bg-gray-50 outline-none font-bold text-xs">
                    <option>DPIA (Data Protection Impact Assessment)</option>
                    <option>AIA (Algorithmic Impact Assessment)</option>
                    <option>Transparency Declaration</option>
                    <option>Technical Specification</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Steward / Owner</p>
                  <input type="text" placeholder="e.g. Felix Arvid" className="w-full px-5 py-3 rounded-xl border border-gray-100 bg-gray-50 outline-none font-bold text-xs" />
                </div>
              </div>
            </div>
            <div className="p-8 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
              <button onClick={() => setIsUploadOpen(false)} className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black">Cancel</button>
              <button className="px-8 py-3.5 rounded-2xl bg-black text-white text-[10px] font-black uppercase tracking-widest shadow-xl shadow-gray-200/50 hover:bg-gray-800 transition-all">Submit to Registry</button>
            </div>
          </div>
        </div>
      )}

      {/* Compliance Map Modal */}
      {selectedFramework && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 max-h-[85vh] flex flex-col">
            <div className="p-8 border-b border-gray-50 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500 shadow-sm">
                  <Scale className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{selectedFramework.name} Mapping</span>
                  <h2 className="text-2xl font-black text-gray-900 mt-1 tracking-tight">Compliance Requirements Map</h2>
                </div>
              </div>
              <button onClick={() => setSelectedFramework(null)} className="p-3 rounded-full hover:bg-gray-50 transition-colors">
                <X className="w-6 h-6 text-gray-300" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-10 space-y-6">
              {[
                { section: 'Art. 10', title: 'Data & Data Governance', status: 'Compliant', desc: 'Training, validation and testing data sets shall be subject to appropriate data governance and management practices.' },
                { section: 'Art. 11', title: 'Technical Documentation', status: 'In Progress', desc: 'Technical documentation shall be drawn up before that system is placed on the market or put into service.' },
                { section: 'Art. 13', title: 'Transparency & Provision of Info', status: 'Action Required', desc: 'High-risk AI systems shall be designed and developed in such a way to ensure that their operation is sufficiently transparent.' },
                { section: 'Art. 14', title: 'Human Oversight', status: 'Compliant', desc: 'High-risk AI systems shall be designed and developed in such a way that they can be effectively overseen by natural persons.' },
              ].map((req, i) => (
                <div key={i} className="p-6 rounded-[32px] border border-gray-50 bg-gray-50/30 group hover:border-blue-100 hover:bg-white transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-lg bg-gray-900 text-white text-[9px] font-black uppercase tracking-widest">{req.section}</span>
                      <h4 className="font-black text-gray-900 text-sm">{req.title}</h4>
                    </div>
                    <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest border ${getStatusColor(req.status === 'Compliant' ? 'Aligned' : req.status === 'Action Required' ? 'Gap identified' : 'Under review')}`}>
                      {req.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 leading-relaxed font-medium">{req.desc}</p>
                </div>
              ))}
            </div>
            <div className="p-8 border-t border-gray-50 bg-gray-50/50 flex items-center justify-between shrink-0">
               <div className="flex items-center gap-2">
                 <ShieldCheck className="w-4 h-4 text-green-500" />
                 <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Auto-verified via Assurance Engine</span>
               </div>
               <button className="flex items-center gap-2 text-[10px] font-black text-blue-500 uppercase tracking-widest">
                 Export Report <ExternalLink className="w-3 h-3" />
               </button>
            </div>
          </div>
        </div>
      )}

      {/* Artifact Detail Modal */}
      {selectedArtifact && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-xl rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95">
            <div className="p-8 border-b border-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-blue-500">
                  {selectedArtifact.format === 'PDF' ? <FileText className="w-6 h-6" /> : <FileCode className="w-6 h-6" />}
                </div>
                <div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{selectedArtifact.type} Details</span>
                  <h2 className="text-xl font-black text-gray-900 tracking-tight">{selectedArtifact.name}</h2>
                </div>
              </div>
              <button onClick={() => setSelectedArtifact(null)} className="p-3 rounded-full hover:bg-gray-50 transition-colors">
                <X className="w-6 h-6 text-gray-300" />
              </button>
            </div>
            <div className="p-10 space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Format</p>
                  <p className="text-sm font-bold text-gray-900">{selectedArtifact.format}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Steward</p>
                  <p className="text-sm font-bold text-gray-900">{selectedArtifact.owner}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Date of Record</p>
                  <p className="text-sm font-bold text-gray-900">{selectedArtifact.date}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Status</p>
                  <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest border inline-block ${getStatusColor(selectedArtifact.status)}`}>
                    {selectedArtifact.status}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Summary Description</p>
                <p className="text-xs text-gray-500 leading-relaxed font-medium">{selectedArtifact.description}</p>
              </div>
              <div className="p-6 rounded-[32px] bg-gray-50 border border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <History className="w-4 h-4 text-gray-300" />
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">3 Previous Versions Available</span>
                </div>
                <button className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Browse</button>
              </div>
            </div>
            <div className="p-8 border-t border-gray-100 bg-gray-50/50 flex items-center gap-3">
               <button className="flex-1 py-4 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-gray-200/50 hover:bg-gray-800 transition-all flex items-center justify-center gap-2">
                 <Download className="w-4 h-4" /> Download Original
               </button>
               <button className="flex-1 py-4 bg-white border border-gray-100 text-black text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                 <Eye className="w-4 h-4" /> Preview
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GovernanceRegistry;

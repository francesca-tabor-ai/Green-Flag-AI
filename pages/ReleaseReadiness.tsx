
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Rocket, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Download, 
  MessageSquare, 
  History, 
  ChevronRight, 
  ArrowUpRight, 
  AlertTriangle,
  FileDown,
  ChevronDown,
  Check,
  RotateCcw
} from 'lucide-react';
import { Blocker, ApprovalStep } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const INITIAL_BLOCKERS: Blocker[] = [
  {
    id: 'bl-1',
    title: 'Adversarial Jailbreak Leak',
    description: 'Model bypasses safety filters for "social engineering" prompts. Direct violation of safety policy v2.1.',
    severity: 'CRITICAL',
    status: 'OPEN',
    actionLink: '/assurance'
  },
  {
    id: 'bl-2',
    title: 'Missing Legal Disclaimer',
    description: 'Inference pipeline lacks Art. 13 transparency headers required by EU AI Act.',
    severity: 'HIGH',
    status: 'OPEN',
    actionLink: '/governance'
  }
];

const INITIAL_APPROVALS: ApprovalStep[] = [
  {
    id: 'ap-1',
    role: 'Cybersecurity Head',
    name: 'Marcus Thorne',
    status: 'APPROVED',
    timestamp: '2024-05-18 09:00',
    comment: 'Pen-testing results look solid for v2.4.0 cluster.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus'
  },
  {
    id: 'ap-2',
    role: 'Legal Compliance',
    name: 'Sarah Chen',
    status: 'REJECTED',
    timestamp: '2024-05-18 10:30',
    comment: 'Blocked due to transparency header omission.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
  },
  {
    id: 'ap-3',
    role: 'Product Owner',
    name: 'Elena Rodriguez',
    status: 'PENDING',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena'
  }
];

const mockTrendData = [
  { t: 'W1', score: 45, blockers: 5 },
  { t: 'W2', score: 62, blockers: 3 },
  { t: 'W3', score: 58, blockers: 4 },
  { t: 'W4', score: 72, blockers: 2 },
  { t: 'Today', score: 68, blockers: 2 },
];

const ReleaseReadiness: React.FC = () => {
  const navigate = useNavigate();
  const [readinessScore, setReadinessScore] = useState(68);
  const [showCertOptions, setShowCertOptions] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [blockers, setBlockers] = useState<Blocker[]>(INITIAL_BLOCKERS);
  const [approvals, setApprovals] = useState<ApprovalStep[]>(INITIAL_APPROVALS);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'info', text: string } | null>(null);

  const getStatusInfo = () => {
    if (readinessScore > 90) return { label: 'Ready for Deployment', color: 'text-green-500', bg: 'bg-green-50', border: 'border-green-100', icon: CheckCircle2, statusColor: 'bg-green-500' };
    if (readinessScore > 50) return { label: 'Needs Attention', color: 'text-yellow-500', bg: 'bg-yellow-50', border: 'border-yellow-100', icon: AlertTriangle, statusColor: 'bg-yellow-500' };
    return { label: 'Release Blocked', color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-100', icon: XCircle, statusColor: 'bg-red-500' };
  };

  const status = getStatusInfo();

  const handleDownloadCert = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      setShowCertOptions(false);
      setFeedbackMsg({ type: 'success', text: 'Release Certificate Generated Successfully.' });
      setTimeout(() => setFeedbackMsg(null), 3000);
    }, 1500);
  };

  const handleApprovalAction = (id: string, newStatus: 'APPROVED' | 'REJECTED') => {
    setApprovals(prev => prev.map(ap => 
      ap.id === id ? { ...ap, status: newStatus, timestamp: new Date().toLocaleString(), comment: `Decision recorded: ${newStatus.toLowerCase()}` } : ap
    ));
    setFeedbackMsg({ type: 'info', text: `Approval status updated to ${newStatus}` });
    setTimeout(() => setFeedbackMsg(null), 3000);
    
    // Simulate score update if all approved
    if (newStatus === 'APPROVED' && approvals.every(a => a.id === id || a.status === 'APPROVED')) {
      setReadinessScore(92);
    }
  };

  const handleRemediate = (actionLink: string) => {
    navigate(actionLink);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Toast Feedback */}
      {feedbackMsg && (
        <div className="fixed top-20 right-8 z-[110] animate-in slide-in-from-right-4">
          <div className={`flex items-center gap-4 px-6 py-4 rounded-2xl shadow-2xl border ${feedbackMsg.type === 'success' ? 'bg-green-600 text-white border-green-500' : 'bg-gray-900 text-white border-gray-800'}`}>
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-xs font-black uppercase tracking-widest">{feedbackMsg.text}</span>
          </div>
        </div>
      )}

      {/* 3.1 Release Readiness Score Visualization */}
      <div className="flex flex-col lg:flex-row gap-8 items-stretch">
        <div className="flex-1 p-10 rounded-[48px] border border-gray-100 bg-white shadow-2xl shadow-gray-200/20 relative overflow-hidden group">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Aggregate Verification Score</span>
              <h2 className="text-8xl font-black text-gray-900 mt-2 tracking-tighter">{readinessScore}%</h2>
              <div className="flex items-center gap-4 mt-6">
                <div className={`mt-0 inline-flex items-center gap-2 px-6 py-2 rounded-2xl border font-black text-[12px] uppercase tracking-widest ${status.bg} ${status.color} ${status.border}`}>
                  <status.icon className="w-5 h-5" />
                  {status.label}
                </div>
                <div className="flex items-center gap-1.5 p-2 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className={`w-3 h-3 rounded-full ${readinessScore > 90 ? 'bg-green-500 shadow-[0_0_8px_rgba(74,222,128,1)]' : 'bg-gray-200'}`}></div>
                  <div className={`w-3 h-3 rounded-full ${readinessScore <= 90 && readinessScore > 50 ? 'bg-yellow-500 shadow-[0_0_8px_rgba(250,204,21,1)]' : 'bg-gray-200'}`}></div>
                  <div className={`w-3 h-3 rounded-full ${readinessScore <= 50 ? 'bg-red-500 shadow-[0_0_8px_rgba(248,113,113,1)]' : 'bg-gray-200'}`}></div>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-1/3 flex flex-col gap-4">
               <div className="p-4 rounded-3xl bg-gray-50 border border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Confidence Interval</span>
                    <span className="text-xs font-bold text-gray-900">High</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full w-[88%]"></div>
                  </div>
               </div>
               {/* 3.4 Release Certificate Button - Balanced tracking with padding for perfect centering */}
               <button 
                onClick={() => setShowCertOptions(true)}
                className="flex items-center justify-center gap-3 w-full py-5 px-6 rounded-[24px] signature-gradient text-white font-black text-xs uppercase shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
               >
                 <FileDown className="w-5 h-5" /> 
                 <span className="tracking-[0.2em] pl-[0.2em]">Generate Release Certificate</span>
               </button>
            </div>
          </div>
          <div className="absolute top-0 right-0 opacity-[0.02] -mr-16 -mt-16 pointer-events-none group-hover:opacity-[0.04] transition-opacity">
            <Rocket className="w-96 h-96" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* 3.2 Blocker Identification and Detail */}
        <div className="xl:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
             <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Active Blockers & Violations</h3>
             <span className="px-3 py-1 bg-red-50 text-red-500 text-[10px] font-black rounded-full border border-red-100">
               {blockers.filter(b => b.status === 'OPEN').length} CRITICAL DEFECTS
             </span>
          </div>
          <div className="space-y-4">
            {blockers.map((blocker) => (
              <div key={blocker.id} className="p-8 rounded-[40px] border border-gray-100 bg-white hover:border-red-100 hover:shadow-xl transition-all group flex flex-col md:flex-row gap-8 items-start">
                <div className={`p-4 rounded-3xl shrink-0 ${blocker.severity === 'CRITICAL' ? 'bg-red-50 text-red-500' : 'bg-orange-50 text-orange-500'}`}>
                  <ShieldAlert className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-xl font-black text-gray-900">{blocker.title}</h4>
                    <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest ${blocker.severity === 'CRITICAL' ? 'bg-red-500 text-white' : 'bg-orange-500 text-white'}`}>
                      {blocker.severity} SEVERITY
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed max-w-2xl">{blocker.description}</p>
                </div>
                <div className="flex items-center gap-4 self-end md:self-center">
                  <button 
                    onClick={() => handleRemediate(blocker.actionLink || '/assurance')}
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-black active:scale-[0.96] transition-all shadow-md"
                  >
                    Remediate <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 3.5 Historical Readiness Trends */}
          <div className="p-10 rounded-[48px] border border-gray-100 bg-white shadow-xl shadow-gray-200/10">
            <div className="flex items-center justify-between mb-10 px-2">
              <div>
                <h3 className="text-xl font-black text-gray-900 tracking-tight">Readiness Trajectory</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">5-Week Longitudinal Audit</p>
              </div>
              <History className="w-5 h-5 text-gray-200" />
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockTrendData}>
                  <defs>
                    <linearGradient id="colorReadiness" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="t" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10, fontWeight: 700}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10, fontWeight: 700}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="score" stroke="#3b82f6" fillOpacity={1} fill="url(#colorReadiness)" strokeWidth={4} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 3.3 Manual Approval Workflow Interface */}
        <div className="space-y-6">
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] px-2">Approval Chain</h3>
          <div className="p-8 rounded-[48px] border border-gray-100 bg-white shadow-xl shadow-gray-200/10">
            <div className="space-y-8">
              {approvals.map((step) => (
                <div key={step.id} className="relative">
                  <div className="flex gap-4">
                    <img src={step.avatar} className="w-12 h-12 rounded-2xl shadow-sm border border-gray-50" alt="" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-black text-gray-900 tracking-tight">{step.name}</p>
                        <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md border transition-all ${
                          step.status === 'APPROVED' ? 'bg-green-50 text-green-500 border-green-100' :
                          step.status === 'REJECTED' ? 'bg-red-50 text-red-500 border-red-100' :
                          'bg-yellow-50 text-yellow-500 border-yellow-100'
                        }`}>
                          {step.status}
                        </span>
                      </div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{step.role}</p>
                      
                      {step.comment && (
                        <div className="mt-3 p-4 rounded-2xl bg-gray-50 text-[11px] text-gray-600 font-medium leading-relaxed italic border border-gray-100/50">
                          "{step.comment}"
                        </div>
                      )}

                      {step.status === 'PENDING' && (
                        <div className="flex gap-2 mt-4 animate-in slide-in-from-top-2">
                          <button 
                            onClick={() => handleApprovalAction(step.id, 'APPROVED')}
                            className="flex-1 flex items-center justify-center gap-1 py-2.5 rounded-xl bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-black active:scale-[0.96] transition-all"
                          >
                            <Check className="w-3.5 h-3.5" /> Approve
                          </button>
                          <button 
                            onClick={() => handleApprovalAction(step.id, 'REJECTED')}
                            className="flex-1 flex items-center justify-center gap-1 py-2.5 rounded-xl bg-white border border-gray-100 text-red-500 text-[10px] font-black uppercase tracking-widest hover:bg-red-50 active:scale-[0.96] transition-all"
                          >
                            <XCircle className="w-3.5 h-3.5" /> Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Vertical audit line */}
                  <div className="absolute left-6 top-12 bottom-[-2rem] w-px bg-gray-50 -z-10 last:hidden"></div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 pt-8 border-t border-gray-50">
               <div className="flex items-center gap-2 mb-4">
                 <Clock className="w-4 h-4 text-gray-400" />
                 <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Audit Trail Highlights</span>
               </div>
               <div className="space-y-4">
                 {approvals.filter(a => a.status !== 'PENDING').slice(0, 2).map(a => (
                   <div key={`trail-${a.id}`} className="text-[10px] text-gray-500 font-medium">
                     <span className="font-bold text-gray-900">{a.name}:</span> Decision recorded as <span className={a.status === 'APPROVED' ? 'text-green-500' : 'text-red-500'}>{a.status}</span>.
                   </div>
                 ))}
                 <div className="text-[10px] text-gray-500 font-medium">
                   <span className="font-bold text-gray-900">System Trace:</span> Critical Blocker identified at 2024-05-18 10:32.
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Release Certificate Modal */}
      {showCertOptions && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-xl rounded-[48px] shadow-2xl overflow-hidden animate-in zoom-in-95">
            <div className="p-10 border-b border-gray-50 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Document Provisioning</span>
                <h2 className="text-3xl font-black text-gray-900 mt-1 tracking-tight">Generate Certificate</h2>
              </div>
              <button onClick={() => setShowCertOptions(false)} className="p-3 rounded-full hover:bg-gray-50 transition-colors">
                <XCircle className="w-6 h-6 text-gray-300" />
              </button>
            </div>

            <div className="p-10 space-y-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Export Format</label>
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center gap-2 p-6 rounded-3xl border-2 border-black bg-black text-white font-black text-xs uppercase tracking-widest active:scale-[0.98] transition-all">
                    PDF (Standard)
                  </button>
                  <button className="flex items-center justify-center gap-2 p-6 rounded-3xl border-2 border-gray-100 bg-white text-gray-400 font-black text-xs uppercase tracking-widest hover:border-gray-200 active:scale-[0.98] transition-all">
                    JSON (API)
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Inclusion Details</label>
                <div className="space-y-3">
                  {[
                    'Detailed Blocker Resolution Log',
                    'Stakeholder Approval Rationale',
                    'Assurance Metadata (EU AI Act Map)',
                    'Raw Test Case Evidence (CSV Attachment)'
                  ].map(detail => (
                    <label key={detail} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 cursor-pointer hover:border-gray-300 transition-all">
                      <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500" />
                      <span className="text-xs font-bold text-gray-700">{detail}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-10 border-t border-gray-50 bg-gray-50/30 flex items-center justify-between">
              <button 
                onClick={() => setShowCertOptions(false)}
                className="text-sm font-black text-gray-400 uppercase tracking-widest hover:text-black transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleDownloadCert}
                disabled={isDownloading}
                className="flex items-center gap-3 px-10 py-4 rounded-2xl signature-gradient text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {isDownloading ? (
                  <>Provisioning Artifact...</>
                ) : (
                  <>Generate & Download <Download className="w-5 h-5" /></>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReleaseReadiness;

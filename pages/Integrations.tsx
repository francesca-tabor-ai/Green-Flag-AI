
import React, { useState } from 'react';
import { 
  Share2, 
  Link as LinkIcon, 
  ShieldCheck, 
  Database, 
  Globe, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Terminal, 
  Activity, 
  Brain, 
  Box,
  X,
  Settings2,
  Lock,
  Zap,
  ChevronRight,
  Webhook,
  Cloud,
  Code,
  HardDrive
} from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  description: string;
  status: 'connected' | 'error' | 'not_configured';
  icon: React.ReactNode;
  lastRun?: string;
  category: string;
}

const IntegrationCard: React.FC<{ 
  integration: Integration;
  onConfigure: (integration: Integration) => void;
}> = ({ integration, onConfigure }) => {
  const { name, description, status, icon, lastRun } = integration;
  return (
    <div className="p-8 rounded-[40px] border border-gray-100 bg-white shadow-xl shadow-gray-200/20 group hover:border-gray-200 transition-all cursor-pointer">
      <div className="flex items-start justify-between mb-6">
        <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center border border-gray-100 shadow-inner group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
          status === 'connected' ? 'bg-green-50 text-green-600 border-green-100' : 
          status === 'error' ? 'bg-red-50 text-red-600 border-red-100' : 
          'bg-gray-50 text-gray-400 border-gray-100'
        }`}>
          {status.replace('_', ' ')}
        </div>
      </div>
      <h4 className="text-xl font-black text-gray-900 mb-2">{name}</h4>
      <p className="text-xs text-gray-500 leading-relaxed font-medium">{description}</p>
      {lastRun && (
        <div className="mt-4 flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-gray-300" />
          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Last Run: {lastRun}</span>
        </div>
      )}
      <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
        <button 
          onClick={(e) => { e.stopPropagation(); onConfigure(integration); }}
          className="text-[10px] font-black uppercase tracking-widest text-blue-500 hover:text-blue-600 transition-colors"
        >
          Configuration Suite
        </button>
        {status === 'connected' ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Plus className="w-4 h-4 text-gray-300" />}
      </div>
    </div>
  );
};

const Integrations: React.FC = () => {
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [customType, setCustomType] = useState<'webhook' | 's3'>('webhook');

  const frameworks: Integration[] = [
    { 
      id: 'deepeval',
      name: 'DeepEval', 
      description: 'Unit testing framework for LLMs with hallucination and answer relevancy metrics.',
      status: 'connected',
      lastRun: '12 mins ago',
      category: 'Assurance',
      icon: <Brain className="w-7 h-7 text-purple-500" />
    },
    { 
      id: 'ragas',
      name: 'Ragas', 
      description: 'Framework for evaluation of Retrieval Augmented Generation (RAG) pipelines.',
      status: 'not_configured',
      category: 'Assurance',
      icon: <Box className="w-7 h-7 text-green-500" />
    },
    { 
      id: 'custom-judge',
      name: 'Custom Judge', 
      description: 'Internal LLM-as-Judge engine configured with proprietary assurance criteria.',
      status: 'connected',
      lastRun: '2 hours ago',
      category: 'Assurance',
      icon: <Terminal className="w-7 h-7 text-gray-900" />
    }
  ];

  const observability: Integration[] = [
    { 
      id: 'datadog',
      name: 'Datadog', 
      description: 'High-resolution metrics and log forwarding for complex observability pipelines.',
      status: 'connected',
      lastRun: 'Live Stream',
      category: 'Observability',
      icon: <Share2 className="w-7 h-7 text-purple-600" />
    },
    { 
      id: 'otel',
      name: 'OpenTelemetry', 
      description: 'Vendor-neutral telemetry framework for traces and metrics collection.',
      status: 'not_configured',
      category: 'Observability',
      icon: <Globe className="w-7 h-7 text-blue-500" />
    },
    { 
      id: 'cloudwatch',
      name: 'AWS CloudWatch', 
      description: 'Native log storage and metric monitoring for AWS-resident model clusters.',
      status: 'error',
      category: 'Observability',
      icon: <Database className="w-7 h-7 text-orange-500" />
    }
  ];

  const handleSaveConfig = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSelectedIntegration(null);
      setIsCustomModalOpen(false);
    }, 1200);
  };

  return (
    <div className="space-y-12 animate-in slide-in-from-right-4 duration-700">
      <div>
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">External Integration Hub</h2>
        <p className="text-sm text-gray-500 mt-1 uppercase tracking-widest font-bold">Sink telemetry and connect evaluation frameworks</p>
      </div>

      <section className="space-y-6">
        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] px-2">Assurance & Evaluation Frameworks</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {frameworks.map(i => (
            <IntegrationCard key={i.id} integration={i} onConfigure={setSelectedIntegration} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] px-2">Observability & Sinks</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {observability.map(i => (
            <IntegrationCard key={i.id} integration={i} onConfigure={setSelectedIntegration} />
          ))}
        </div>
      </section>

      <div className="p-10 rounded-[48px] border border-gray-100 bg-gray-50/50 flex flex-col items-center text-center">
        <ShieldCheck className="w-16 h-16 text-green-400 mb-6" />
        <h3 className="text-2xl font-black text-gray-900">Custom Integration Pipeline</h3>
        <p className="text-sm text-gray-500 mt-2 max-w-xl font-medium leading-relaxed">Build custom webhooks or direct-to-S3 ingestion pipelines for non-standard observability or evaluation requirements.</p>
        <button 
          onClick={() => { setCustomType('webhook'); setIsCustomModalOpen(true); }}
          className="mt-8 px-8 py-3.5 rounded-2xl border-2 border-black text-black font-black text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all active:scale-[0.98]"
        >
          Initialize Custom Connector
        </button>
      </div>

      {/* Configuration Modal */}
      {selectedIntegration && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-xl rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95">
            <div className="p-8 border-b border-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center border border-gray-100 shadow-sm">
                  {selectedIntegration.icon}
                </div>
                <div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{selectedIntegration.category} Parameters</span>
                  <h2 className="text-2xl font-black text-gray-900 mt-1 tracking-tight">{selectedIntegration.name} Config</h2>
                </div>
              </div>
              <button onClick={() => setSelectedIntegration(null)} className="p-3 rounded-full hover:bg-gray-50 transition-colors">
                <X className="w-6 h-6 text-gray-300" />
              </button>
            </div>

            <div className="p-10 space-y-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Lock className="w-3 h-3" /> Secure Access Credentials
                </label>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">API Key / Token</p>
                    <input 
                      type="password" 
                      defaultValue="••••••••••••••••"
                      className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none text-sm font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Endpoint URI</p>
                    <input 
                      type="text" 
                      placeholder="https://api.integration.io/v1/..."
                      className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none text-sm font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Activity className="w-3 h-3" /> Telemetry Controls
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 rounded-3xl bg-gray-50 border border-gray-100">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Sync Interval</p>
                    <select className="w-full bg-transparent text-xs font-bold outline-none cursor-pointer">
                      <option>Real-time (Push)</option>
                      <option>5 Minutes (Poll)</option>
                      <option>15 Minutes (Poll)</option>
                      <option>Hourly</option>
                    </select>
                  </div>
                  <div className="p-5 rounded-3xl bg-gray-50 border border-gray-100">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Data Verbosity</p>
                    <select className="w-full bg-transparent text-xs font-bold outline-none cursor-pointer">
                      <option>Production (Stable)</option>
                      <option>Trace-Level (Full)</option>
                      <option>Aggregated (Summary)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-blue-50/50 border border-blue-100 flex gap-4">
                <Zap className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] font-black text-blue-700 uppercase tracking-widest">Verification Status</p>
                  <p className="text-[10px] text-blue-600/70 font-bold leading-relaxed mt-1">Connection verified via mTLS. Structural integrity check pending for current iteration.</p>
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-gray-50 bg-gray-50/30 flex items-center justify-between">
              <button 
                onClick={() => setSelectedIntegration(null)}
                className="px-6 py-3 rounded-xl text-sm font-black text-gray-400 uppercase tracking-widest hover:text-black transition-colors"
              >
                Discard Changes
              </button>
              <button 
                onClick={handleSaveConfig}
                disabled={isSaving}
                className="flex items-center gap-2 px-10 py-4 rounded-2xl signature-gradient text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {isSaving ? 'Verifying Link...' : 'Commit Configuration'}
                {!isSaving && <ChevronRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Connector Modal */}
      {isCustomModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95">
            <div className="p-8 border-b border-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gray-900 flex items-center justify-center text-blue-400 shadow-sm">
                  {customType === 'webhook' ? <Webhook className="w-6 h-6" /> : <Cloud className="w-6 h-6" />}
                </div>
                <div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Infrastructure Ingestion</span>
                  <h2 className="text-2xl font-black text-gray-900 mt-1 tracking-tight">Provision Custom Pipeline</h2>
                </div>
              </div>
              <button onClick={() => setIsCustomModalOpen(false)} className="p-3 rounded-full hover:bg-gray-50 transition-colors">
                <X className="w-6 h-6 text-gray-300" />
              </button>
            </div>

            <div className="p-10 space-y-10">
              <div className="grid grid-cols-2 gap-6">
                <button 
                  onClick={() => setCustomType('webhook')}
                  className={`p-6 rounded-[32px] border-2 text-left transition-all relative ${customType === 'webhook' ? 'border-blue-500 bg-blue-50/50' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                >
                   <Webhook className={`w-6 h-6 mb-4 ${customType === 'webhook' ? 'text-blue-500' : 'text-gray-400'}`} />
                   <p className="text-sm font-black text-gray-900 uppercase">REST Webhook</p>
                   <p className="text-[10px] text-gray-500 font-medium mt-1 leading-relaxed">Push-based telemetry sink via standard JSON payloads.</p>
                   {customType === 'webhook' && <div className="absolute top-4 right-4 bg-blue-500 text-white p-1 rounded-full"><CheckCircle2 className="w-3 h-3" /></div>}
                </button>
                <button 
                  onClick={() => setCustomType('s3')}
                  className={`p-6 rounded-[32px] border-2 text-left transition-all relative ${customType === 's3' ? 'border-orange-500 bg-orange-50/50' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                >
                   <Cloud className={`w-6 h-6 mb-4 ${customType === 's3' ? 'text-orange-500' : 'text-gray-400'}`} />
                   <p className="text-sm font-black text-gray-900 uppercase">Cloud Storage (S3)</p>
                   <p className="text-[10px] text-gray-500 font-medium mt-1 leading-relaxed">Direct parquet/csv ingestion from verified buckets.</p>
                   {customType === 's3' && <div className="absolute top-4 right-4 bg-orange-500 text-white p-1 rounded-full"><CheckCircle2 className="w-3 h-3" /></div>}
                </button>
              </div>

              <div className="space-y-6">
                 <div className="space-y-2">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Connector Identity</p>
                    <input 
                      type="text" 
                      placeholder={customType === 'webhook' ? "e.g. Internal-Audit-Proxy-v1" : "e.g. Production-Logs-S3-Archive"}
                      className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none text-sm font-bold"
                    />
                 </div>

                 {customType === 'webhook' ? (
                   <div className="space-y-6 animate-in slide-in-from-top-2 duration-300">
                     <div className="space-y-2">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Webhook Target URL</p>
                        <input 
                          type="text" 
                          placeholder="https://your-domain.com/api/gf-ingest"
                          className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none text-sm font-mono"
                        />
                     </div>
                     <div className="space-y-2">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Payload Transformation Schema (JSON)</p>
                        <div className="relative">
                           <textarea 
                            rows={3}
                            placeholder="{ 'mapping': '$.telemetry.event' }"
                            className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-900 text-green-400 focus:ring-2 focus:ring-blue-100 outline-none text-xs font-mono resize-none"
                          />
                          <Code className="absolute top-4 right-4 w-4 h-4 text-gray-600" />
                        </div>
                     </div>
                   </div>
                 ) : (
                   <div className="space-y-6 animate-in slide-in-from-top-2 duration-300">
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Bucket Name</p>
                          <input 
                            type="text" 
                            placeholder="gf-telemetry-bucket"
                            className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white outline-none text-sm font-mono"
                          />
                        </div>
                        <div className="space-y-2">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">AWS Region</p>
                          <select className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 outline-none text-sm font-bold">
                            <option>us-east-1</option>
                            <option>us-west-2</option>
                            <option>eu-central-1</option>
                            <option>ap-southeast-1</option>
                          </select>
                        </div>
                     </div>
                     <div className="space-y-2">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">IAM Role ARN</p>
                        <div className="relative">
                           <input 
                            type="text"
                            placeholder="arn:aws:iam::1234567890:role/gf-ingestion-role"
                            className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white outline-none text-sm font-mono pr-12"
                          />
                          <HardDrive className="absolute top-1/2 -translate-y-1/2 right-4 w-4 h-4 text-gray-400" />
                        </div>
                     </div>
                   </div>
                 )}
              </div>

              <div className="p-6 rounded-[32px] bg-gray-50 border border-gray-100 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <Lock className="w-4 h-4 text-gray-400" />
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Signed Request Verification</span>
                 </div>
                 <div className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                  </div>
              </div>
            </div>

            <div className="p-8 border-t border-gray-50 bg-gray-50/30 flex items-center justify-between">
              <button 
                onClick={() => setIsCustomModalOpen(false)}
                className="px-6 py-3 rounded-xl text-sm font-black text-gray-400 uppercase tracking-widest hover:text-black transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveConfig}
                disabled={isSaving}
                className="flex items-center gap-2 px-10 py-4 rounded-2xl bg-black text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-gray-200/50 active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {isSaving ? 'Provisioning Hub...' : 'Authorize Connector'}
                {!isSaving && <ChevronRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Integrations;

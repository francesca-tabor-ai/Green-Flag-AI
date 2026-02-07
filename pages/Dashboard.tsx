
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import MetricCard from '../components/MetricCard';
import RiskScoreGauge from '../components/RiskScoreGauge';
import RiskFactorBreakdown from '../components/RiskFactorBreakdown';
import RiskIssuesList from '../components/DrillDown/RiskIssuesList';
import ScoreFeedback from '../components/Feedback/ScoreFeedback';
import { AssuranceMetric, RiskLevel, RiskIssue } from '../types';
import { AlertCircle, CheckCircle2, Clock, ShieldCheck, Info, RefreshCcw, Database, X } from 'lucide-react';

const mockData = {
  '24h': [
    { name: '00:00', risk: 20, performance: 85 },
    { name: '04:00', risk: 22, performance: 82 },
    { name: '08:00', risk: 28, performance: 80 },
    { name: '12:00', risk: 24, performance: 88 },
    { name: '16:00', risk: 25, performance: 90 },
    { name: '20:00', risk: 24, performance: 92 },
  ],
  '7d': [
    { name: 'Mon', risk: 40, performance: 60 },
    { name: 'Tue', risk: 30, performance: 70 },
    { name: 'Wed', risk: 45, performance: 65 },
    { name: 'Thu', risk: 20, performance: 80 },
    { name: 'Fri', risk: 25, performance: 85 },
    { name: 'Sat', risk: 15, performance: 92 },
  ],
  '30d': [
    { name: 'Week 1', risk: 35, performance: 65 },
    { name: 'Week 2', risk: 42, performance: 58 },
    { name: 'Week 3', risk: 22, performance: 82 },
    { name: 'Week 4', risk: 18, performance: 94 },
  ]
};

const metrics: AssuranceMetric[] = [
  { name: 'Composite Risk Index', value: 24, change: -12, status: 'positive' },
  { name: 'Registered Assets', value: 12, change: 8, status: 'neutral' },
  { name: 'Assurance Pass Rate', value: '94.2%', change: 2.1, status: 'positive' },
  { name: 'Regulatory Drifts', value: 3, change: 50, status: 'negative' },
];

const MOCK_ISSUES: RiskIssue[] = [
  {
    id: 'iss-1',
    category: 'Safety',
    title: 'PII Exposure Vulnerability',
    description: 'Model output contains patterns resembling customer credit card numbers during stress-test simulations.',
    severity: RiskLevel.CRITICAL,
    sourceType: 'TEST_CASE',
    sourceId: 'tc-992',
    timestamp: '2 hours ago'
  },
  {
    id: 'iss-2',
    category: 'Compliance',
    title: 'EU AI Act Article 13 Mismatch',
    description: 'Inference logs indicate transparency declarations are missing from model system prompts.',
    severity: RiskLevel.HIGH,
    sourceType: 'POLICY',
    sourceId: 'eu-act-13',
    timestamp: '5 hours ago'
  },
  {
    id: 'iss-3',
    category: 'Security',
    title: 'Unauthorized API Sink Push',
    description: 'Unexpected telemetry forwarding to unverified staging environment detected in Datadog logs.',
    severity: RiskLevel.MEDIUM,
    sourceType: 'LOG',
    sourceId: 'log-8821',
    timestamp: '1 day ago'
  }
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [timeframe, setTimeframe] = useState<'24h' | '7d' | '30d'>('7d');
  const [showDrillDown, setShowDrillDown] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleInvestigateIssue = (issue: RiskIssue) => {
    switch (issue.sourceType) {
      case 'TEST_CASE':
        navigate('/assurance');
        break;
      case 'LOG':
        navigate('/observability');
        break;
      case 'POLICY':
        navigate('/governance');
        break;
      default:
        navigate('/assurance');
    }
  };

  const handleMetricClick = (name: string) => {
    switch (name) {
      case 'Registered Assets':
        navigate('/registry');
        break;
      case 'Regulatory Drifts':
        navigate('/governance');
        break;
      case 'Assurance Pass Rate':
      case 'Composite Risk Index':
        navigate('/assurance');
        break;
    }
  };

  const handleInitiateAssessment = () => {
    navigate('/assurance', { state: { activeTab: 'audit' } });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Top Header Row with Status */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-2">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Executive Dashboard</h2>
          <p className="text-sm text-gray-500 font-medium mt-1">Real-time AI readiness & structural assurance signals</p>
        </div>
        <div className="flex items-center gap-6 bg-gray-50 px-6 py-3 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#4ade80]"></div>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Telemetry: Active</span>
          </div>
          <div className="h-4 w-px bg-gray-200"></div>
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Last Sync: Just Now</span>
          </div>
          <RefreshCcw className="w-3.5 h-3.5 text-blue-500 cursor-pointer hover:rotate-180 transition-transform duration-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Left Primary Visualization Column */}
        <div className="xl:col-span-3 space-y-8">
          {/* Key Intelligence Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <RiskScoreGauge 
              score={24} 
              level={RiskLevel.LOW} 
              onDrillDown={() => { setShowDrillDown(!showDrillDown); setShowFeedback(false); }}
              onFeedback={() => { setShowFeedback(!showFeedback); setShowDrillDown(false); }}
            />
            <div className="lg:col-span-2 relative">
              {showDrillDown ? (
                <div className="h-full">
                   <RiskIssuesList 
                    issues={MOCK_ISSUES} 
                    onInvestigate={handleInvestigateIssue} 
                  />
                  <button 
                    onClick={() => setShowDrillDown(false)}
                    className="absolute top-2 right-2 p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              ) : showFeedback ? (
                <div className="h-full flex items-center justify-center">
                   <ScoreFeedback scoreId="cri-dashboard" onClose={() => setShowFeedback(false)} />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full animate-in fade-in duration-500">
                  {metrics.slice(0, 4).map((m, i) => (
                    <MetricCard 
                      key={i} 
                      metric={m} 
                      onClick={() => handleMetricClick(m.name)} 
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Main Trend Analysis Chart */}
          <div className="p-8 rounded-[40px] border border-gray-100 bg-white shadow-xl shadow-gray-200/10">
            <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
              <div>
                <h3 className="text-xl font-black text-gray-900 tracking-tight">Systemic Assurance Trends</h3>
                <p className="text-xs text-gray-500 font-medium mt-1">Longitudinal tracking of performance stability vs. risk drift</p>
              </div>
              <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
                {(['24h', '7d', '30d'] as const).map(tf => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${timeframe === tf ? 'bg-white text-black shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockData[timeframe]}>
                  <defs>
                    <linearGradient id="colorPerf" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f87171" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#f87171" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10, fontWeight: 700}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10, fontWeight: 700}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }}
                    cursor={{ stroke: '#3b82f6', strokeWidth: 1 }}
                  />
                  <Area type="monotone" dataKey="performance" stroke="#10b981" fillOpacity={1} fill="url(#colorPerf)" strokeWidth={4} />
                  <Area type="monotone" dataKey="risk" stroke="#f87171" fillOpacity={1} fill="url(#colorRisk)" strokeWidth={4} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-8 flex gap-8 justify-center border-t border-gray-50 pt-8">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_#4ade80]"></div>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Model Performance Stability</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400 shadow-[0_0_8px_#f87171]"></div>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Adversarial Latent Risk</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Insights Column */}
        <div className="space-y-8">
          <RiskFactorBreakdown />
          
          <div 
            onClick={handleInitiateAssessment}
            className="p-8 rounded-[40px] bg-gray-900 text-white relative overflow-hidden group shadow-2xl cursor-pointer hover:bg-black transition-all"
          >
            <div className="relative z-10">
              <ShieldCheck className="w-10 h-10 text-green-400 mb-6 group-hover:scale-110 transition-transform" />
              <h4 className="text-2xl font-black mb-2 tracking-tight">Go-Live Certification</h4>
              <p className="text-xs text-gray-400 mb-8 leading-relaxed font-medium">Verify structural integrity against EU AI Act & NIST frameworks.</p>
              <button 
                onClick={(e) => { e.stopPropagation(); handleInitiateAssessment(); }}
                className="w-full py-4 bg-white text-black font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-gray-100 transition-all active:scale-[0.98] shadow-xl"
              >
                Initiate Assessment
              </button>
            </div>
            <div className="absolute top-0 right-0 w-48 h-48 signature-gradient opacity-10 blur-[80px] -mr-16 -mt-16 group-hover:opacity-20 transition-opacity duration-700"></div>
          </div>

          <div className="p-8 rounded-[40px] border border-gray-100 bg-white shadow-xl shadow-gray-200/10">
            <div className="flex items-center justify-between mb-8">
               <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Live Ingestion Sinks</h4>
               <Database className="w-4 h-4 text-gray-200" />
            </div>
            <div className="space-y-4">
              {[
                { label: 'Datadog Telemetry', status: 'Healthy', color: 'text-green-500' },
                { label: 'AWS CloudWatch Logs', status: 'Healthy', color: 'text-green-500' },
                { label: 'DeepEval Framework', status: 'Pending', color: 'text-yellow-500' },
              ].map((sink, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50/50 border border-transparent hover:border-gray-100 transition-all group cursor-pointer">
                  <span className="text-xs font-bold text-gray-700">{sink.label}</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${sink.color.replace('text', 'bg')}`}></div>
                    <span className={`text-[9px] font-black uppercase tracking-widest ${sink.color}`}>{sink.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

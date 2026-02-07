
import React, { useState, useMemo } from 'react';
import { TestCase } from '../../types';
import { Shield, Brain, Terminal, Info, ChevronDown, ChevronUp, AlertTriangle, CheckCircle2, Search, Filter, ArrowUpDown, RefreshCw } from 'lucide-react';

interface DetailedReportProps {
  category: string;
  testCases: TestCase[];
}

const DetailedReport: React.FC<DetailedReportProps> = ({ category, testCases }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'score' | 'timestamp'>('score');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredAndSortedCases = useMemo(() => {
    return testCases
      .filter(tc => {
        const matchesSearch = tc.input.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             tc.actualOutput.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'ALL' || tc.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        const valA = sortBy === 'score' ? a.score : new Date(a.timestamp).getTime();
        const valB = sortBy === 'score' ? b.score : new Date(b.timestamp).getTime();
        return sortOrder === 'desc' ? Number(valB) - Number(valA) : Number(valA) - Number(valB);
      });
  }, [testCases, searchQuery, statusFilter, sortBy, sortOrder]);

  const toggleSort = (field: 'score' | 'timestamp') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 px-2">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gray-900 text-white shadow-lg">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-gray-900 tracking-tight">{category} Verification Report</h3>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-0.5">Automated Suite • Dynamic Analysis</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-2xl border border-gray-100 bg-white text-[10px] font-black uppercase tracking-widest hover:border-gray-300 transition-all">
            <RefreshCw className="w-4 h-4 text-blue-500" />
            Trigger Re-evaluation
          </button>
          <div className="h-10 w-px bg-gray-100"></div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Pass Rate</p>
              <p className="text-lg font-black text-green-500">{(testCases.filter(t => t.status === 'PASS').length / testCases.length * 100).toFixed(1)}%</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Flags</p>
              <p className="text-lg font-black text-red-500">{testCases.filter(t => t.status === 'FAIL').length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-4 bg-gray-50/50 p-4 rounded-3xl border border-gray-100 shadow-sm">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search test inputs or outputs..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-gray-100 bg-white focus:ring-2 focus:ring-green-100 outline-none text-xs font-medium"
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-2xl border border-gray-100">
            <Filter className="w-3.5 h-3.5 text-gray-400" />
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs font-bold uppercase tracking-widest bg-transparent outline-none cursor-pointer"
            >
              <option value="ALL">Status: All</option>
              <option value="PASS">Pass Only</option>
              <option value="FAIL">Failures Only</option>
              <option value="FLAGGED">Flagged</option>
            </select>
          </div>
          <button 
            onClick={() => toggleSort('score')}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl border transition-all text-xs font-bold uppercase tracking-widest ${sortBy === 'score' ? 'bg-black text-white border-black shadow-md' : 'bg-white text-gray-500 border-gray-100'}`}
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            Score {sortBy === 'score' && (sortOrder === 'desc' ? '↓' : '↑')}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-2xl shadow-gray-200/20 overflow-hidden">
        <div className="grid grid-cols-12 px-8 py-5 border-b border-gray-50 bg-gray-50/30 text-[10px] font-black text-gray-400 uppercase tracking-widest">
          <div className="col-span-5">System Prompt / Input</div>
          <div className="col-span-2 text-center">Score</div>
          <div className="col-span-3">Assurance Status</div>
          <div className="col-span-2 text-right">Verification</div>
        </div>
        
        <div className="divide-y divide-gray-50">
          {filteredAndSortedCases.length > 0 ? filteredAndSortedCases.map((test) => (
            <div key={test.id} className="group">
              <div 
                onClick={() => setExpandedId(expandedId === test.id ? null : test.id)}
                className="grid grid-cols-12 px-8 py-6 items-center hover:bg-gray-50/50 cursor-pointer transition-colors"
              >
                <div className="col-span-5 pr-8">
                  <p className="text-xs font-bold text-gray-900 truncate">{test.input}</p>
                </div>
                <div className="col-span-2 text-center">
                  <span className={`font-mono font-black text-xs ${test.score > 80 ? 'text-green-500' : test.score > 50 ? 'text-yellow-500' : 'text-red-500'}`}>
                    {test.score.toFixed(1)}%
                  </span>
                </div>
                <div className="col-span-3">
                  <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                    test.status === 'PASS' ? 'bg-green-50 text-green-600 border-green-100' : 
                    test.status === 'FAIL' ? 'bg-red-50 text-red-600 border-red-100' : 
                    'bg-yellow-50 text-yellow-600 border-yellow-100'
                  }`}>
                    {test.status}
                  </span>
                </div>
                <div className="col-span-2 text-right">
                  {expandedId === test.id ? <ChevronUp className="w-4 h-4 ml-auto text-gray-400" /> : <ChevronDown className="w-4 h-4 ml-auto text-gray-400" />}
                </div>
              </div>
              
              {expandedId === test.id && (
                <div className="px-8 pb-8 pt-2 grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in slide-in-from-top-2 duration-300">
                  <div className="space-y-4">
                    <div className="p-5 rounded-[24px] bg-gray-50 border border-gray-100">
                      <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <Terminal className="w-3.5 h-3.5" /> Model Inference Output
                      </h5>
                      <p className="text-xs text-gray-700 leading-relaxed font-mono whitespace-pre-wrap">{test.actualOutput}</p>
                    </div>
                    {test.expectedOutput && (
                      <div className="p-5 rounded-[24px] bg-green-50/30 border border-green-100">
                        <h5 className="text-[10px] font-black text-green-600/60 uppercase tracking-widest mb-3 flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Gold Standard Baseline
                        </h5>
                        <p className="text-xs text-gray-700 leading-relaxed font-mono whitespace-pre-wrap">{test.expectedOutput}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6 rounded-[32px] bg-gray-900 text-white flex flex-col shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                      <h5 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] flex items-center gap-2">
                        <Brain className="w-4 h-4" /> LLM-AS-JUDGE Analysis
                      </h5>
                      <span className="text-[10px] font-bold text-gray-500">GEMINI-3-PRO-ASSURANCE</span>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="flex items-start gap-3">
                        <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${test.status === 'PASS' ? 'bg-green-400 shadow-[0_0_8px_#4ade80]' : 'bg-red-400 shadow-[0_0_8px_#f87171]'}`}></div>
                        <p className="text-xs leading-relaxed text-gray-300 italic">
                          {test.judgeRationale || "Critique engine failed to synthesize rationale for this specific vector."}
                        </p>
                      </div>
                      <div className="pt-4 mt-auto border-t border-white/10 grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Alignment</p>
                          <p className="text-xs font-bold text-white">94% Nominal</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Confidence</p>
                          <p className="text-xs font-bold text-white">High (Auto-Resolved)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="py-20 text-center">
              <Info className="w-12 h-12 text-gray-100 mx-auto mb-4" />
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">No matching test cases found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailedReport;

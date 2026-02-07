
import React from 'react';
import { RiskIssue, RiskLevel } from '../../types';
import { AlertTriangle, Terminal, FileText, ChevronRight, ArrowUpRight, Shield } from 'lucide-react';

interface RiskIssuesListProps {
  issues: RiskIssue[];
  onInvestigate: (issue: RiskIssue) => void;
}

const RiskIssuesList: React.FC<RiskIssuesListProps> = ({ issues, onInvestigate }) => {
  const getSeverityStyles = (level: RiskLevel) => {
    switch (level) {
      case RiskLevel.CRITICAL: return 'bg-red-500 text-white';
      case RiskLevel.HIGH: return 'bg-orange-500 text-white';
      case RiskLevel.MEDIUM: return 'bg-yellow-400 text-black';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getSourceIcon = (type: RiskIssue['sourceType']) => {
    switch (type) {
      case 'LOG': return <Terminal className="w-4 h-4" />;
      case 'TEST_CASE': return <Shield className="w-4 h-4" />;
      case 'POLICY': return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center justify-between px-2 mb-2">
        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Contribution Evidence</h4>
        <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">{issues.length} Issues Identified</span>
      </div>
      <div className="space-y-3">
        {issues.map((issue) => (
          <div 
            key={issue.id}
            onClick={() => onInvestigate(issue)}
            className="group p-5 bg-white border border-gray-100 rounded-[32px] hover:border-gray-200 hover:shadow-lg hover:shadow-gray-100/50 transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className={`mt-1 p-2 rounded-xl flex items-center justify-center ${issue.severity === RiskLevel.CRITICAL ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-400'}`}>
                  {getSourceIcon(issue.sourceType)}
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-black text-gray-900 tracking-tight">{issue.title}</span>
                    <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest ${getSeverityStyles(issue.severity)}`}>
                      {issue.severity}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2">{issue.description}</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-200 group-hover:text-black group-hover:translate-x-1 transition-all shrink-0 mt-1" />
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{issue.category} • {issue.timestamp}</span>
              <div className="flex items-center gap-2 text-[9px] font-black text-blue-500 uppercase tracking-widest group-hover:underline">
                Inspect Source <ArrowUpRight className="w-3 h-3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiskIssuesList;

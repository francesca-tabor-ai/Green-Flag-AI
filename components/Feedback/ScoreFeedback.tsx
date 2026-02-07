
import React, { useState } from 'react';
import { MessageSquare, X, Send, AlertCircle, CheckCircle2 } from 'lucide-react';

interface ScoreFeedbackProps {
  scoreId: string;
  onClose: () => void;
}

const ScoreFeedback: React.FC<ScoreFeedbackProps> = ({ scoreId, onClose }) => {
  const [comment, setComment] = useState('');
  const [type, setType] = useState<'OVERESTIMATED' | 'UNDERESTIMATED' | 'INCORRECT_MAPPING'>('OVERESTIMATED');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setSubmitted(true);
    setTimeout(() => onClose(), 2000);
  };

  if (submitted) {
    return (
      <div className="p-8 bg-white rounded-[40px] border border-gray-100 shadow-2xl flex flex-col items-center text-center animate-in zoom-in-95">
        <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-6 h-6 text-green-500" />
        </div>
        <h4 className="text-lg font-black text-gray-900">Feedback Logged</h4>
        <p className="text-xs text-gray-400 mt-2">Assurance Engine recalibrating based on human input.</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-white rounded-[40px] border border-gray-100 shadow-2xl animate-in slide-in-from-top-4 duration-300 w-full max-w-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-blue-500" />
          <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Discrepancy Flag</h4>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-gray-50 rounded-full transition-colors">
          <X className="w-4 h-4 text-gray-300" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Assessment Type</label>
          <div className="grid grid-cols-1 gap-2">
            {[
              { id: 'OVERESTIMATED', label: 'Overestimated Risk' },
              { id: 'UNDERESTIMATED', label: 'Underestimated Risk' },
              { id: 'INCORRECT_MAPPING', label: 'Incorrect Evidence Mapping' },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setType(t.id as any)}
                className={`px-4 py-2.5 rounded-xl border text-[10px] font-black uppercase tracking-widest text-left transition-all ${type === t.id ? 'bg-black text-white border-black' : 'bg-gray-50 text-gray-400 border-gray-100 hover:border-gray-200'}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Technician Rationale</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Explain the divergence from observed behavior..."
            className="w-full h-24 p-4 rounded-2xl border border-gray-100 bg-gray-50 text-xs focus:ring-2 focus:ring-blue-100 outline-none resize-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-black text-white text-[10px] font-black uppercase tracking-widest hover:bg-gray-800 transition-all shadow-lg"
        >
          <Send className="w-3.5 h-3.5" /> Submit to Engine
        </button>
      </form>
    </div>
  );
};

export default ScoreFeedback;

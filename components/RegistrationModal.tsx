
import React, { useState } from 'react';
import { X, ChevronRight, CheckCircle2, Info, Flag, Database, User, Shield } from 'lucide-react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'model' | 'version';
  modelName?: string;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose, type, modelName }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  if (!isOpen) return null;

  const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="p-8 border-b border-gray-50 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Step {step} of {totalSteps}</span>
            </div>
            <h2 className="text-2xl font-black text-gray-900">
              {type === 'model' ? 'Register New Model' : `New Version for ${modelName}`}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 min-h-[400px]">
          {step === 1 && (
            <div className="space-y-6 animate-in slide-in-from-right-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Model Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Enterprise-Chat-Llama"
                  defaultValue={type === 'version' ? modelName : ''}
                  disabled={type === 'version'}
                  className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-100 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Description</label>
                <textarea 
                  rows={3}
                  placeholder="What is the purpose of this model?"
                  className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-100 outline-none transition-all resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Category</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white outline-none">
                    <option>NLP / LLM</option>
                    <option>Computer Vision</option>
                    <option>Predictive Analytics</option>
                    <option>Fraud Detection</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Version Tag</label>
                  <input type="text" placeholder="v1.0.0" className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white outline-none" />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in slide-in-from-right-4">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 border border-blue-100 text-blue-700">
                <Info className="w-5 h-5 shrink-0" />
                <p className="text-xs leading-relaxed font-medium">Ownership and governance details are required for automated assurance checks.</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Business Owner</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="email" placeholder="owner@company.com" className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white outline-none" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Governance Framework</label>
                <div className="flex flex-wrap gap-2">
                  {['EU AI Act', 'NIST AI RMF', 'ISO 42001', 'Internal Policy'].map(f => (
                    <button key={f} className="px-4 py-2 rounded-full border border-gray-100 text-xs font-bold text-gray-500 hover:border-green-200 hover:bg-green-50 transition-all">
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Data Sensitivity</label>
                <div className="grid grid-cols-3 gap-3">
                  {['Public', 'Internal', 'Confidential'].map(l => (
                    <button key={l} className="py-2.5 rounded-xl border border-gray-100 text-xs font-bold text-gray-500 hover:bg-gray-50">
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in slide-in-from-right-4">
              <div className="p-6 rounded-3xl border border-gray-100 bg-gray-50/50 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full signature-gradient flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Ready to Register</h3>
                <p className="text-sm text-gray-500 mt-2 max-w-sm">By registering this model, Green Flag AI will immediately initiate background scans for bias, drift, and security vulnerabilities.</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-gray-100">
                  <Shield className="w-5 h-5 text-green-500" />
                  <div className="flex-1">
                    <p className="text-xs font-bold text-gray-900">Automated Scan Enabled</p>
                    <p className="text-[10px] text-gray-400">Scan duration: ~2 minutes</p>
                  </div>
                  <div className="w-10 h-5 bg-green-500 rounded-full relative">
                    <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-gray-50 bg-gray-50/30 flex items-center justify-between">
          <button 
            onClick={step === 1 ? onClose : prevStep} 
            className="px-6 py-3 rounded-xl text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors"
          >
            {step === 1 ? 'Cancel' : 'Back'}
          </button>
          <button 
            onClick={step === totalSteps ? onClose : nextStep}
            className="flex items-center gap-2 px-8 py-3 rounded-xl signature-gradient text-white font-bold transition-all active:scale-[0.98]"
          >
            {step === totalSteps ? 'Complete Registration' : 'Next Step'}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;

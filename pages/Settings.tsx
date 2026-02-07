
import React, { useState } from 'react';
import { 
  User, 
  Building2, 
  Shield, 
  Bell, 
  Key, 
  Save, 
  LogOut, 
  Camera, 
  CheckCircle2, 
  Lock, 
  Mail, 
  Smartphone,
  ChevronRight,
  Globe,
  Trash2,
  Copy,
  Plus,
  X,
  RefreshCw,
  Check,
  CreditCard,
  Users,
  Slack,
  MessageSquare,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

const AVATAR_SEEDS = ['Felix', 'Sarah', 'James', 'Elena', 'Marcus', 'Alex', 'Riley', 'Morgan'];

const Settings: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'profile' | 'org' | 'security' | 'api' | 'notifications'>('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState<{show: boolean, msg: string, sub: string}>({ show: false, msg: '', sub: '' });
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [selectedAvatarSeed, setSelectedAvatarSeed] = useState('Felix');

  const triggerToast = (msg: string, sub: string) => {
    setShowToast({ show: true, msg, sub });
    setTimeout(() => setShowToast({ show: false, msg: '', sub: '' }), 3000);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      triggerToast('Configuration Synced', 'Changes applied to global provisioning cluster.');
    }, 1000);
  };

  const handleBillingAccess = () => {
    triggerToast('Accessing Billing Portal', 'Redirecting to secure payment gateway...');
  };

  const navItems = [
    { id: 'profile', label: 'Personal Profile', icon: User },
    { id: 'org', label: 'Organization', icon: Building2 },
    { id: 'security', label: 'Security & Access', icon: Shield },
    { id: 'api', label: 'API Management', icon: Key },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Settings</h2>
          <p className="text-sm text-gray-500 mt-1 uppercase tracking-widest font-bold">Manage personal preferences and organizational governance</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-black text-white text-[10px] font-black uppercase tracking-widest shadow-xl shadow-gray-200/50 hover:bg-gray-800 transition-all disabled:opacity-50"
        >
          {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {isSaving ? 'Syncing...' : 'Save Changes'}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Navigation Sidebar */}
        <div className="w-full lg:w-72 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id as any)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all border ${
                activeSection === item.id 
                  ? 'bg-white border-gray-100 shadow-xl shadow-gray-100/50 text-black font-black' 
                  : 'bg-transparent border-transparent text-gray-400 hover:text-gray-900'
              }`}
            >
              <item.icon className={`w-5 h-5 ${activeSection === item.id ? 'text-blue-500' : 'text-gray-300'}`} />
              <span className="text-xs uppercase tracking-widest">{item.label}</span>
            </button>
          ))}
          <div className="pt-6 mt-6 border-t border-gray-100">
             <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-red-400 hover:bg-red-50 transition-all group">
                <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                <span className="text-xs font-black uppercase tracking-widest">Terminate Session</span>
             </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 w-full bg-white rounded-[40px] border border-gray-100 shadow-2xl shadow-gray-200/10 overflow-hidden min-h-[600px]">
          <div className="p-10 space-y-12">
            
            {activeSection === 'profile' && (
              <div className="space-y-10 animate-in fade-in duration-500">
                <section className="space-y-6">
                  <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Identity Matrix</h3>
                  <div className="flex items-center gap-8">
                    <div 
                      className="relative group cursor-pointer"
                      onClick={() => setIsAvatarModalOpen(true)}
                    >
                      <img 
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedAvatarSeed}`} 
                        alt="Avatar" 
                        className="w-24 h-24 rounded-[32px] border-4 border-gray-50 shadow-sm group-hover:brightness-75 transition-all"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-blue-500 p-2 rounded-xl text-white shadow-lg border-2 border-white animate-bounce-slow">
                        <RefreshCw className="w-3 h-3" />
                      </div>
                    </div>
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Full Legal Name</p>
                        <input type="text" defaultValue="Felix Arvid" className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-100 outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all font-medium text-sm" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Verified Email</p>
                        <input type="email" defaultValue="felix@greenflag.ai" className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-100 outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all font-medium text-sm" />
                      </div>
                    </div>
                  </div>
                </section>

                <section className="space-y-6">
                  <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Technical Preferences</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-[24px] bg-gray-50 border border-gray-100">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Interface Mode</span>
                        <div className="flex p-1 bg-white rounded-lg border border-gray-100">
                          <button className="px-3 py-1 bg-gray-900 text-white rounded-md text-[9px] font-black uppercase">Light</button>
                          <button className="px-3 py-1 text-gray-400 rounded-md text-[9px] font-black uppercase">Dark</button>
                        </div>
                      </div>
                      <p className="text-[10px] text-gray-400 font-medium">Automatic system-level theme synchronization is currently enabled.</p>
                    </div>
                    <div className="p-6 rounded-[24px] bg-gray-50 border border-gray-100">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Language / Region</span>
                        <select className="bg-transparent text-xs font-bold outline-none cursor-pointer">
                          <option>English (Universal)</option>
                          <option>Deutsch (DACH)</option>
                          <option>Français</option>
                        </select>
                      </div>
                      <p className="text-[10px] text-gray-400 font-medium">Impacts timestamp formatting and regulatory compliance localization.</p>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {activeSection === 'org' && (
              <div className="space-y-10 animate-in fade-in duration-500">
                <section className="space-y-6">
                  <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Corporate Entity</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Organization Name</p>
                      <input type="text" defaultValue="Green Flag AI" className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-100 outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all font-medium text-sm" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Primary Domain</p>
                      <div className="relative">
                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                        <input type="text" defaultValue="greenflag.ai" className="w-full pl-11 pr-5 py-3 rounded-xl bg-gray-50 border border-gray-100 outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all font-medium text-sm" />
                      </div>
                    </div>
                  </div>
                </section>

                <section className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Team Stewardship</h3>
                    <button 
                      onClick={() => setIsInviteModalOpen(true)}
                      className="text-[10px] font-black text-blue-500 uppercase tracking-widest flex items-center gap-1 hover:text-blue-600 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" /> Invite Member
                    </button>
                  </div>
                  <div className="divide-y divide-gray-50 border border-gray-100 rounded-3xl overflow-hidden">
                    {[
                      { name: 'Sarah Chen', role: 'Compliance Lead', email: 'sarah@greenflag.ai', avatar: 'Sarah' },
                      { name: 'James Wilson', role: 'Security Architect', email: 'james@greenflag.ai', avatar: 'James' },
                      { name: 'Elena Rodriguez', role: 'Data Scientist', email: 'elena@greenflag.ai', avatar: 'Elena' },
                    ].map((member, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-4">
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.avatar}`} className="w-10 h-10 rounded-xl border border-gray-100" alt="" />
                          <div>
                            <p className="text-sm font-black text-gray-900">{member.name}</p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{member.role}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-gray-400 font-medium">{member.email}</p>
                          <button className="text-[10px] font-black text-gray-400 uppercase hover:text-black mt-1">Manage</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="p-8 rounded-[32px] bg-blue-50/30 border border-blue-100 flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-blue-100 flex items-center justify-center text-blue-500 shadow-sm">
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-blue-900 uppercase tracking-tight">Enterprise Provisioning</h4>
                      <p className="text-[11px] text-blue-700/60 font-medium leading-relaxed mt-1">Tier: Professional (12/20 Nodes active). Global assurance limit: 1.2M inferences/mo.</p>
                    </div>
                  </div>
                  <button 
                    onClick={handleBillingAccess}
                    className="px-6 py-2.5 rounded-xl bg-white border border-blue-200 text-blue-600 text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 transition-all flex items-center gap-2"
                  >
                    Billing Portal <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </section>
              </div>
            )}

            {activeSection === 'security' && (
              <div className="space-y-10 animate-in fade-in duration-500">
                <section className="space-y-6">
                  <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Access Control</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-6 rounded-[32px] bg-white border border-gray-100 group">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500">
                           <Smartphone className="w-6 h-6" />
                         </div>
                         <div>
                           <p className="text-sm font-black text-gray-900">Multi-Factor Authentication (MFA)</p>
                           <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Status: Active (TOTP)</p>
                         </div>
                      </div>
                      <button className="px-5 py-2 rounded-xl border border-gray-100 text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all">Configure</button>
                    </div>

                    <div className="flex items-center justify-between p-6 rounded-[32px] bg-white border border-gray-100 group">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-500">
                           <Globe className="w-6 h-6" />
                         </div>
                         <div>
                           <p className="text-sm font-black text-gray-900">Single Sign-On (SSO)</p>
                           <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Managed via Okta Enterprise</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-600 rounded-lg border border-green-100 text-[9px] font-black uppercase">
                        Verified
                      </div>
                    </div>
                  </div>
                </section>

                <section className="p-8 rounded-[32px] bg-red-50/50 border border-red-100 flex items-start gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-red-500 shrink-0 border border-red-100 shadow-sm">
                    <Trash2 className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-black text-red-900 uppercase tracking-tight">Danger Zone</h4>
                    <p className="text-[11px] text-red-700 font-medium leading-relaxed mt-1">Requesting account de-provisioning will purge all associated vector telemetry and assurance artifacts. This action is irreversible once authorized by the organization lead.</p>
                    <button className="mt-4 px-6 py-2 rounded-xl bg-red-500 text-white text-[10px] font-black uppercase tracking-widest hover:bg-red-600 transition-all shadow-lg shadow-red-200/50">Request Deletion</button>
                  </div>
                </section>
              </div>
            )}

            {activeSection === 'api' && (
              <div className="space-y-10 animate-in fade-in duration-500">
                <section className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Developer Access Tokens</h3>
                    <button className="text-[10px] font-black text-blue-500 uppercase tracking-widest flex items-center gap-1 hover:text-blue-600">
                      <Plus className="w-3.5 h-3.5" /> Provision New Key
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { name: 'Observability Sink Key', status: 'Active', lastUsed: '2 mins ago', key: 'gf_live_••••••••••••' },
                      { name: 'CI/CD Assurance Link', status: 'Active', lastUsed: '14 days ago', key: 'gf_test_••••••••••••' },
                    ].map((key, i) => (
                      <div key={i} className="p-6 rounded-[32px] bg-gray-50 border border-gray-100 flex items-center justify-between group hover:border-gray-200 transition-all">
                        <div className="flex items-center gap-5">
                          <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-400">
                             <Key className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-sm font-black text-gray-900">{key.name}</p>
                            <p className="text-[10px] font-mono text-gray-400 mt-1 uppercase tracking-widest">{key.key}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                             <p className={`text-[10px] font-black uppercase tracking-widest ${key.status === 'Active' ? 'text-green-500' : 'text-gray-400'}`}>{key.status}</p>
                             <p className="text-[9px] text-gray-400 font-bold uppercase mt-1">Used {key.lastUsed}</p>
                          </div>
                          <div className="flex gap-2">
                             <button className="p-2 rounded-lg bg-white border border-gray-100 text-gray-400 hover:text-black transition-all"><Copy className="w-4 h-4" /></button>
                             <button className="p-2 rounded-lg bg-white border border-gray-100 text-gray-400 hover:text-red-500 transition-all"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {activeSection === 'notifications' && (
              <div className="space-y-10 animate-in fade-in duration-500">
                <section className="space-y-6">
                  <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Communication Channels</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { icon: Mail, label: 'Email Alerts', status: 'Enabled', color: 'text-blue-500' },
                      { icon: Slack, label: 'Slack Sink', status: 'Active', color: 'text-purple-500' },
                      { icon: MessageSquare, label: 'In-App Comms', status: 'Minimal', color: 'text-green-500' },
                    ].map((channel, i) => (
                      <div key={i} className="p-6 rounded-[32px] bg-gray-50 border border-gray-100 flex flex-col items-center text-center group hover:border-gray-200 transition-all">
                         <div className={`w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-4 shadow-sm ${channel.color}`}>
                           <channel.icon className="w-6 h-6" />
                         </div>
                         <p className="text-sm font-black text-gray-900">{channel.label}</p>
                         <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">{channel.status}</p>
                         <button className="mt-4 text-[9px] font-black text-blue-500 uppercase tracking-widest">Configure</button>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="space-y-6">
                  <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Structural Alerts</h3>
                  <div className="space-y-3">
                    {[
                      { title: 'Critical Risk Drifts', desc: 'Notify when CRI exceeds established thresholds for production assets.', defaultChecked: true },
                      { title: 'New Compliance Artifacts', desc: 'Alert when a lead steward uploads new governance documentation.', defaultChecked: false },
                      { title: 'Provisioning Failures', desc: 'System-level alerts for failed inference cluster deployments.', defaultChecked: true },
                    ].map((alert, i) => (
                      <label key={i} className="flex items-center justify-between p-6 rounded-[32px] bg-white border border-gray-100 cursor-pointer hover:bg-gray-50 transition-all">
                        <div className="flex-1 pr-8">
                          <p className="text-sm font-black text-gray-900">{alert.title}</p>
                          <p className="text-[11px] text-gray-400 font-medium leading-relaxed mt-1">{alert.desc}</p>
                        </div>
                        <div className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked={alert.defaultChecked} className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                        </div>
                      </label>
                    ))}
                  </div>
                </section>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Avatar Selection Modal */}
      {isAvatarModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95">
            <div className="p-8 border-b border-gray-50 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Profile Configuration</span>
                <h2 className="text-xl font-black text-gray-900 mt-1 tracking-tight">Select Identifier Seed</h2>
              </div>
              <button onClick={() => setIsAvatarModalOpen(false)} className="p-3 rounded-full hover:bg-gray-50 transition-colors">
                <X className="w-6 h-6 text-gray-300" />
              </button>
            </div>
            <div className="p-10">
              <div className="grid grid-cols-4 gap-4">
                {AVATAR_SEEDS.map(seed => (
                  <button 
                    key={seed}
                    onClick={() => { setSelectedAvatarSeed(seed); setIsAvatarModalOpen(false); }}
                    className={`relative p-1 rounded-[24px] border-2 transition-all ${selectedAvatarSeed === seed ? 'border-blue-500' : 'border-transparent hover:border-gray-100'}`}
                  >
                    <img 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`} 
                      className="w-full h-full rounded-[22px]" 
                      alt="" 
                    />
                    {selectedAvatarSeed === seed && (
                      <div className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full p-1 border-2 border-white">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div className="p-8 border-t border-gray-50 bg-gray-50/50">
               <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center italic">Identifiers are generated dynamically via dicebear vector engine.</p>
            </div>
          </div>
        </div>
      )}

      {/* Invite Member Modal */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-xl rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95">
            <div className="p-8 border-b border-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gray-900 flex items-center justify-center text-blue-400">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Stewardship Expansion</span>
                  <h2 className="text-2xl font-black text-gray-900 mt-1 tracking-tight">Invite Team Member</h2>
                </div>
              </div>
              <button onClick={() => setIsInviteModalOpen(false)} className="p-3 rounded-full hover:bg-gray-50 transition-colors">
                <X className="w-6 h-6 text-gray-300" />
              </button>
            </div>
            <div className="p-10 space-y-8">
               <div className="p-5 rounded-3xl bg-blue-50/50 border border-blue-100 flex gap-4">
                  <ShieldCheck className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-blue-700 font-medium leading-relaxed">
                    New members will undergo automated background verification before gaining access to the <span className="font-black">Production Inference Topology</span>.
                  </p>
               </div>
               <div className="space-y-6">
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Member Email Address</p>
                    <input 
                      type="email" 
                      placeholder="teammate@organization.com"
                      className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none text-sm font-bold transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Assurance Role Mapping</p>
                    <select className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 outline-none font-black text-xs cursor-pointer">
                       <option>Technical Steward (Read/Write)</option>
                       <option>Governance Auditor (Read-Only)</option>
                       <option>Data Scientist (Limited Ingestion)</option>
                       <option>Executive Observer</option>
                    </select>
                  </div>
               </div>
            </div>
            <div className="p-8 border-t border-gray-50 bg-gray-50/30 flex items-center justify-between">
               <button 
                onClick={() => setIsInviteModalOpen(false)}
                className="px-6 py-3 rounded-xl text-sm font-black text-gray-400 uppercase tracking-widest hover:text-black transition-colors"
               >
                 Cancel
               </button>
               <button 
                onClick={() => { setIsInviteModalOpen(false); triggerToast('Invitation Dispatched', 'Verification link sent to recipient.'); }}
                className="px-10 py-4 rounded-2xl bg-black text-white text-[10px] font-black uppercase tracking-widest shadow-xl shadow-gray-200/50 hover:bg-gray-800 transition-all flex items-center gap-2"
               >
                 Dispatch Invite <ChevronRight className="w-4 h-4" />
               </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast.show && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[160] animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center gap-4 px-8 py-5 bg-gray-900 text-white rounded-[24px] shadow-2xl shadow-black/20 border border-white/10">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
               <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] leading-none">{showToast.msg}</p>
              <p className="text-[10px] text-gray-400 font-bold mt-1">{showToast.sub}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;

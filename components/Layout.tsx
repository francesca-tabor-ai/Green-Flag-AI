
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, CheckCircle2, ShieldAlert, FileText, Settings, Flag, Database, Share2, Rocket } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Overview', icon: LayoutDashboard },
    { path: '/registry', label: 'Model Registry', icon: Database },
    { path: '/assurance', label: 'Assurance Center', icon: CheckCircle2 },
    { path: '/release', label: 'Release Readiness', icon: Rocket },
    { path: '/observability', label: 'Observability', icon: ShieldAlert },
    { path: '/integrations', label: 'Integrations', icon: Share2 },
    { path: '/governance', label: 'Governance', icon: FileText },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-100 flex flex-col hidden md:flex shrink-0">
        <div className="p-8 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg signature-gradient flex items-center justify-center shadow-lg shadow-green-500/20 active:scale-95 transition-transform">
            <Flag className="w-5 h-5 text-white" />
          </div>
          <span className="font-black text-xl tracking-tighter">Green Flag <span className="text-gray-300">AI</span></span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 active:scale-95 ${
                isActive(item.path)
                  ? 'bg-gray-50 text-black font-black shadow-sm'
                  : 'text-gray-400 hover:text-black hover:bg-gray-50/50'
              }`}
            >
              <item.icon className={`w-5 h-5 transition-colors ${isActive(item.path) ? 'text-green-500' : 'text-gray-300'}`} />
              <span className="text-xs uppercase tracking-widest font-black">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <Link
            to="/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 font-black hover:text-black hover:bg-gray-50 transition-all duration-200 active:scale-95"
          >
            <Settings className="w-5 h-5 text-gray-300" />
            <span className="text-xs uppercase tracking-widest">Settings</span>
          </Link>
          <div className="mt-4 p-5 rounded-[24px] bg-gray-50 border border-gray-100 hover:border-gray-200 transition-colors">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Provisioning Status</p>
            <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden shadow-inner">
              <div className="bg-green-500 h-full w-2/3 transition-all duration-1000 ease-out"></div>
            </div>
            <p className="text-[10px] font-black text-gray-500 mt-2 tracking-tight">12/20 Nodes Operational</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-white relative">
        <header className="sticky top-0 z-40 glass-card h-16 border-b border-gray-100 flex items-center justify-between px-8">
          <h1 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em]">
            {navItems.find(i => isActive(i.path))?.label || 'Green Flag AI'}
          </h1>
          <div className="flex items-center gap-6">
            <button className="p-2 text-gray-400 hover:text-black transition-all hover:scale-110 active:scale-90 relative">
              <ShieldAlert className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
            </button>
            <Link to="/settings" className="flex items-center gap-3 group cursor-pointer transition-all active:scale-95">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-black text-gray-900 leading-none">Felix Arvid</p>
                <p className="text-[9px] font-bold text-gray-400 mt-1 uppercase tracking-widest">Tech Lead</p>
              </div>
              <div className="w-9 h-9 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden group-hover:border-blue-500 transition-colors transform duration-200 shadow-sm">
                <img loading="lazy" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" />
              </div>
            </Link>
          </div>
        </header>
        <div className="p-8 max-w-[1600px] mx-auto min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;

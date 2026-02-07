
import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';

// Helper component to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

// Lazy loaded page components
const Dashboard = lazy(() => import('./pages/Dashboard'));
const AssuranceCenter = lazy(() => import('./pages/AssuranceCenter'));
const ModelRegistry = lazy(() => import('./pages/ModelRegistry'));
const ModelDetail = lazy(() => import('./pages/ModelDetail'));
const Observability = lazy(() => import('./pages/Observability'));
const Integrations = lazy(() => import('./pages/Integrations'));
const ReleaseReadiness = lazy(() => import('./pages/ReleaseReadiness'));
const GovernanceRegistry = lazy(() => import('./pages/GovernanceRegistry'));
const Settings = lazy(() => import('./pages/Settings'));

// Loading Fallback
const LoadingFallback = () => (
  <div className="w-full h-[60vh] flex flex-col items-center justify-center space-y-4">
    <div className="w-16 h-1 w-64 bg-gray-100 rounded-full overflow-hidden relative">
      <div className="absolute inset-0 signature-gradient animate-loading w-1/2"></div>
    </div>
    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 animate-pulse">Syncing Assurance Data</p>
  </div>
);

const App: React.FC = () => {
  return (
    <Layout>
      <ScrollToTop />
      <Suspense fallback={<LoadingFallback />}>
        <div className="page-transition">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/registry" element={<ModelRegistry />} />
            <Route path="/registry/:modelId" element={<ModelDetail />} />
            <Route path="/assurance" element={<AssuranceCenter />} />
            <Route path="/release" element={<ReleaseReadiness />} />
            <Route path="/observability" element={<Observability />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/governance" element={<GovernanceRegistry />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </div>
      </Suspense>
    </Layout>
  );
};

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './src/contexts/AuthContext';
import Index from './src/pages/Index';
import Auth from './src/pages/Auth';
import Dashboard from './src/pages/Dashboard';
import NotFound from './src/pages/NotFound';
import Pricing from './components/src/pages/Pricing';
import Blog from './components/src/pages/src/pages/Blog';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
        <Route path="/pricing" element={<Pricing />} />
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster position="top-right" />
      </AuthProvider>
    </Router>
  );
}

export default App;
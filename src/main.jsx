import React, { lazy, Suspense, useCallback, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Check } from 'lucide-react';
import { useOpportunities } from './hooks/useOpportunities';
import { useTheme } from './hooks/useTheme';
import { useKeyboardShortcut } from './hooks/useKeyboardShortcut';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import OpportunitiesSection from './components/OpportunitiesSection';
import OpportunityModal from './components/OpportunityModal';
import CareerSection from './components/CareerSection';
import ServicesSection from './components/ServicesSection';
import AboutSection from './components/AboutSection';
import NewsletterSection from './components/NewsletterSection';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';

import './index.css';

// Code Splitting for heavy Admin Workspace Component
const AdminPanel = lazy(() => import('./components/AdminPanel'));

function App() {
  const { dark, toggleTheme } = useTheme();
  const {
    activeTab,
    setActiveTab,
    query,
    setQuery,
    activeFilterTag,
    setActiveFilterTag,
    savedIds,
    toggleSave,
    filteredItems,
    savedCount
  } = useOpportunities();

  const [authMode, setAuthMode] = useState(null); // 'login' | 'register' | null
  const [adminOpen, setAdminOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const toastTimerRef = useRef(null);

  const showToast = useCallback((msg) => {
    // Clear any existing timer to avoid stale updates
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToastMessage(msg);
    toastTimerRef.current = setTimeout(() => setToastMessage(''), 3200);
  }, []);

  const triggerSearchFocus = useCallback(() => {
    const input = document.getElementById('opportunity-search');
    if (input) {
      input.focus();
      input.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  // Keyboard Hotkeys (Cmd+K to search)
  useKeyboardShortcut({
    onCmdK: triggerSearchFocus
  });

  const handleExploreClick = () => {
    document.getElementById('opportunities')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleViewSaved = useCallback(() => {
    setActiveTab('Saved');
    document.getElementById('opportunities')?.scrollIntoView({ behavior: 'smooth' });
  }, [setActiveTab]);

  return (
    <div className={`app ${dark ? 'dark' : ''}`}>
      {/* Ambient background glows */}
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      {/* Accessibility Skip Link */}
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      {/* Navigation Header */}
      <Navbar
        dark={dark}
        toggleTheme={toggleTheme}
        onOpenAuth={(mode) => setAuthMode(mode)}
        onOpenAdmin={() => setAdminOpen(true)}
        onTriggerSearch={triggerSearchFocus}
        savedCount={savedCount}
        onViewSaved={handleViewSaved}
      />

      {/* Main Content Area */}
      <main id="main-content">
        <Hero
          onExplore={handleExploreClick}
          onSelectFeatured={() => setSelectedOpportunity(filteredItems[0])}
        />

        <Stats />

        <OpportunitiesSection
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          query={query}
          setQuery={setQuery}
          activeFilterTag={activeFilterTag}
          setActiveFilterTag={setActiveFilterTag}
          filteredItems={filteredItems}
          savedIds={savedIds}
          onToggleSave={toggleSave}
          onSelectOpportunity={(item) => setSelectedOpportunity(item)}
        />

        <CareerSection
          onJoinFree={() => setAuthMode('register')}
          onExploreStudio={() => {
            document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        <ServicesSection
          onContactStudio={() => {
            document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' });
            showToast('Ready to start your project? Drop your email below.');
          }}
        />

        <AboutSection />

        <NewsletterSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Opportunity Details Dialog */}
      <OpportunityModal
        opportunity={selectedOpportunity}
        isSaved={selectedOpportunity ? savedIds.includes(selectedOpportunity.id) : false}
        onToggleSave={toggleSave}
        onClose={() => setSelectedOpportunity(null)}
        onApply={() => {
          setSelectedOpportunity(null);
          setAuthMode('register');
          showToast('Create your free profile to complete your application.');
        }}
      />

      {/* Authentication Modal */}
      {authMode && (
        <AuthModal
          mode={authMode}
          onClose={() => setAuthMode(null)}
          onSuccess={showToast}
        />
      )}

      {/* Lazy Loaded Admin Panel */}
      {adminOpen && (
        <Suspense fallback={<div className="toast" role="status">Loading Admin Workspace...</div>}>
          <AdminPanel
            onClose={() => setAdminOpen(false)}
            onAction={showToast}
          />
        </Suspense>
      )}

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="toast" role="status" aria-live="polite">
          <Check size={18} className="accent-check" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);

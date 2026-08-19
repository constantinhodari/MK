import React, { lazy, Suspense, useCallback, useState } from 'react';
import { Check } from 'lucide-react';
import { createRoot } from 'react-dom/client';
import { useKeyboardShortcut } from './hooks/useKeyboardShortcut';
import { useOpportunities } from './hooks/useOpportunities';
import { useTheme } from './hooks/useTheme';
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
    showSavedOnly,
    setShowSavedOnly,
    savedIds,
    toggleSave,
    filteredItems,
  } = useOpportunities();

  const [authMode, setAuthMode] = useState(null);
  const [adminOpen, setAdminOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = useCallback((message) => {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(''), 3200);
  }, []);

  const triggerSearchFocus = useCallback(() => {
    const input = document.getElementById('opportunity-search');
    if (input) {
      input.focus({ preventScroll: true });
      input.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  const closeOverlays = useCallback(() => {
    setSelectedOpportunity(null);
    setAuthMode(null);
    setAdminOpen(false);
  }, []);

  useKeyboardShortcut({ onCmdK: triggerSearchFocus, onEscape: closeOverlays });

  const handleExploreClick = () => {
    document.getElementById('opportunities')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`app ${dark ? 'dark' : ''}`}>
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <a className="skip-link" href="#main-content">Skip to main content</a>

      <Navbar
        dark={dark}
        toggleTheme={toggleTheme}
        onOpenAuth={setAuthMode}
        onOpenAdmin={() => setAdminOpen(true)}
        onTriggerSearch={triggerSearchFocus}
        savedCount={savedIds.length}
        showSavedOnly={showSavedOnly}
        onToggleSaved={() => {
          setShowSavedOnly((current) => !current);
          document.getElementById('opportunities')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <main id="main-content">
        <Hero
          onExplore={handleExploreClick}
          onSelectFeatured={() => setSelectedOpportunity(filteredItems[0] ?? null)}
        />
        <Stats />
        <OpportunitiesSection
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          query={query}
          setQuery={setQuery}
          activeFilterTag={activeFilterTag}
          setActiveFilterTag={setActiveFilterTag}
          showSavedOnly={showSavedOnly}
          setShowSavedOnly={setShowSavedOnly}
          filteredItems={filteredItems}
          savedIds={savedIds}
          onToggleSave={toggleSave}
          onSelectOpportunity={setSelectedOpportunity}
        />
        <CareerSection
          onJoinFree={() => setAuthMode('register')}
          onExploreStudio={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
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

      <Footer />

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

      {authMode && <AuthModal mode={authMode} onClose={() => setAuthMode(null)} onSuccess={showToast} />}

      {adminOpen && (
        <Suspense fallback={<div className="toast" role="status">Loading admin workspace…</div>}>
          <AdminPanel onClose={() => setAdminOpen(false)} onAction={showToast} />
        </Suspense>
      )}

      {toastMessage && (
        <div className="toast" role="status" aria-live="polite">
          <Check size={18} className="accent-check" aria-hidden="true" />
          <span>{toastMessage}</span>
          <button type="button" className="toast-close" onClick={() => setToastMessage('')} aria-label="Dismiss notification">×</button>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);

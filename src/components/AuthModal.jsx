import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, Eye, EyeOff, Sparkles, X } from 'lucide-react';

export default function AuthModal({ mode, onClose, onSuccess }) {
  const [currentMode, setCurrentMode] = useState(mode || 'register');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const modalRef = useRef(null);

  const isRegister = currentMode === 'register';

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    const timer = setTimeout(() => {
      const closeBtn = modalRef.current?.querySelector('.modal-close');
      closeBtn?.focus();
    }, 50);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, [onClose]);

  // Password strength calculator
  const getPasswordStrength = (pwd) => {
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
    return score;
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onSuccess(
        isRegister
          ? 'Account created successfully! Welcome to Opportuna.'
          : 'Welcome back! Your personalized workspace is ready.'
      );
      onClose();
    }, 600);
  };

  return (
    <div
      className="modal-backdrop glass-backdrop"
      role="presentation"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <section
        ref={modalRef}
        className="auth-modal glass-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
      >
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close authentication dialog"
        >
          <X size={18} />
        </button>

        <div className="auth-brand">
          <span className="brand-mark">
            <Sparkles size={16} />
          </span>
          <span>
            opportuna<span className="brand-dot">.</span>
          </span>
        </div>

        <span className="kicker">{isRegister ? 'START YOUR JOURNEY' : 'WELCOME BACK'}</span>
        <h2 id="auth-title">
          {isRegister ? 'Your next chapter starts here.' : 'Pick up where you left off.'}
        </h2>
        <p className="auth-subtitle">
          {isRegister
            ? 'Create your free account and discover verified opportunities matched to your goals.'
            : 'Sign in to access your saved opportunities and personalized dashboard.'}
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          {isRegister && (
            <>
              <label htmlFor="auth-name">Full Name</label>
              <input
                id="auth-name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                required
                placeholder="Enter your full name"
              />
            </>
          )}

          <label htmlFor="auth-email">Email Address</label>
          <input
            id="auth-email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
            placeholder="you@example.com"
          />

          <label htmlFor="auth-password">Password</label>
          <div className="password-field">
            <input
              id="auth-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={isRegister ? 'new-password' : 'current-password'}
              minLength={8}
              required
              placeholder="Minimum 8 characters"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>

          {isRegister && password && (
            <div className="password-strength-bar">
              <div
                className={`strength-fill strength-${strength}`}
                style={{ width: `${(strength / 4) * 100}%` }}
              />
              <small>
                {strength <= 1 ? 'Weak' : strength === 2 ? 'Fair' : strength === 3 ? 'Good' : 'Strong'} password
              </small>
            </div>
          )}

          {isRegister && (
            <label className="check-row">
              <input type="checkbox" required />
              <span>I agree to the Terms of Service and Privacy Policy.</span>
            </label>
          )}

          <button className="btn auth-submit" type="submit" disabled={submitted}>
            {submitted ? (
              <>
                <Check size={17} /> Authenticating...
              </>
            ) : (
              <>
                <span>{isRegister ? 'Create free account' : 'Log in'}</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <button
          type="button"
          className="auth-switch"
          onClick={() => setCurrentMode(isRegister ? 'login' : 'register')}
        >
          {isRegister ? 'Already have an account? Log in' : 'New to Opportuna? Create account'}
        </button>
      </section>
    </div>
  );
}

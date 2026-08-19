import React, { useState } from 'react';
import { Check, Send } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
    }
  };

  return (
    <section className="newsletter section container" id="newsletter">
      <div className="newsletter-inner glass-panel">
        <div>
          <span className="kicker">STAY IN THE LOOP</span>
          <h2>
            Good things come
            <br />
            <em>to those who look.</em>
          </h2>
        </div>

        <div className="newsletter-form">
          {subscribed ? (
            <div className="subscribed glass-card" role="status">
              <Check size={18} className="accent-check" />
              <span>You’re on the list! Expect verified opportunities in your inbox every two weeks.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="newsletter-email">
                Your email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
              />
              <button className="btn" type="submit">
                <span>Get inspired</span>
                <Send size={16} />
              </button>
            </form>
          )}
          <small>One thoughtful digest every two weeks. Zero spam, unsubscribe anytime.</small>
        </div>
      </div>
    </section>
  );
}

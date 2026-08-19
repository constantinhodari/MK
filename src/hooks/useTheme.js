import { useEffect, useState } from 'react';

export function useTheme() {
  const [dark, setDark] = useState(() => {
    const stored = window.localStorage.getItem('opportuna-theme');
    if (stored !== null) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      window.localStorage.setItem('opportuna-theme', 'dark');
    } else {
      root.classList.remove('dark');
      window.localStorage.setItem('opportuna-theme', 'light');
    }
  }, [dark]);

  const toggleTheme = () => setDark((prev) => !prev);

  return { dark, toggleTheme, setDark };
}

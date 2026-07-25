import { useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  const toggle = () => {
    setDark(!dark);
    document.documentElement.classList.toggle('dark', !dark);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {dark ? <FiSun size={18} /> : <FiMoon size={18} />}
    </button>
  );
}

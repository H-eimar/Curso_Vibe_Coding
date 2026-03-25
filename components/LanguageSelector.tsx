'use client';

import { useTransition, useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { setLanguage } from '@/app/actions/language.actions';
import type { Locale } from '@/lib/i18n';

// We use flagcdn to provide SVG flags rather than emojis, 
// because Windows doesn't render flag emojis out of the box.
const LANGUAGES: { value: Locale; label: string; flagUrl: string }[] = [
  { value: 'es', label: 'ES', flagUrl: 'https://flagcdn.com/es.svg' },
  { value: 'en', label: 'EN', flagUrl: 'https://flagcdn.com/us.svg' },
  { value: 'fr', label: 'FR', flagUrl: 'https://flagcdn.com/fr.svg' },
];

export function LanguageSelector({ currentLocale }: { currentLocale: Locale }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (next: Locale) => {
    if (next === currentLocale) {
      setIsOpen(false);
      return;
    }
    
    setIsOpen(false);
    startTransition(async () => {
      await setLanguage(next);
      router.refresh();
    });
  };

  const currentLang = LANGUAGES.find((l) => l.value === currentLocale) || LANGUAGES[0];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className={`
          flex items-center justify-center gap-2
          w-auto px-2 h-9
          bg-transparent hover:bg-black/5
          text-nordic font-medium text-sm
          rounded-md
          transition-colors
          ${isPending ? 'opacity-50 cursor-wait' : ''}
        `}
      >
        <img 
          src={currentLang.flagUrl} 
          alt={`${currentLang.label} flag`} 
          className="w-4 h-3 rounded-[2px] object-cover" 
        />
        <span>{currentLang.label}</span>
        <span className="material-icons text-[18px]">expand_more</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-20 rounded-xl shadow-lg bg-[#333538] ring-1 ring-black ring-opacity-5 overflow-hidden z-20">
          <div className="py-1 flex flex-col items-stretch">
            {LANGUAGES.map(({ value, label, flagUrl }) => {
              const isActive = value === currentLocale;
              return (
                <button
                  key={value}
                  onClick={() => handleSelect(value)}
                  className={`
                    w-full text-left px-3 py-[8px] text-xs font-medium transition-colors
                    flex items-center gap-2
                    ${isActive ? 'text-white bg-white/10' : 'text-gray-300 hover:bg-white/10 hover:text-white'}
                  `}
                >
                  <img 
                    src={flagUrl} 
                    alt={`${label} flag`} 
                    className="w-4 h-3 rounded-[2px] object-cover" 
                  />
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import FiltersModal from './FiltersModal';

const Hero = () => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentType = searchParams.get('type') || 'All';
  const currentSearch = searchParams.get('search') || '';
  const [searchValue, setSearchValue] = useState(currentSearch);

  const handleTypeSelect = (type: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (type === 'All') {
      params.delete('type');
    } else {
      params.set('type', type);
    }
    params.delete('page');
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchValue.trim()) {
      params.set('search', searchValue.trim());
    } else {
      params.delete('search');
    }
    params.delete('page');
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-nordic leading-tight">
          Find your{' '}
          <span className="relative inline-block">
            <span className="relative z-10 font-medium">sanctuary</span>
            <span className="absolute bottom-2 left-0 w-full h-3 bg-mosque/20 -rotate-1 z-0"></span>
          </span>
          .
        </h1>

        <form onSubmit={handleSearchSubmit} className="relative group max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="material-icons text-nordic-muted text-2xl group-focus-within:text-mosque transition-colors font-material-icons">
              search
            </span>
          </div>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="block w-full pl-12 pr-4 py-4 rounded-xl border-none bg-white text-nordic shadow-soft placeholder-nordic-muted/60 focus:ring-2 focus:ring-mosque focus:bg-white transition-all text-lg"
            placeholder="Search by city, neighborhood, or address..."
          />
          <button type="submit" className="absolute inset-y-2 right-2 px-6 bg-mosque hover:bg-mosque/90 text-white font-medium rounded-lg transition-colors flex items-center justify-center shadow-lg shadow-mosque/20">
            Search
          </button>
        </form>

        <div className="flex items-center justify-center gap-3 overflow-x-auto hide-scroll py-2 px-4 -mx-4">
          {['All', 'House', 'Apartment', 'Villa', 'Penthouse'].map((type) => (
            <button
              key={type}
              onClick={() => handleTypeSelect(type)}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-transform transition-all ${
                currentType === type
                  ? 'bg-nordic text-white shadow-lg shadow-nordic/10 hover:-translate-y-0.5'
                  : 'bg-white border border-nordic/5 text-nordic-muted hover:text-nordic hover:border-mosque/50 hover:bg-mosque/5'
              }`}
            >
              {type}
            </button>
          ))}
          <div className="w-px h-6 bg-nordic/10 mx-2"></div>
          <button 
            onClick={() => setIsFiltersOpen(true)}
            className="whitespace-nowrap flex items-center gap-1 px-4 py-2 rounded-full text-nordic font-medium text-sm hover:bg-black/5 transition-colors"
          >
            <span className="material-icons text-base font-material-icons">
              tune
            </span>{' '}
            Filters
          </button>
        </div>
      </div>

      <FiltersModal isOpen={isFiltersOpen} onClose={() => setIsFiltersOpen(false)} />
    </section>
  );
};

export default Hero;

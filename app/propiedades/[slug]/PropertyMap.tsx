'use client';

import dynamic from 'next/dynamic';

// We dynamically import the actual Leaflet component to prevent SSR 'window is not defined' errors
const MapContent = dynamic(() => import('./MapContent'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-slate-100 text-nordic/40 font-medium">
      <span className="material-icons animate-pulse text-2xl mb-2 font-material-icons">map</span>
      <span className="sr-only">Cargando mapa...</span>
    </div>
  ),
});

interface PropertyMapProps {
  location: string;
}

export default function PropertyMap({ location }: PropertyMapProps) {
  return <MapContent location={location} />;
}

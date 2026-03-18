import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import PropertyMap from './PropertyMap';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: property, error } = await supabase
    .from('properties')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error in generateMetadata:', JSON.stringify(error, null, 2));
  }

  if (!property) {
    return {
      title: 'Property Not Found',
    };
  }

  return {
    title: `${property.title} | LuxeEstate`,
    description: property.description || `View details for ${property.title} located at ${property.location}.`,
    openGraph: {
      title: `${property.title} | LuxeEstate`,
      description: property.description || `Explore ${property.title} on LuxeEstate.`,
      images: [
        {
          url: property.image_urls?.[0] || '/placeholder.jpg',
          width: 1200,
          height: 630,
          alt: property.title,
        },
      ],
    },
  };
}

export default async function PropertyDetailsPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  console.log('Fetching property for slug:', slug);

  const { data: property, error } = await supabase
    .from('properties')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Supabase error fetching property:', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code
    });
  }

  if (!property) {
    console.log('Property not found for slug:', slug);
    notFound();
  }

  // Use the first 4 images safely, falling back to an empty array if undefined
  const images = property.image_urls || [];
  const mainImage = images[0] || '/placeholder.jpg';
  const galleryImages = images.slice(1, 4);

  return (
    <div className="bg-clear-day min-h-screen pb-20">
      {/* Simple navigation bar for inner pages */}
      <nav className="sticky top-0 z-50 bg-clear-day border-b border-mosque/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link href="/" className="flex-shrink-0 flex items-center gap-2 hover:opacity-80 transition-opacity">
              <span className="material-icons text-mosque text-3xl font-bold font-material-icons">villa</span>
              <span className="font-bold text-xl tracking-tight text-nordic">LuxeEstate</span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          {/* Left Column: Images */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Main Image */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl shadow-sm group">
              <Image 
                src={mainImage} 
                alt={property.title} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute top-4 left-4 flex gap-2">
                {property.is_featured && (
                  <span className="bg-mosque text-white text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">Premium</span>
                )}
                <span className="bg-white/90 backdrop-blur text-nordic text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">New</span>
              </div>
              <button className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-nordic px-4 py-2 rounded-lg text-sm font-medium shadow-lg backdrop-blur transition-all flex items-center gap-2">
                <span className="material-icons text-sm font-material-icons">grid_view</span>
                View All Photos
              </button>
            </div>

            {/* Gallery Thumbnails */}
            {galleryImages.length > 0 && (
              <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 snap-x">
                {galleryImages.map((img: string, idx: number) => (
                  <div key={idx} className="relative flex-none w-48 aspect-[4/3] rounded-lg overflow-hidden cursor-pointer opacity-70 hover:opacity-100 transition-opacity ring-mosque hover:ring-2 hover:ring-offset-2 hover:ring-offset-clear-day snap-start">
                    <Image src={img} alt={`Gallery image ${idx + 2}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Key Details & Map */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-28 space-y-6">
              
              {/* Pricing & Agent Header */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-mosque/5">
                <div className="mb-4">
                  <h1 className="text-4xl font-display font-light text-nordic mb-2">${property.price.toLocaleString()}</h1>
                  <p className="text-nordic/60 font-medium flex items-center gap-1">
                    <span className="material-icons text-mosque text-sm font-material-icons">location_on</span>
                    {property.location}
                  </p>
                </div>
                <div className="h-px bg-slate-100 my-6"></div>
                
                {/* Agent Profile Mock */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-sm">
                     <Image src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Agent" fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-nordic">Sarah Jenkins</h3>
                    <div className="flex items-center gap-1 text-xs text-mosque font-medium">
                      <span className="material-icons text-[14px] font-material-icons">star</span>
                      <span>Top Rated Agent</span>
                    </div>
                  </div>
                  <div className="ml-auto flex gap-2">
                    <button className="p-2 rounded-full bg-mosque/10 text-mosque hover:bg-mosque hover:text-white transition-colors">
                      <span className="material-icons text-sm font-material-icons">chat</span>
                    </button>
                    <button className="p-2 rounded-full bg-mosque/10 text-mosque hover:bg-mosque hover:text-white transition-colors">
                      <span className="material-icons text-sm font-material-icons">call</span>
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <button className="w-full bg-mosque hover:bg-primary-hover text-white py-4 px-6 rounded-lg font-medium transition-all shadow-lg shadow-mosque/20 flex items-center justify-center gap-2 group">
                    <span className="material-icons text-xl group-hover:scale-110 transition-transform font-material-icons">calendar_today</span>
                    Schedule Visit
                  </button>
                  <button className="w-full bg-transparent border border-nordic/10 hover:border-mosque text-nordic/80 hover:text-mosque py-4 px-6 rounded-lg font-medium transition-all flex items-center justify-center gap-2">
                    <span className="material-icons text-xl font-material-icons">mail_outline</span>
                    Contact Agent
                  </button>
                </div>
              </div>

              {/* Map Preview Container */}
              <div className="bg-white p-2 rounded-xl shadow-sm border border-mosque/5">
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-slate-100">
                  <PropertyMap location={property.location} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Detailed Sections */}
        <div className="lg:col-span-8 lg:row-start-2 -mt-8 space-y-8 lg:pr-[35%]">
          
          {/* Features Grid */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-mosque/5">
            <h2 className="text-lg font-semibold mb-6 text-nordic">Property Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex flex-col items-center justify-center p-4 bg-mosque/5 rounded-lg border border-mosque/10">
                <span className="material-icons text-mosque text-2xl mb-2 font-material-icons">square_foot</span>
                <span className="text-xl font-bold text-nordic">{property.area}</span>
                <span className="text-xs uppercase tracking-wider text-nordic/50">Square Meters</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-mosque/5 rounded-lg border border-mosque/10">
                <span className="material-icons text-mosque text-2xl mb-2 font-material-icons">bed</span>
                <span className="text-xl font-bold text-nordic">{property.bedrooms}</span>
                <span className="text-xs uppercase tracking-wider text-nordic/50">Bedrooms</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-mosque/5 rounded-lg border border-mosque/10">
                <span className="material-icons text-mosque text-2xl mb-2 font-material-icons">shower</span>
                <span className="text-xl font-bold text-nordic">{property.bathrooms}</span>
                <span className="text-xs uppercase tracking-wider text-nordic/50">Bathrooms</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-mosque/5 rounded-lg border border-mosque/10">
                <span className="material-icons text-mosque text-2xl mb-2 font-material-icons">directions_car</span>
                <span className="text-xl font-bold text-nordic">2</span>
                <span className="text-xs uppercase tracking-wider text-nordic/50">Garage</span>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-mosque/5">
            <h2 className="text-lg font-semibold mb-4 text-nordic">About this home</h2>
            <div className="prose prose-slate max-w-none text-nordic/70 leading-relaxed">
              <p className="whitespace-pre-wrap">{property.description}</p>
            </div>
          </div>

          {/* Amenities Mock */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-mosque/5">
            <h2 className="text-lg font-semibold mb-6 text-nordic">Amenities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
              {['Smart Home System', 'Swimming Pool', 'Central Heating & Cooling', 'Electric Vehicle Charging', 'Private Gym', 'Wine Cellar'].map((amenity) => (
                <div key={amenity} className="flex items-center gap-3 text-nordic/70">
                  <span className="material-icons text-mosque/60 text-sm font-material-icons">check_circle</span>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mortgage Calc Mock */}
          <div className="bg-mosque/5 p-6 rounded-xl border border-mosque/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-full text-mosque shadow-sm">
                <span className="material-icons font-material-icons">calculate</span>
              </div>
              <div>
                <h3 className="font-semibold text-nordic">Estimated Payment</h3>
                <p className="text-sm text-nordic/60">Starting from <strong className="text-mosque">$5,430/mo</strong> with 20% down</p>
              </div>
            </div>
            <button className="whitespace-nowrap px-4 py-2 bg-white border border-nordic/10 rounded-lg text-sm font-semibold hover:border-mosque transition-colors text-nordic">
              Calculate Mortgage
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

import Link from 'next/link';
import { Collection } from '@/data/mockData';
import CollectionCard from './ui/CollectionCard';
import { createClient } from '@/lib/supabase/server';

const FeaturedCollection = async () => {
  const supabase = await createClient();

  const { data: properties } = await supabase
    .from('properties')
    .select('*')
    .eq('is_featured', true)
    .limit(2);

  const collections: Collection[] = (properties ?? []).map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    location: p.location,
    price: p.price,
    imagenes: p.image_urls || ['/placeholder.jpg'],
    beds: p.bedrooms,
    baths: p.bathrooms,
    sqft: p.area,
    tag: 'Destacado',
  }));

  return (
    <section className="mb-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl font-light text-nordic">
            Featured Collections
          </h2>
          <p className="text-nordic-muted mt-1 text-sm">
            Curated properties for the discerning eye.
          </p>
        </div>
        <Link
          href="#"
          className="hidden sm:flex items-center gap-1 text-sm font-medium text-mosque hover:opacity-70 transition-opacity"
        >
          View all{' '}
          <span className="material-icons text-sm font-material-icons">
            arrow_forward
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {collections.length > 0 ? (
          collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))
        ) : (
          <p className="text-nordic-muted text-sm col-span-2">
            No featured properties available.
          </p>
        )}
      </div>
    </section>
  );
};

export default FeaturedCollection;


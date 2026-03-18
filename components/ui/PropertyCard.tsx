import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/types/property';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-mosque/5 group flex flex-col h-full">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.image_urls?.[0] || '/placeholder.jpg'}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Favorite Button */}
        <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-mosque hover:text-white transition-colors text-nordic z-10">
          <span className="material-icons text-lg font-material-icons">
            favorite_border
          </span>
        </button>

        {/* For Sale badge */}
        <div className="absolute bottom-3 left-3 text-white text-xs font-bold px-2 py-1 rounded bg-nordic/90">
          FOR SALE
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col grow">
        <div className="flex justify-between items-baseline mb-2">
          <h3 className="font-bold text-lg text-nordic">
            ${property.price.toLocaleString()}
          </h3>
        </div>

        <h4 className="text-nordic font-medium truncate mb-1">
          {property.title}
        </h4>
        <p className="text-nordic-muted text-xs mb-4">{property.location}</p>

        {/* Footer Features */}
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1 text-nordic-muted text-xs">
            <span className="material-icons text-sm text-mosque/80 font-material-icons">
              king_bed
            </span>{' '}
            {property.bedrooms}
          </div>
          <div className="flex items-center gap-1 text-nordic-muted text-xs">
            <span className="material-icons text-sm text-mosque/80 font-material-icons">
              bathtub
            </span>{' '}
            {property.bathrooms}
          </div>
          <div className="flex items-center gap-1 text-nordic-muted text-xs">
            <span className="material-icons text-sm text-mosque/80 font-material-icons">
              square_foot
            </span>{' '}
            {property.area}m²
          </div>
        </div>
        {/* Details Button */}
        <Link
          href={`/propiedades/${property.slug}`}
          className="block w-full text-center bg-mosque/5 hover:bg-mosque text-mosque hover:text-white py-3 rounded-xl font-medium transition-colors mt-4"
        >
          Ver Detalles
        </Link>
      </div>
    </article>
  );
};

export default PropertyCard;


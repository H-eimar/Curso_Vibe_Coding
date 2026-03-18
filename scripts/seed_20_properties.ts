import { createClient } from '@supabase/supabase-js';

// dotenv no es estrictamente necesario si usamos tsx o cargamos con env_file, pero lo leemos de manera simple por si acaso.
import * as fs from 'fs';
import * as path from 'path';

try {
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, 'utf8');
    envFile.split('\n').forEach(line => {
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim().replace(/^['"]|['"]$/g, '');
        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    });
  }
} catch (e) {}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const generateSlug = (title: string) => {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Math.floor(Math.random() * 10000);
};

const locations = [
  'Miami, FL', 'Los Angeles, CA', 'New York, NY', 'Austin, TX', 'Aspen, CO',
  'Beverly Hills, CA', 'San Francisco, CA', 'Seattle, WA', 'Chicago, IL', 'Honolulu, HI'
];

const adjectives = ['Luxury', 'Modern', 'Classic', 'Elegant', 'Spacious', 'Stunning', 'Beautiful', 'Exclusive', 'Panoramic', 'Contemporary'];
const nouns = ['Villa', 'Penthouse', 'Estate', 'Mansion', 'Apartment', 'Residence', 'Townhouse', 'Retreat', 'Oasis', 'Loft'];

const images = [
  'https://images.unsplash.com/photo-1613490900233-08b58404526d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
];

const newProperties = Array.from({ length: 20 }).map((_, i) => {
  const is_featured = Math.random() > 0.7;
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const title = `${adj} ${noun} with Views`;
  
  const randImages = [];
  for (let j = 0; j < 4; j++) {
    randImages.push(images[Math.floor(Math.random() * images.length)]);
  }

  return {
    title,
    slug: generateSlug(title),
    location: locations[Math.floor(Math.random() * locations.length)],
    price: Math.floor(Math.random() * 8000000) + 500000,
    bedrooms: Math.floor(Math.random() * 6) + 2,
    bathrooms: Math.floor(Math.random() * 5) + 2,
    area: Math.floor(Math.random() * 8000) + 1000,
    description: `Discover this incredible ${title.toLowerCase()} nestled in one of the most sought-after neighborhoods. Featuring unparalleled design, high-end finishes throughout, and breathtaking panoramas. A masterpiece of modern architecture offering both privacy and prestige. Ensure your sanctuary awaits.`,
    is_featured,
    image_urls: randImages,
  };
});

async function run() {
  console.log('Inserting properties...');
  const { data, error } = await supabase.from('properties').insert(newProperties).select();

  if (error) {
    console.error('Error inserting properties:', error);
  } else {
    console.log(`Successfully inserted ${data.length} properties.`);
  }
}

run();

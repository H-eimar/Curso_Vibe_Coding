const fs = require('fs');

const generateSlug = (title) => {
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

let sql = "INSERT INTO properties (title, slug, location, price, bedrooms, bathrooms, area, description, is_featured, image_urls) VALUES\n";

for (let i = 0; i < 20; i++) {
  const is_featured = Math.random() > 0.7;
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const title = `${adj} ${noun} with Views`;
  
  const randImages = [];
  for (let j = 0; j < 4; j++) {
    randImages.push(images[Math.floor(Math.random() * images.length)]);
  }

  const slug = generateSlug(title);
  const location = locations[Math.floor(Math.random() * locations.length)];
  const price = Math.floor(Math.random() * 8000000) + 500000;
  const bedrooms = Math.floor(Math.random() * 6) + 2;
  const bathrooms = Math.floor(Math.random() * 5) + 2;
  const area = Math.floor(Math.random() * 8000) + 1000;
  const description = `Discover this incredible ${title.toLowerCase()} nestled in one of the most sought-after neighborhoods. Featuring unparalleled design, high-end finishes throughout, and breathtaking panoramas. A masterpiece of modern architecture offering both privacy and prestige. Ensure your sanctuary awaits.`;
  
  const imgStr = `ARRAY['${randImages.join("','")}']`;
  sql += `('${title}', '${slug}', '${location}', ${price}, ${bedrooms}, ${bathrooms}, ${area}, '${description}', ${is_featured ? 'true' : 'false'}, ${imgStr})${i < 19 ? ',' : ';'}\n`;
}

fs.writeFileSync('seed_20.sql', sql);
console.log('SQL generated.');

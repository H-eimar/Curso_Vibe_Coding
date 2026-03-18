import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedCollection from '@/components/FeaturedCollection';
import NewInMarket from '@/components/NewInMarket';
import { createClient } from '@/lib/supabase/server';

const PAGE_SIZE = 8;

interface HomePageProps {
  searchParams: Promise<{ page?: string; type?: string; search?: string }>;
}

export default async function Home({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const page = params.page;
  const typeFilter = params.type;
  const searchFilter = params.search;
  
  const isFiltering = !!typeFilter || !!searchFilter;

  const currentPage = Math.max(1, parseInt(page ?? '1', 10));
  const from = (currentPage - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const supabase = await createClient();

  let query = supabase
    .from('properties')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to);
    
  if (typeFilter) {
    // Busca la coincidencia ignorando mayúsculas. Por ej 'Villa' coincidirá con 'Luxury Villa'
    query = query.ilike('title', `%${typeFilter}%`);
  }

  if (searchFilter) {
    // Busca coincidencias de texto tanto en el titulo como en la ubicacion
    query = query.or(`title.ilike.%${searchFilter}%,location.ilike.%${searchFilter}%`);
  }

  const { data: properties, count } = await query;

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <Hero />
        {!isFiltering && <FeaturedCollection />}
        <NewInMarket
          properties={properties ?? []}
          totalCount={count ?? 0}
          currentPage={currentPage}
          pageSize={PAGE_SIZE}
        />
      </main>
    </>
  );
}

export default function Loading() {
  return (
    <div className="bg-clear-day min-h-screen pb-20 animate-pulse">
      {/* Simple navigation bar skeleton */}
      <nav className="sticky top-0 z-50 bg-clear-day border-b border-mosque/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-200"></div>
              <div className="w-24 h-6 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          {/* Left Column Skeleton */}
          <div className="lg:col-span-8 space-y-4">
            <div className="w-full aspect-[16/10] bg-slate-200 rounded-xl"></div>
            <div className="flex gap-4 overflow-x-hidden">
               <div className="w-48 aspect-[4/3] bg-slate-200 rounded-lg"></div>
               <div className="w-48 aspect-[4/3] bg-slate-200 rounded-lg"></div>
               <div className="w-48 aspect-[4/3] bg-slate-200 rounded-lg"></div>
            </div>
          </div>

          {/* Right Column Skeleton */}
          <div className="lg:col-span-4 relative">
             <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-mosque/5">
                   <div className="h-10 w-3/4 bg-slate-200 rounded mb-4"></div>
                   <div className="h-4 w-1/2 bg-slate-200 rounded"></div>
                   <div className="h-px bg-slate-100 my-6"></div>
                   <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-full bg-slate-200"></div>
                      <div className="space-y-2 flex-grow">
                         <div className="h-4 w-1/2 bg-slate-200 rounded"></div>
                         <div className="h-3 w-1/3 bg-slate-200 rounded"></div>
                      </div>
                   </div>
                   <div className="space-y-3">
                      <div className="h-14 w-full bg-slate-200 rounded-lg"></div>
                      <div className="h-14 w-full bg-slate-200 rounded-lg"></div>
                   </div>
                </div>
                <div className="bg-white p-2 rounded-xl shadow-sm border border-mosque/5 h-48">
                    <div className="w-full h-full bg-slate-200 rounded-lg"></div>
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}

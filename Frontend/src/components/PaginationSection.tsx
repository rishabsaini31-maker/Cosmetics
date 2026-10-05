'use client';

interface PaginationSectionProps {
  totalItems: number;
  visibleItemsCount: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onLoadMore: () => void;
  hasMore: boolean;
  itemLabel?: string;
}

export default function PaginationSection({
  totalItems,
  visibleItemsCount,
  currentPage,
  totalPages,
  onPageChange,
  onLoadMore,
  hasMore,
  itemLabel = 'CREATIONS',
}: PaginationSectionProps) {
  if (totalItems === 0) return null;

  const percentage = Math.min(Math.round((visibleItemsCount / totalItems) * 100), 100);

  // Generate page numbers for display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }
      
      if (currentPage < totalPages - 2) pages.push('...');
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="w-full py-space-xl my-space-xl flex flex-col items-center justify-center border-t border-surface-container-high/60">
      <div className="w-full max-w-md mx-auto px-4">
        {/* Progress header info */}
        <div className="flex items-center justify-between font-label-caps text-xs tracking-[0.15em] text-on-surface-variant uppercase mb-2">
          <span>
            DISPLAYING {visibleItemsCount} OF {totalItems} {itemLabel}
          </span>
          <span className="font-semibold text-primary">{percentage}%</span>
        </div>

        {/* Progress bar track */}
        <div className="w-full h-[2px] bg-surface-container-high overflow-hidden rounded-full mb- space-md">
          <div
            className="h-full bg-[#705d38] transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Button & Pagination row */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-6">
        {/* Load More Button */}
        {hasMore ? (
          <button
            type="button"
            onClick={onLoadMore}
            className="bg-[#1b1c1a] text-white px-8 py-3.5 font-label-caps text-xs uppercase tracking-[0.2em] font-medium hover:bg-black/80 transition-colors shadow-sm active:scale-[0.99]"
          >
            LOAD MORE PRODUCTS
          </button>
        ) : (
          <button
            type="button"
            disabled
            className="bg-surface-container-high text-on-surface-variant/60 px-8 py-3.5 font-label-caps text-xs uppercase tracking-[0.2em] cursor-default"
          >
            ALL CREATIONS LOADED
          </button>
        )}

        {/* Page Number Controls */}
        {totalPages > 1 && (
          <div className="flex items-center gap-1.5 font-label-caps text-xs">
            {getPageNumbers().map((p, idx) => {
              if (p === '...') {
                return (
                  <span key={`dots-${idx}`} className="w-8 text-center text-on-surface-variant/50 tracking-widest">
                    ...
                  </span>
                );
              }
              const pageNum = p as number;
              const isActive = pageNum === currentPage;

              return (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => onPageChange(pageNum)}
                  className={`w-9 h-9 flex items-center justify-center transition-all ${
                    isActive
                      ? 'bg-white text-primary border border-surface-container-high shadow-sm font-semibold'
                      : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            {/* Next page arrow */}
            {currentPage < totalPages && (
              <button
                type="button"
                onClick={() => onPageChange(currentPage + 1)}
                className="w-9 h-9 flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors"
                aria-label="Next page"
              >
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Button } from '../Button';

/**
 * Pagination component.
 * Responsive pagination with page numbers and navigation.
 */

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingsCount?: number;
  className?: string;
}

const DOTS = 'dots';

function generatePagination(
  currentPage: number,
  totalPages: number,
  siblingsCount: number
): (number | typeof DOTS)[] {
  const totalPageNumbers = siblingsCount * 2 + 5; // siblings + first + last + current + 2 dots

  // Case 1: All pages fit
  if (totalPages <= totalPageNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingsCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingsCount, totalPages);

  const showLeftDots = leftSiblingIndex > 2;
  const showRightDots = rightSiblingIndex < totalPages - 1;

  // Case 2: No left dots
  if (!showLeftDots && showRightDots) {
    const leftRange = Array.from({ length: siblingsCount * 2 + 3 }, (_, i) => i + 1);
    return [...leftRange, DOTS, totalPages];
  }

  // Case 3: No right dots
  if (showLeftDots && !showRightDots) {
    const rightRange = Array.from(
      { length: siblingsCount * 2 + 3 },
      (_, i) => totalPages - (siblingsCount * 2 + 2) + i
    );
    return [1, DOTS, ...rightRange];
  }

  // Case 4: Both dots
  const middleRange = Array.from(
    { length: rightSiblingIndex - leftSiblingIndex + 1 },
    (_, i) => leftSiblingIndex + i
  );
  return [1, DOTS, ...middleRange, DOTS, totalPages];
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingsCount = 1,
  className,
}: PaginationProps) {
  const pages = useMemo(
    () => generatePagination(currentPage, totalPages, siblingsCount),
    [currentPage, totalPages, siblingsCount]
  );

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className={cn('flex items-center justify-center gap-1', className)}
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {pages.map((page, index) => {
        if (page === DOTS) {
          return (
            <span key={`dots-${index}`} className="px-2 text-neutral-400" aria-hidden>
              <MoreHorizontal className="h-4 w-4" />
            </span>
          );
        }

        return (
          <Button
            key={page}
            variant={currentPage === page ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => onPageChange(page)}
            aria-label={`Page ${page}`}
            aria-current={currentPage === page ? 'page' : undefined}
            className="min-w-[2rem]"
          >
            {page}
          </Button>
        );
      })}

      <Button
        variant="ghost"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  );
}

// ─────────────────────────────────────────
// Pagination Info (shows "Showing X-Y of Z")
// ─────────────────────────────────────────

interface PaginationInfoProps {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  className?: string;
}

export function PaginationInfo({
  currentPage,
  pageSize,
  totalItems,
  className,
}: PaginationInfoProps) {
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  if (totalItems === 0) {
    return <p className={cn('text-sm text-neutral-500', className)}>No results</p>;
  }

  return (
    <p className={cn('text-sm text-neutral-500', className)}>
      Showing <span className="font-medium text-neutral-700">{start}</span> to{' '}
      <span className="font-medium text-neutral-700">{end}</span> of{' '}
      <span className="font-medium text-neutral-700">{totalItems}</span> results
    </p>
  );
}

// ─────────────────────────────────────────
// Pagination Container (combines info + pagination)
// ─────────────────────────────────────────

interface PaginationContainerProps extends PaginationProps {
  pageSize: number;
  totalItems: number;
}

export function PaginationContainer({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  siblingsCount,
  className,
}: PaginationContainerProps) {
  return (
    <div className={cn('flex items-center justify-between', className)}>
      <PaginationInfo currentPage={currentPage} pageSize={pageSize} totalItems={totalItems} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        siblingsCount={siblingsCount}
      />
    </div>
  );
}

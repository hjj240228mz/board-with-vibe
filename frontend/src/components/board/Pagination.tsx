import React from 'react';
import { usePagination } from '../../hooks/usePagination';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const { pageNumbers, hasNextGroup, hasPrevGroup, getNextGroupPage, getPrevGroupPage } =
    usePagination({ totalPages, currentPage });

  if (totalPages === 0) return null;

  return (
    <div className="pagination">
      {hasPrevGroup && (
        <button onClick={() => onPageChange(getPrevGroupPage())} className="page-btn">
          이전
        </button>
      )}

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`page-btn ${currentPage === page ? 'active' : ''}`}
        >
          {page + 1}
        </button>
      ))}

      {hasNextGroup && (
        <button onClick={() => onPageChange(getNextGroupPage())} className="page-btn">
          다음
        </button>
      )}
    </div>
  );
};

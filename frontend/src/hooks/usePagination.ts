import { useState, useEffect } from 'react';

interface UsePaginationProps {
  totalPages: number;
  currentPage: number;
}

export const usePagination = ({ totalPages, currentPage }: UsePaginationProps) => {
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);

  useEffect(() => {
    const calculatePageNumbers = () => {
      const pages: number[] = [];
      const maxPagesToShow = 10;

      if (totalPages <= maxPagesToShow) {
        for (let i = 0; i < totalPages; i++) {
          pages.push(i);
        }
      } else {
        const startPage = Math.floor(currentPage / maxPagesToShow) * maxPagesToShow;
        const endPage = Math.min(startPage + maxPagesToShow, totalPages);

        for (let i = startPage; i < endPage; i++) {
          pages.push(i);
        }
      }

      return pages;
    };

    setPageNumbers(calculatePageNumbers());
  }, [totalPages, currentPage]);

  const hasNextGroup = () => {
    const maxPagesToShow = 10;
    const currentGroup = Math.floor(currentPage / maxPagesToShow);
    const totalGroups = Math.ceil(totalPages / maxPagesToShow);
    return currentGroup < totalGroups - 1;
  };

  const hasPrevGroup = () => {
    const maxPagesToShow = 10;
    return Math.floor(currentPage / maxPagesToShow) > 0;
  };

  const getNextGroupPage = () => {
    const maxPagesToShow = 10;
    const currentGroup = Math.floor(currentPage / maxPagesToShow);
    return (currentGroup + 1) * maxPagesToShow;
  };

  const getPrevGroupPage = () => {
    const maxPagesToShow = 10;
    const currentGroup = Math.floor(currentPage / maxPagesToShow);
    return (currentGroup - 1) * maxPagesToShow;
  };

  return {
    pageNumbers,
    hasNextGroup: hasNextGroup(),
    hasPrevGroup: hasPrevGroup(),
    getNextGroupPage,
    getPrevGroupPage,
  };
};

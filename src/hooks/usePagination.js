import { useMemo } from 'react';

const usePagination = ({ currentPage, lastPage, totalButtons }) => {
  const calculateVisiblePages = () => {
    let startPage, endPage;

    if (lastPage <= totalButtons) {
      startPage = 1;
      endPage = lastPage;
    } else {
      const leftSiblingIndex = Math.max(currentPage - Math.floor(totalButtons / 2), 1);
      const rightSiblingIndex = Math.min(currentPage + Math.floor(totalButtons / 2), lastPage);

      startPage = Math.max(rightSiblingIndex - totalButtons + 1, 1);
      endPage = Math.min(startPage + totalButtons - 1, lastPage);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  };

  return useMemo(() => calculateVisiblePages(), [currentPage, lastPage, totalButtons]);
};

export default usePagination;

// export const usePagination = ({
//     totalPages,
//     pageSize,
//     siblingCount,
//     currentPage,
//     totalPageCount
//   }) => {
//     const paginationRange = useMemo(() => {
      
  
//       // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
//       const totalPageNumbers = siblingCount + 3;
  
//       /*
//         Case 1:
//         If the number of pages is less than the page numbers we want to show in our
//         paginationComponent, we return the range [1..totalPageCount]
//       */
//       if (totalPageNumbers >= totalPageCount) {
//         return range(1, totalPageCount);
//       }
      
//       /*
//           Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
//       */
//       const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
//       const rightSiblingIndex = Math.min(
//         currentPage + siblingCount,
//         totalPageCount
//       );
  
//       /*
//         We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
//       */

     
//         let middleRange = range(leftSiblingIndex, rightSiblingIndex);
//         return [ ...middleRange];
      
//     }, [totalCount, pageSize, siblingCount, currentPage]);
  
//     return paginationRange;
//   };
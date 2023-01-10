import React from 'react';
import { getPagesArray } from '../../utils/page';

const MyPagination = ({totalPages, page, changePage}) => {
  let pagesArray = getPagesArray(totalPages)
    return (
      <div className='page-wrapper'>
        {pagesArray.map(p => 
         <span
           onClick={() => changePage(p)}
           key={p} 
           className={page === p ? 'page current-page' : 'page'}>
           {p}
         </span>
       )}
      </div>
    );
};

export default MyPagination;
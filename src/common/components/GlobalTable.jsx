import React, {useState, useMemo} from 'react';
import Pagination from './Pagination';
import './style/Pagination.scss'


const GlobalTable = ({
  columns, 
  data, 
  limit, 
  currentPage, 
  setCurrentPage
}) => {
  let PageSize = limit ?? 10;

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data?.slice(firstPageIndex, lastPageIndex);
  }, [data, currentPage, limit]);

  return (
    <>
    <table>
      <thead>
        <tr>
          {columns?.map(({ttl}, index) => <th key={index}>{ttl}</th>)}
        </tr>
      </thead>
      <tbody>
        {currentTableData?.map(({ author, title, published, isbn }, index) => (
          <tr key={isbn + index}>
            <td>{title}</td>
            <td>{author}</td>
            <td>{published}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <div>
      <span className='TotalRecords'>Total Records: {data?.length}</span>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={data?.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
    </div>
    </>
  )
};

export default GlobalTable
import React from 'react'

const GlobalTable = ({columns, data}) => (
  <table>
    <thead>
      <tr>
        {columns?.map(({ttl}, index) => <th key={index}>{ttl}</th>)}
      </tr>
    </thead>
    <tbody>
      {data?.map(({ author, title, published, isbn }, index) => (
        <tr key={isbn + index}>
          <td>{title}</td>
          <td>{author}</td>
          <td>{published}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default GlobalTable
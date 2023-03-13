import React from 'react';

const Loader = ({styles}) => {
  return (
    <div className={styles?.TodoContainer__loader}>
        <span>Loading...</span>
    </div>
  )
}

export default Loader
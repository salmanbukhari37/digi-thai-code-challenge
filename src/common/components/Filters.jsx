import React from 'react';
import classNames from 'classnames';
import filterStyles from './style/Filters.module.scss';

const Filters = ({styles, searchHandler, sortHandler, resetHandler, limitHandler}) => {
  return (
    <div className={styles.TodoContainer__Search}>
        <div>
          <input type="text" onChange={(e) => searchHandler(e?.target?.value)} placeholder="Search by author name" />
        </div>
        <div className={filterStyles.BtnContainer}>
            <select onChange={limitHandler}>
                <option value={0}>Select option</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
            </select>
            <button 
                className={classNames(filterStyles.Btn, filterStyles.Secondary)} 
                onClick={() => sortHandler({type: "title"})}
            >Sort by Title</button>
            <button 
                className={classNames(filterStyles.Btn, filterStyles.Primary)} 
                onClick={() => sortHandler({type: "published"})}
            >Sort by Publication date</button>
            <button 
                className={classNames(filterStyles.Btn, filterStyles.Reset)} 
                onClick={() => resetHandler()}
            >Reset</button>
        </div>
    </div>
  )
}

export default Filters
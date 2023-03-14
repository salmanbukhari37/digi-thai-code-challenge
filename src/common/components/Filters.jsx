import React from 'react';
import classNames from 'classnames';
import filterStyles from './style/Filters.module.scss';

const Filters = ({
    styles, 
    searchHandler, 
    sortHandler, 
    resetHandler, 
    limitHandler,
    setSearch,
    search,
    limit
}) => {
  const limitOptions = [10, 15, 25];
  return (
    <div className={styles.TodoContainer__Search}>
        <div>
          <input type="text" onChange={(e) => {
            searchHandler(e?.target?.value);
            setSearch(e?.target?.value);
          }} placeholder="Search by author name"
            value={search} />
        </div>
        <div className={filterStyles.BtnContainer}>
            <select onChange={limitHandler}>
                {limitOptions?.map ((option, index) => <option key={index} selected={limit === option}>{option}</option>) }
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
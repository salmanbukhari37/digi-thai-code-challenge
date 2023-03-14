import React, { useEffect, useState } from "react";
import Loader from "common/components/Loader";
import Styles from "./styles/Todo.module.scss";
import { debounce, cloneDeep } from "lodash";
import Filters from "common/components/Filters";
import GlobalTable from "common/components/GlobalTable";
import { sortData } from "helpers/utils";
import { getBooksService } from "services/services";

const Todo = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState();
  const [filterData, setFilterData] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Reset Handler
  const resetHandler = () => {
    setFilterData(books);
    setLimit(10);
    setSearch("");
  }

  // Sort Handler - Sorting data by title || publish date
  const sortHandler = ({type}) => {
    setCurrentPage(1);
    if (filterData?.length > 0) {
      const clonedData = cloneDeep(filterData);
      const sortedData = sortData(clonedData, type);
      setFilterData(sortedData);
    } else {
      const actualData = cloneDeep(books);
      setFilterData(actualData);
    }
   
  };

  // Limit Handler - Show items by limit e.g. 10, 15, 25, 50
  const limitHandler = (event) => {
    const value = event.target.value;
    setCurrentPage(1);
    if (filterData?.length > 0) {
      const filteredData = cloneDeep(filterData);
      setLimit(Number( value ));
      setFilterData(filteredData);
    } else {
      const clonedBooks = cloneDeep(books);
      setLimit(Number( value ));
      setFilterData(clonedBooks);
    }
   
  }

  // Search Handler - Searching books
  const searchHandler = debounce((debounceVal) => {
    let val = debounceVal.toLowerCase();
    setCurrentPage(1);
    let extractedData = books.filter(({ title }) =>
      title?.toLowerCase()?.includes(val)
    );
    setFilterData(extractedData);
  }, 500);

  // Api call - Get the data for table listing
  const getBooksAsync = async () => {
    try {
      setIsLoading(true);
      const response = await getBooksService();
      if (response?.code === 200) {
        setError("")
        setIsLoading(false);
        // set books
        setBooks(response?.data);
        // Default it will show 10 items
        setFilterData(response?.data)
      } else {
        setIsLoading(false);
        setError(response?.status)
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    getBooksAsync();
  }, []);

  // Table - Columns
  const columns = [{
    ttl: "Title"
  }, {
    ttl: "Author"
  }, {
    ttl: "Publication Date",
  }];

  return (
    <div className={Styles.TodoContainer}>
      <h1>Book Store Shop</h1>
      {isLoading && <Loader styles={Styles} />}
      <Filters 
        styles={Styles} 
        searchHandler={searchHandler} 
        sortHandler={sortHandler} 
        resetHandler={resetHandler}
        limitHandler={limitHandler}
        setSearch={setSearch}
        search={search}
        limit={limit}
      />
      {error && <span className={Styles.Error}>{error}</span>}
      <div className={Styles.TableContainer}>
        <GlobalTable 
          columns={columns} 
          data={filterData} 
          limit={limit} 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
};

export default Todo;

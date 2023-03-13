import React, { useEffect, useState } from "react";
import Loader from "common/components/Loader";
import Styles from "./styles/Todo.module.scss";
import { debounce, cloneDeep } from "lodash";
import Filters from "common/components/Filters";
import GlobalTable from "common/components/GlobalTable";
import { sortData } from "../../helpers/utils";
import { getBooksService } from "../../services/services";

const Todo = () => {
  const [books, setBooks] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const [limit, setLimit] = useState(10);

  // Reset Handler
  const resetHandler = () => {
    setFilterData(books?.slice(0, limit))
  }

  // Sort Handler - Sorting data by title || publish date
  const sortHandler = ({type}) => {
    const clonedBooks = cloneDeep(books);
    const sortedData = sortData(clonedBooks, type);
    setFilterData(sortedData.slice(0, limit));
  };

  // Limit Handler - Show items by limit e.g. 10, 15, 25, 50
  const limitHandler = (event) => {
    const value = event.target.value;
    setLimit(value);
    const clonedBooks = cloneDeep(books);
    const result = clonedBooks.slice(0, value);
    setFilterData(result);
  }

  // Search Handler - Searching books
  const searchHandler = debounce((debounceVal) => {
    let val = debounceVal.toLowerCase();
    let extractedData = books.filter(({ title }) =>
      title?.toLowerCase()?.includes(val)
    );
    setFilterData(extractedData.slice(0, limit));
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
        setFilterData(response?.data?.slice(0, limit))
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
      />
      {error && <span className={Styles.Error}>{error}</span>}
      <GlobalTable columns={columns} data={filterData} />
    </div>
  );
};

export default Todo;

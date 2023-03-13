import React, { useEffect, useState } from "react";
import Loader from "common/components/Loader";
import Styles from "./styles/Todo.module.scss";
import { debounce, cloneDeep } from "lodash";
import Filters from "common/components/Filters";
import GlobalTable from "common/components/GlobalTable";
import { sortData } from "../../helpers/utils";

const Todo = () => {
  const [books, setBooks] = useState([]);
  const [filterData, setFilterData] = useState();
  const [isLoading, setIsLoading] = useState();


  const resetHandler = () => {
    setFilterData(books);
  }

  const sortHandler = ({type}) => {
    const clonedBooks = cloneDeep(books);
    const sortedData = sortData(clonedBooks, type);
    setFilterData(sortedData);
  };

  const limitHandler = (event) => {
    const limit = event.target.value;
    const clonedBooks = cloneDeep(books);
    const result = clonedBooks.slice(0, limit);
    setFilterData(result);
  }

  const searchHandler = debounce((debounceVal) => {
    let val = debounceVal.toLowerCase();
    let extractedData = books.filter(({ title }) =>
      title?.toLowerCase()?.includes(val)
    );
    setFilterData(extractedData);
  }, 500);

  const getBooksAsync = async () => {
    try {
      setIsLoading(true);
      const { data } = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/books?_quantity=20`
      ).then((res) => res.json());

      if (data) {
        setIsLoading(false);
        setBooks(data);
        
        setFilterData(data?.slice(0, 10))
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    getBooksAsync();
  }, []);

  const columns = [{
    ttl: "Title"
  }, {
    ttl: "Author"
  }, {
    ttl: "Publication Date",
  }];

  useEffect(() => {

  }, [filterData])

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
      <GlobalTable columns={columns} data={filterData} />
    </div>
  );
};

export default Todo;

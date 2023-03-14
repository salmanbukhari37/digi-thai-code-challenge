// Api call - Get the data for table listing
export const getBooksService = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/api/v1/books?_quantity=50`
    )
      .then((res) => res.json())
      .catch((err) => err);
    return response;
  } catch (err) {
    return err;
  }
};

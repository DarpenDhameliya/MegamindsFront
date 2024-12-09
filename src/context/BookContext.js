import React, { createContext, useState } from "react";
import axios from "axios";

export const BookContext = createContext();
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const getToken = () => localStorage.getItem("jwt");

  const fetchBooks = async () => {
    try {
      const token = getToken();
      const response = await axios.get(`${API_BASE_URL}/api/book`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error.response;
    }
  };

  const addBook = async (book) => {
    try {
      const token = getToken();
      const response = await axios.post(
        `${API_BASE_URL}/api/book/create`,
        book,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding book:", error);
      throw error.response;
    }
  };

  return (
    <BookContext.Provider value={{ books, fetchBooks, addBook }}>
      {children}
    </BookContext.Provider>
  );
};

export default BookProvider;

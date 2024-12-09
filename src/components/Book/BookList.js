import React, { useState, useEffect, useContext } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BookContext } from "../../context/BookContext";

const BookList = () => {
  const navigate = useNavigate();
  const { fetchBooks, books } = useContext(BookContext);

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <Paper elevation={3} sx={{ mt: 5, mx: "auto", p: 3, maxWidth: 600 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5">Book List</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/create")}
        >
          Add Book
        </Button>
      </Box>
      <List>
        {books.length === 0 && (
          <Typography>No books available. Add some!</Typography>
        )}
        {books.map((book) => (
          <ListItem key={book._id} divider>
            <ListItemText
              primary={`Title: ${book.title}`}
              secondary={`Author: ${book.author}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default BookList;

import React, { useState, useContext } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { BookContext } from "../../context/BookContext";
import { useNavigate } from "react-router-dom";

const BookCreate = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const { addBook } = useContext(BookContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!author.trim()) newErrors.author = "Author is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      addBook({ title, author });
    }
    if (Object.keys(newErrors).length === 0) {
      try {
        await addBook({ title, author });
        setTitle("");
        setAuthor("");
        navigate("/");
      } catch (error) {
        setErrorMessage(
          error.response?.data?.message || "Failed to add the book."
        );
      }
    }
  };

  return (
    <Paper elevation={3} sx={{ mt: 5, mx: "auto", p: 3, maxWidth: 600 }}>
      <Typography variant="h4" gutterBottom>
        Add New Book
      </Typography>
      {errorMessage && (
        <Typography variant="h5" gutterBottom sx={{ mb: 2, mt: 2 }}>
          {errorMessage}
        </Typography>
      )}
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
          error={!!errors.title} //field heighlight
          helperText={errors.title} // error msg
        />
        <TextField
          label="Author"
          variant="outlined"
          fullWidth
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          sx={{ mb: 2 }}
          error={!!errors.author}
          helperText={errors.author}
        />
        <Button type="submit" variant="contained" color="primary">
          Add Book
        </Button>
      </Box>
    </Paper>
  );
};

export default BookCreate;

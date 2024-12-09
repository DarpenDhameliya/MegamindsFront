import React from "react";
import { Routes, Route } from "react-router-dom";
import BookList from "./components/Book/BookList";
import { Login } from "@mui/icons-material";
import Register from "./components/Auth/Register";
import BookCreate from "./components/Book/BookCreate";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

const BookRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <BookList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create"
        element={
          <ProtectedRoute>
            <BookCreate />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
};

export default BookRoutes;

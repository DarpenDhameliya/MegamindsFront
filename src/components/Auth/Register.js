import React, { useState, useContext } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dbError, setDbError] = useState(null);
  const [error, setError] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required";
    if (!password.trim()) newErrors.password = "Password is required";

    setError(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        const responce = await register({ email, password });
        setEmail("");
        setPassword("");
        navigate("/login");
      } catch (err) {
        setDbError(err.data.message);
      }
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <Paper elevation={3} sx={{ mt: 5, mx: "auto", p: 3, maxWidth: 600 }}>
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      {dbError && (
        <Typography color="error" variant="h5" sx={{ mb: 2 }}>
          {dbError}
        </Typography>
      )}
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
          error={!!error.email}
          helperText={error.email}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
          error={!!error.password}
          helperText={error.password}
        />
        <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
      </Box>
      <Box sx={{ mt: 2, textAlign: "center" }}>
        <Typography variant="body2">
          account already exist?{" "}
          <Button color="primary" onClick={handleLoginClick}>
            Login here
          </Button>
        </Typography>
      </Box>
    </Paper>
  );
};

export default Register;

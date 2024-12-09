import "./App.css";
import { BrowserRouter as Router} from "react-router-dom";
import BookProvider from "./context/BookContext";
import AuthProvider from "./context/AuthContext";
import Layout from "./components/Layout/Layout";
import BookRoutes from "./Routes";

function App() {
  return (
    <>
      <BookProvider>
        <AuthProvider>
          <Router>
            <Layout />
            <BookRoutes />
          </Router>
        </AuthProvider>
      </BookProvider>
    </>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
//
import ProtectedRoute from "./routes/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const Logout = () => {
  Cookies.remove("token");
  window.location.href = "/login";
  return <p>loading...</p>;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="" element={<Home />} />
        </Route>
        <Route path="*" element={<h1>note found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

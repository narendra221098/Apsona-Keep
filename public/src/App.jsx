import { BrowserRouter, Routes, Route } from "react-router-dom";

//
import ProtectedRoute from "./routes/ProtectedRoute";
import Home from "./pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="" element={<Home />} />
        </Route>
        <Route path="*" element={<h1>note found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./page/Home";
import Pro from "./page/pro";
import Details from "./page/Details";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/products" element={<Pro />} />
        <Route path="/detailed/:id" element={<Details />} />
      </Route>
    </Routes>
  );
}

export default App;

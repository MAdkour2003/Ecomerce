import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./page/Home";
import Details from "./page/Details";
import Pro from "./page/Pro";
import Store from "./page/Store";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Pro />} />
        <Route path=":id" element={<Details />} />
        <Route path="Home" element={<Home />} />
        <Route path="store/:id" element={<Store />} />
      </Route>
    </Routes>
  );
}

export default App;

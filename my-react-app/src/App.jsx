import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./page/Home";
import Details from "./page/Details";
import Pro from "./page/Pro";
import Store from "./page/Store";
import { ShoppingCartProvider } from "./context/ShoppingCartContext.jsx";
function App() {
  return (
    <ShoppingCartProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path=":id" element={<Details />} />
          <Route path="/Pro" element={<Pro />} />
          <Route path="/Store" element={<Store />} />
        </Route>
      </Routes>
      {/* <div className="font-sans bg-gray-100 min-h-screen border-box"></div> */}
    </ShoppingCartProvider>
  );
}

export default App;

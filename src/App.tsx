import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './page/Home';
import Products from './page/Products';
import Details from './page/Details';
// USer => login (access) (No access to login & signup)
// No user => signup + login (N0 access to the rest of the app)
function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/detailed/:id' element={<Details />} />
      </Route>
    </Routes>
  );
}

export default App;

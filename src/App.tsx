import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './page/Home';
import Products from './page/Products';
import Details from './page/Details';
import Login from './page/Login';
import Signup from './page/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import PublicOnlyRoute from './components/PublicOnlyRoute';

function App() {
  return (
    <Routes>
      {/* Logged-in users are redirected away from these */}
      <Route element={<PublicOnlyRoute />}>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Route>

      {/* Not logged-in users are redirected to /login */}
      <Route element={<ProtectedRoute />}>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/detailed/:id' element={<Details />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

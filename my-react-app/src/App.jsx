import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Layout from './components/Layout';
import Home from './page/Home';
import Details from './page/Details';
import Pro from './page/Pro';
import Cart from './page/Cart';

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path=':id' element={<Details />} />
          <Route path='/pro' element={<Pro />} />
          <Route path='/store/:id' element={<Cart />} />{' '}
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;

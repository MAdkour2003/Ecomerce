import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './page/Home';
import Details from './page/Details';
import Pro from './page/Pro';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='item/:id' element={<Details />} />
          <Route path='/Pro' element={<Pro />} />
        </Route>
      </Routes>
      {/* <div className="font-sans bg-gray-100 min-h-screen border-box"></div> */}
    </>
  );
}

export default App;

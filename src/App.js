import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import List from './pages/List/List';
import Header from './component/Headers'
import User from './pages/user/User';
import Product from './pages/product/Product';
function App() {
  return (
     <div>
       <BrowserRouter>
       <Header/>
         <Routes>
          <Route path='/' element={<List/>} />
          <Route path='/user' element={<User/>} />
          <Route path='/product' element={<Product/>} />
         </Routes>
       </BrowserRouter>
     </div>
  );
}

export default App;

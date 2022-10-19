import { Route, Routes } from "react-router-dom"; 

import './styles/common.css'
import './styles/multipage.css'

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import User from './pages/User';

function App() {
  return (
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/user/:userid' element={<User/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
  );
}

export default App;
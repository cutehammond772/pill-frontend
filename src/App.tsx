import { Route, Routes } from "react-router-dom"; 
import { CreatePage } from "./pages/create";

import { HomePage } from './pages/home/';
import { NotFoundPage } from './pages/error/not_found';

function App() {
  return (
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/create' element={<CreatePage />}/>
        <Route path='/user/:userid' element={<CreatePage />}/>
        <Route path='/manage' element={<CreatePage />}/>
        <Route path='/board' element={<CreatePage />}/>
        <Route path='/pill/:pillid' element={<CreatePage />}/>
        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
  );
}

export default App;
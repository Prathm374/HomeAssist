import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AboutPage from './pages/AboutPage';
import Whoop404 from './pages/Whoop404';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<MainPage />} />
          <Route path='/home' element={<MainPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/service' element={<ServicesPage />} />    
          <Route path='/contact' element={<ContactPage />} />
          <Route path='*' element={<Whoop404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import Whoop404 from './pages/Whoop404.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import LoginPage from './pages/LoginPage.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginPage />} />
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

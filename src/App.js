import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import DetailPage from './pages/DetailPage';
import SearchPage from './pages/SearchPage';
import MainPage from './pages/MainPage';
import { Outlet, Routes, Route } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Nav />
      
      <Outlet /*하위 라우터들을 뜻함*/   />

      <Footer />
    </div>
  );
};

function App() {
  return (
    <div className="app">
      <Routes> 
        <Route path="/" element={<Layout />} >
          <Route index element={<MainPage />} />
          <Route path=":movieId" element={<DetailPage />} />
          <Route path="search" element={<SearchPage />} />
        </Route>
      </Routes>
    </div>
    
  );
}

export default App;

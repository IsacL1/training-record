import { Route, Routes } from 'react-router-dom';
import Navbar from './Component/Navbar';
//import './Style/App.scss';
import './Style/temp.scss';
import SlideRecord from './Pages/SlideRecord';
import SpeedSlalomRecord from './Pages/SpeedSlalomRecord';

function Home (){

  return (
    <div className='Home'>
        <div className='Nav'>
          <Navbar />
        </div>
      <main>
        <div className='Container'>
          <Routes>
            <Route path="/Home" element={<Home />} />
            <Route path="/Pages/SlideRecord" element={<SlideRecord />} />
            <Route path="/Pages/SpeedSlalomRecord" element={<SpeedSlalomRecord />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default Home;
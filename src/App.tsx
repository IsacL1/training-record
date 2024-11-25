import { Route, Routes } from 'react-router-dom';
import Navbar from './Component/Navbar';
import './Style/App.scss';
import SlideRecord from './Pages/SlideRecord';
import SpeedSlalomRecord from './Pages/SpeedSlalomRecord';
import Home from './Pages/Home';

const App = () => {
  return (
    <div className='App'>
        <div className='Nav' style={{width: "2rem"}}>
          <Navbar />
        </div>
      <main>
        <div className='Container' style={{width: "2rem"}}>
          <Routes>
            <Route path="/Pages/Home" element={<Home />} />
            <Route path="/Pages/SlideRecord" element={<SlideRecord />} />
            <Route path="/Pages/SpeedSlalomRecord" element={<SpeedSlalomRecord />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default App;
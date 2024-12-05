import { Route, Routes } from 'react-router-dom';
import Navbar from './Component/Navbar';
import SlideRecord from './Pages/SlideRecord';
import SpeedSlalomRecord from './Pages/SpeedSlalomRecord';
import AthleteReg from './Pages/AthleteReg';
import './Style/App.scss';
//import './Style/temp.scss';


function App() {

  return (
    <div className='Home'>
      <div className='Nav'>
        <Navbar />
      </div>
      <main>
        <div className='Container'>
          <Routes>
            <Route path="/Pages/SlideRecord" element={<SlideRecord />} />
            <Route path="/Pages/SpeedSlalomRecord" element={<SpeedSlalomRecord />} />
            <Route path="/Pages/AthleteReg" element={<AthleteReg />} /> 
          </Routes>
        </div>
      </main>
      <div>
        
      </div>
    </div>
  );
};

export default App;
import { Route, Routes } from 'react-router-dom';

import './Style/App.scss';

import Navbar from './Component/Navbar';
import SlideRecord from './Pages/SlideRecord';
import SpeedSlalomRecord from './Pages/SpeedSlalomRecord';
import AthleteReg from './Pages/AthleteReg';
import AnalyzeSSR from './Pages/AnalyzeSSR';
import ClassicSlalomRecord from './Pages/ClassicSlalomRecord';

//import './Style/temp.scss';


function App() {

  return (
    <div className='Home'>
      <div className='Nav'>
        <Navbar />
      </div>
      <main>
        <div className='Container'>
          <p>aaa</p>
          <Routes>
            <Route path='/' element={<AnalyzeSSR />} />
            <Route path="/Pages/SlideRecord" element={<SlideRecord />} />
            <Route path="/Pages/SpeedSlalomRecord" element={<SpeedSlalomRecord />} />
            <Route path="/Pages/ClassicSlalomRecord" element={<ClassicSlalomRecord />} />
            <Route path="/Pages/AthleteReg" element={<AthleteReg />} />
          </Routes>
        </div>
      </main>

    </div>
  );
};

export default App;
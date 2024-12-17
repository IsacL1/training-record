
import { NavLink } from 'react-router-dom'
const Navbar = () => {
  return (
    <div>
      <div className="Navbar">
        <input type="checkbox" id="navcheck" role="button" title="navMenu" />
        <label htmlFor="navcheck" aria-hidden="true" title="navMenu">
          <span className="burger">
            <span className="bar">
              <span className="visuallyhidden">Menu</span>
            </span>
          </span>
        </label>
        {/* <nav id="menu"> */}
        <nav className='navMenu'>
          <NavLink to="/" id="AnalyzeSSR">AnalyzeSSR</NavLink>
          <NavLink to="/Pages/SpeedSlalomRecord" id="speedslalom">Speed Slalom</NavLink>
          <NavLink to="/Pages/SlideRecord" id="slide">Slide</NavLink>
          <NavLink to="/Pages/ClassicSlalomRecord" id="slide">Classic</NavLink>
          <NavLink to="/Pages/AthleteReg" id="slide">Registration</NavLink>
        </nav>
      </div>
    </div>

  );
};

export default Navbar;
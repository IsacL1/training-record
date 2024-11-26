
import { NavLink } from 'react-router-dom'


const Navbar = () => {
  return (
    <div className="Navbar">
      <input type="checkbox" id="navcheck" role="button" title="menu" />
      <label htmlFor="navcheck" aria-hidden="true" title="menu">
        <span className="burger">
          <span className="bar">
            <span className="visuallyhidden">Menu</span>
          </span>
        </span>
      </label>
      <nav id="menu">
        <NavLink to="/Home">Home</NavLink>
        <NavLink to="/Pages/SpeedSlalomRecord" id="speedslalom">Speed Slalom</NavLink>
        <NavLink to="/Pages/SlideRecord" id="slide">Slide</NavLink>
        <NavLink to="/Pages/ClassicSlalomRecord" id="slide">Classic</NavLink>
      </nav>
    </div>
  );
};

export default Navbar;
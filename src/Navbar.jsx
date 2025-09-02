import { Link } from "react-router-dom";
import favicon from "./assets/favicon.png";

function Navbar() {
  return (
    <nav>
      <div className="brand">
        <img src={favicon} alt="Logo" className="brand-logo" />
        <span>Allison Poh</span>
      </div>
      <div className="links">
        <Link to="/about">About</Link>
        <Link to="/publications">Publications</Link>
        <Link to="/teaching">Teaching</Link>
        <Link to="/service">Service</Link>
        <Link to="/cv">CV</Link>
      </div>
    </nav>
  );
}

export default Navbar;

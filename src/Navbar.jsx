import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <div className="brand">Allison Poh</div>
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

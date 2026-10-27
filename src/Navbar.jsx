import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import favicon from "./assets/favicon.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  // "/" also renders the About page, so highlight About there too
  const aboutClass = ({ isActive }) =>
    isActive || pathname === "/" ? "active" : "";

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <nav className={menuOpen ? "open" : ""}>
        <Link to="/" className="brand" onClick={() => setMenuOpen(false)}>
          <img src={favicon} alt="Logo" className="brand-logo" />
          <span>Allison Poh</span>
        </Link>

        {/* Desktop */}
        <div className="links desktop-links">
          <NavLink to="/about" className={aboutClass}>About</NavLink>
          <NavLink to="/publications">Publications</NavLink>
          <NavLink to="/teaching">Teaching</NavLink>
          <NavLink to="/service">Service</NavLink>
          <NavLink to="/cv">CV</NavLink>
          <NavLink to="/personal">Personal</NavLink>
        </div>

        {/* Hamburger */}
        <button
          className={`menu-toggle ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* Mobile */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <NavLink to="/about" className={aboutClass} onClick={() => setMenuOpen(false)}>About</NavLink>
        <NavLink to="/publications" onClick={() => setMenuOpen(false)}>Publications</NavLink>
        <NavLink to="/teaching" onClick={() => setMenuOpen(false)}>Teaching</NavLink>
        <NavLink to="/service" onClick={() => setMenuOpen(false)}>Service</NavLink>
        <NavLink to="/cv" onClick={() => setMenuOpen(false)}>CV</NavLink>
        <NavLink to="/personal" onClick={() => setMenuOpen(false)}>Personal</NavLink>
      </div>
    </>
  );
}

export default Navbar;

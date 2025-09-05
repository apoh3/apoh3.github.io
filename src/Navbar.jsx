import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import favicon from "./assets/favicon.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

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
        <div className="brand">
          <img src={favicon} alt="Logo" className="brand-logo" />
          <span>Allison Poh</span>
        </div>

        {/* Desktop */}
        <div className="links desktop-links">
          <Link to="/about">About</Link>
          <Link to="/publications">Publications</Link>
          <Link to="/teaching">Teaching</Link>
          <Link to="/service">Service</Link>
          <Link to="/cv">CV</Link>
          <Link to="/personal">Personal</Link>
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
        <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
        <Link to="/publications" onClick={() => setMenuOpen(false)}>Publications</Link>
        <Link to="/teaching" onClick={() => setMenuOpen(false)}>Teaching</Link>
        <Link to="/service" onClick={() => setMenuOpen(false)}>Service</Link>
        <Link to="/cv" onClick={() => setMenuOpen(false)}>CV</Link>
        <Link to="/personal" onClick={() => setMenuOpen(false)}>Personal</Link>
      </div>
    </>
  );
}

export default Navbar;

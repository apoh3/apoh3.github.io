import { MdEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a
          href="mailto:apoh@umass.edu"
          target="_blank"
          rel="noopener noreferrer"
          title="Email"
        >
          <MdEmail className="icon" />
        </a>
        <a
          href="https://www.linkedin.com/in/allisonpoh"
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn"
        >
          <FaLinkedin className="icon" />
        </a>
        <a
          href="https://scholar.google.com/citations?hl=en&user=r4sloMMAAAAJ"
          target="_blank"
          rel="noopener noreferrer"
          title="Google Scholar"
        >
          <i className="ai ai-google-scholar icon"></i>
        </a>
      </div>
      <p>Last updated: Dec. 2025</p>
      <p>© {new Date().getFullYear()} Allison Poh</p>
    </footer>
  );
}

export default Footer;

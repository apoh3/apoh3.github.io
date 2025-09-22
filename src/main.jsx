import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles.css";

import ScrollToTop from "./ScrollToTop.jsx";
import Navbar from "./Navbar.jsx";
import Page from "./Page.jsx";
import Footer from "./Footer.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Page />
      <Footer />
    </BrowserRouter>
  </StrictMode>
);

//<BrowserRouter basename="/apoh3.github.io">

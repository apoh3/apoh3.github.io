import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles.css";

import Navbar from "./Navbar.jsx";
import Page from "./Page.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/apoh3.github.io"> 
      <Navbar />
      <Page />
    </BrowserRouter>
  </StrictMode>
);

//<BrowserRouter basename="/apoh3.github.io"></BrowserRouter>

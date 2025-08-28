import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Publications from "./pages/Publications";
import Teaching from "./pages/Teaching";
import Service from "./pages/Service";
import CV from "./pages/CV";

function Page() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/about" element={<About />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/teaching" element={<Teaching />} />
        <Route path="/service" element={<Service />} />
        <Route path="/cv" element={<CV />} />
      </Routes>
    </main>
  );
}

export default Page;

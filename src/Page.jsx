import { Routes, Route } from "react-router-dom";

function About() {
  return <h2>This is home</h2>;
}

function Publications() {
  return <h2>This site is temporarily underconstruction</h2>;
}

function Teaching() {
  return <h2>This site is temporarily underconstruction</h2>;
}

function Service() {
  return <h2>This site is temporarily underconstruction</h2>;
}

function CV() {
  return <h2>This site is temporarily underconstruction</h2>;
}

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
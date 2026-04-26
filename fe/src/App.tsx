import { Routes, Route } from "react-router-dom";

import RootLayout from "./components/layout/RootLayout.tsx";
import Home from "./pages/Home/Home.tsx";
import About from "./pages/About/About.tsx";

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  );
}

export default App;

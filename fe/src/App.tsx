import { Routes, Route } from "react-router-dom";

import RootLayout from "./components/layout/RootLayout.tsx";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import { useTheme } from "./hooks/useTheme.ts";
import NotFound from "./pages/NotFound.tsx";

function App() {
  useTheme();

  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

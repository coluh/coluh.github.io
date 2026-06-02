import { Routes, Route } from "react-router-dom";
import { useTheme } from "./hooks/useTheme.ts";

import RootLayout from "./components/layout/RootLayout.tsx";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import TranslatePage from "./pages/Translate.tsx";
import NotFound from "./pages/NotFound.tsx";
import SwordsPage from "./pages/games/Swords.tsx";

function App() {
  useTheme();

  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/translate" element={<TranslatePage />} />
        <Route path="/swords" element={<SwordsPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

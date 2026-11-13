import { Routes, Route } from "react-router-dom";
import { useTheme } from "./hooks/useTheme.ts";

import RootLayout from "./components/layout/RootLayout.tsx";
import TranslatePage from "./pages/Translate.tsx";

function App() {
  useTheme();

  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<TranslatePage />} />
      </Route>
    </Routes>
  );
}

export default App;

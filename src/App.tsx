import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Route, Routes, useLocation } from "react-router-dom";
import { CreatePage } from "./pages/create";

import { HomePage } from "./pages/home/";
import { NotFoundPage } from "./pages/error/not_found";

import { useColorScheme } from "@mui/joy/styles";

function App() {
  const { setMode } = useColorScheme();
  // default: light mode
  setMode("light");

  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition key={location.pathname} classNames="slide" timeout={500}>
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/user/:userid" element={<CreatePage />} />
          <Route path="/manage" element={<CreatePage />} />
          <Route path="/board" element={<CreatePage />} />
          <Route path="/pill/:pillid" element={<CreatePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default App;

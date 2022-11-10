import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Route, Routes, useLocation } from "react-router-dom";
import { CreatePage } from "./pages/create";

import { HomePage } from "./pages/home/";
import { NotFoundPage } from "./pages/error/not_found";

import { useColorScheme } from "@mui/joy/styles";
import { BoardPage } from "./pages/board";
import * as React from "react";
import { useAuth } from "./utils/hooks/auth";
import { useProfile } from "./utils/hooks/profile";

function App() {
  const { setMode } = useColorScheme();
  // default: light mode
  setMode("light");

  const location = useLocation();

  // Loader
  useAuth(true);
  useProfile(true);

  return (
    <TransitionGroup>
      <CSSTransition key={location.pathname} classNames="slide" timeout={500}>
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/user/:userid" element={<CreatePage />} />
          <Route path="/manage" element={<CreatePage />} />
          <Route path="/board" element={<BoardPage />} />
          <Route path="/pill/:pillid" element={<CreatePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default App;

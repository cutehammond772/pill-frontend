import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Route, Routes, useLocation } from "react-router-dom";
import { useColorScheme } from "@mui/joy/styles";

import { CreatePage } from "./pages/create";
import { HomePage } from "./pages/home/";
import { NotFoundPage } from "./pages/error/not_found";
import { BoardPage } from "./pages/board";

import { useAuth } from "./utils/hooks/auth";
import { useProfile } from "./utils/hooks/profile";

import "./transition.css";
import { Footer } from "./layouts/footer";

import * as React from "react";

import { DynamicPageProvider } from "./layouts/page";
import { DefaultHeader } from "./components/header/default";
import { CreateHeader } from "./components/header/create";
import { EmptyHeader } from "./components/header/empty";

const App = () => {
  // 기본적으로 라이트 모드로 설정한다.
  const { setMode } = useColorScheme();
  setMode("light");

  // 트랜지션 키로 필요하다.
  const location = useLocation();

  // Loader 역할을 수행한다.
  useAuth(true);
  useProfile(true);

  return (
    <DynamicPageProvider>
      
      {/* Header */}
      <Routes location={location}>
        <Route path="/" element={<DefaultHeader />} />
        <Route path="/board" element={<DefaultHeader />} />
        <Route path="/create" element={<CreateHeader />} />
        <Route path="*" element={<EmptyHeader />} />
      </Routes>

      {/* Page (= Content) */}
      <TransitionGroup>
        <CSSTransition
          key={location.pathname}
          classNames="page"
          timeout={500}
          unmountOnExit
        >
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

      {/* Footer */}
      <Footer />
    </DynamicPageProvider>
  );
};

export default App;

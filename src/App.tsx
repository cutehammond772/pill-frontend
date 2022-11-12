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
import { useDispatch } from "react-redux";
import { lockMenuClick, unlockMenuClick } from "./utils/reducers/header";
import { SearchPage } from "./pages/search";
import { HelpPage } from "./pages/help";
import { CreatePreviewPage } from "./pages/create_preview";
import { UserPage } from "./pages/user";
import { ManagePage } from "./pages/manage";
import { PillPage } from "./pages/pill";

const App = () => {
  // 기본적으로 라이트 모드로 설정한다.
  const { setMode } = useColorScheme();
  setMode("light");

  // 트랜지션 키로 필요하다.
  const location = useLocation();

  // Loader 역할을 수행한다.
  useAuth(true);
  useProfile(true);

  const dispatch = useDispatch();

  return (
    <DynamicPageProvider>
      {/* Header */}
      <Routes location={location}>
        {/* DefaultHeader */}
        <Route path="/" element={<DefaultHeader />} />
        <Route path="/board" element={<DefaultHeader />} />
        <Route path="/search" element={<DefaultHeader />} />
        <Route path="/help" element={<DefaultHeader />} />

        {/* CreateHeader */}
        <Route path="/create" element={<CreateHeader />} />
        <Route path="/create/preview" element={<CreateHeader />} />

        {/* EmptyHeader */}
        <Route path="/user/*" element={<EmptyHeader />} />
        <Route path="/manage/*" element={<EmptyHeader />} />
        <Route path="/pill/*" element={<EmptyHeader />} />
        <Route path="*" element={<EmptyHeader />} />
      </Routes>

      {/* Page (= Content) */}
      <TransitionGroup>
        <CSSTransition
          key={location.pathname}
          classNames="page"
          timeout={500}
          onEnter={() => dispatch(lockMenuClick())}
          onEntered={() => dispatch(unlockMenuClick())}
          unmountOnExit
        >
          <Routes location={location}>
            {/* DefaultHeader */}
            <Route path="/" element={<HomePage />} />
            <Route path="/board" element={<BoardPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/help" element={<HelpPage />} />

            {/* CreateHeader */}
            <Route path="/create" element={<CreatePage />} />
            <Route path="/create/preview" element={<CreatePreviewPage />} />

            {/* EmptyHeader */}
            <Route path="/user/:userID" element={<UserPage />} />
            <Route path="/manage" element={<ManagePage />} />
            <Route path="/pill/:pillID" element={<PillPage />} />
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

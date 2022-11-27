import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Route, Routes, useLocation } from "react-router-dom";
import { useColorScheme } from "@mui/joy/styles";

import { CreatePage } from "./pages/create";
import { HomePage } from "./pages/home/";
import { NotFoundPage } from "./pages/error/not-found";
import { MyPillPage } from "./pages/my-pill";
import { ExplorePage } from "./pages/explore";
import { AboutPage } from "./pages/about";
import { CreatePreviewPage } from "./pages/create-preview";
import { UserPage } from "./pages/user";
import { PillPage } from "./pages/pill";

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
import { lockInteraction, unlockInteraction } from "./utils/reducers/header";

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
        <Route path="/my" element={<DefaultHeader />} />
        <Route path="/explore" element={<DefaultHeader />} />
        <Route path="/about" element={<DefaultHeader />} />

        {/* CreateHeader */}
        <Route path="/create" element={<CreateHeader />} />
        <Route path="/create/preview" element={<CreateHeader />} />

        {/* EmptyHeader */}
        <Route path="/user/*" element={<EmptyHeader />} />
        <Route path="/pill/*" element={<EmptyHeader />} />
        <Route path="*" element={<EmptyHeader />} />
      </Routes>

      {/* Page (= Content) */}
      <TransitionGroup>
        <CSSTransition
          key={location.pathname}
          classNames="page"
          timeout={300}
          onEnter={() => dispatch(lockInteraction())}
          onEntered={() => dispatch(unlockInteraction())}
          onExited={() => alert("응애")}
          unmountOnExit
        >
          <Routes location={location}>
            {/* DefaultHeader */}
            <Route path="/" element={<HomePage />} />
            <Route path="/my" element={<MyPillPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/about" element={<AboutPage />} />

            {/* CreateHeader */}
            <Route path="/create" element={<CreatePage />} />
            <Route path="/create/preview" element={<CreatePreviewPage />} />

            {/* EmptyHeader */}
            <Route path="/user/:userID" element={<UserPage />} />
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

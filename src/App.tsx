import * as React from "react";
import { useEffect, useCallback } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Route, Routes, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./transition.css";

import { useColorScheme } from "@mui/joy/styles";

import CreatePage from "./pages/create";
import HomePage from "./pages/home/";
import NotFoundPage from "./pages/error/not-found";
import { MyPillPage } from "./pages/my-pill";
import ExplorePage from "./pages/explore";
import CreatePreviewPage from "./pages/create-preview";
import UserPage from "./pages/user";
import PillPage from "./pages/pill";

import DefaultHeader from "./components/header/default";
import CreateHeader from "./components/header/create";
import EmptyHeader from "./components/header/empty";

import Footer from "./layouts/footer";
import { Actions as actions } from "./utils/reducers/page/transition";
import { Actions as events } from "./utils/reducers/page/event";

const App = () => {
  // 기본적으로 라이트 모드로 설정한다.
  const { setMode } = useColorScheme();
  setMode("light");

  // 트랜지션 키로 필요하다.
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLoad = useCallback(() => {
    dispatch(events.broadcastLoad());
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener("load", handleLoad);
    return () => window.removeEventListener("load", handleLoad);
  }, [handleLoad]);

  return (
    <>
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
          onEnter={() => dispatch(actions.startTransition())}
          onEntering={() => dispatch(actions.inTransition())}
          onEntered={() => dispatch(actions.endTransition())}
          unmountOnExit
        >
          <Routes location={location}>
            {/* DefaultHeader */}
            <Route path="/" element={<HomePage />} />
            <Route path="/my" element={<MyPillPage />} />
            <Route path="/explore" element={<ExplorePage />} />

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
    </>
  );
};

export default App;

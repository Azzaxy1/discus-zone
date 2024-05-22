// eslint-disable-next-line no-unused-vars
import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import Navigation from "./Components/Navigation";
import { Footer } from "./Components/Footer";
import Leaderboard from "./Pages/Leaderboard";
import { useEffect } from "react";
import RegisterPage from "./Pages/RegisterPage";
import ErrorPage from "./Pages/ErrorPage";
import DetailThread from "./Pages/DetailThread";
import AddThread from "./Pages/AddThread";
import { useDispatch, useSelector } from "react-redux";
import { asyncLogoutSucess } from "./redux/auth/action";
import { asyncIsLoadingProcess } from "./redux/loading/action";
import Loading from "./Components/Loading";

const App = () => {
  const authUser = useSelector((states) => states.authUser);
  const isLoading = useSelector((states) => states.isLoading);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(asyncLogoutSucess());
    navigate("/");
  };

  useEffect(() => {
    dispatch(asyncIsLoadingProcess());
  }, [dispatch]);

  if (isLoading) {
    return null;
  }

  if (authUser === null) {
    return (
      <>
        <Loading />
        <main className="min-h-screen font-quicksand">
          <Navigation />
          <Routes>
            <Route path="/*" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
          <Footer />
        </main>
      </>
    );
  }

  return (
    <>
      <Loading />
      <main className="min-h-screen font-quicksand">
        <Navigation name={authUser.name} logout={onLogout} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path={"/threads/:id"} element={<DetailThread />} />
          <Route path="/add-thread" element={<AddThread />} />
          <Route path="/leaderboards" element={<Leaderboard />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </main>
    </>
  );
};

export default App;


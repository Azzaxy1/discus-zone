// eslint-disable-next-line no-unused-vars
import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import Navigation from "./Components/Navigation";
import { Footer } from "./Components/Footer";
import Leaderboard from "./Pages/Leaderboard";
import { useEffect, useState } from "react";
import RegisterPage from "./Pages/RegisterPage";
import ErrorPage from "./Pages/ErrorPage";
import DetailThread from "./Pages/DetailThread";
import AddThread from "./Pages/AddThread";
import { getUserLogged, putAccessToken } from "./utils/network-data";
import toast from "react-hot-toast";

const App = () => {
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const navigate = useNavigate();

  const onLoginSuccess = async ({ token }) => {
    putAccessToken(token);
    const { data } = await getUserLogged();
    setAuthedUser(data);
  };

  const onLogout = () => {
    setAuthedUser(null);
    putAccessToken("");
    navigate("/");

    toast.success("Logout success");
  };

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await getUserLogged();
      setAuthedUser(data);
      setInitializing(false);
    };

    fetchUser();
  }, []);

  if (initializing) {
    return null;
  }

  if (authedUser === null) {
    return (
      <main className="min-h-screen  font-quicksand">
        <Routes>
          <Route
            path="/*"
            element={<LoginPage loginSuccess={onLoginSuccess} />}
          />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>
    );
  }

  return (
    <main className="min-h-screen  font-quicksand">
      <Navigation name={authedUser.user.name} logout={onLogout} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path={"/threads/:id"} element={<DetailThread />} />
        <Route path="/add-thread" element={<AddThread />} />
        <Route path="/leaderboards" element={<Leaderboard />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </main>
  );
};

export default App;


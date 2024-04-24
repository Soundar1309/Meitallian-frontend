import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../../src/App.css";
import Footer from "../components/Footer";
import { AuthContext } from "../contexts/AuthProvider";
import LoadingSpinner from "../components/LoadingSpinner";
import { useTheme } from "../hooks/ThemeContext";

const Main = () => {
  const { loading } = useContext(AuthContext);

  return (
    <div className="bg-primaryBG">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="relative">
          <Navbar />
          <div className="fixed top-14 lg:top-0  right-0 p-5 themediv">
          </div>
          <div className="min-h-screen">
            <Outlet />
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Main;

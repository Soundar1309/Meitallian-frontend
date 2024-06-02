import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/LoadingSpinner";

import "../../src/App.scss";

const Main = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [location?.pathname]);

  return (
    <div className="bg-primaryBG">
      {loading && <LoadingSpinner />}
      {!loading && (
        <div className="relative">
          <Navbar />
          <div className="fixed top-14 lg:top-0  right-0 p-5 themediv"></div>
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

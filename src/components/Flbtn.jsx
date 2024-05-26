import React from "react";
import { Link } from "react-router-dom";
import { PlusCircleOutlined } from "@ant-design/icons";

const FloatingMenuButton = () => {
  return (
    <Link
      to="/menu"
      className="fixed bottom-6 right-6 z-50 bg-darkgreen hover:bg-red text-white py-3 px-6 rounded-md shadow-lg transition duration-300 md:bottom-4 md:right-4 lg:bottom-6 lg:right-6"
    >
      Menu <PlusCircleOutlined />
    </Link>
  );
};

export default FloatingMenuButton;

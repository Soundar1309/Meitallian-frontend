import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import Profile from "./Profile";

import { FaRegUser } from "react-icons/fa";
import useCart from "../hooks/useCart";

import { Menu } from "antd";
import { AuthContext } from "../contexts/AuthProvider";

const Navbar = () => {
  const navigate = useNavigate();
  const [isSticky, setIsSticky] = useState(false);
  const { user } = useContext(AuthContext);
  const [cart] = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const onClick = ({ item }) => {
    setIsMenuOpen((prev) => !prev);
    navigate(item?.props.title)
  }

  return (
    <header
      className={`bg-darkgreen navbar-wrapper max-w-screen-2xl h-22 mb-6 container mx-auto fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out`}
    >
      <div
        className={`navbar xl:px-24 ${isSticky
          ? "shadow-md bg-darkgreen transition-all duration-300 ease-in-out text-white"
          : ""
          }`}
      >
        <div className="navbar-start ">
          <div className="dropdown justify-between">
            <button
              onClick={toggleMenu}
              className="btn btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>
            <ul
              className={`hamburger-menu menu menu-sm dropdown-content  mt-3 z-[1] shadow bg-base-100 space-y-3 `}
              style={{ display: isMenuOpen ? "block" : "none" }}
            >
              <div className="menu-container">
                <Menu
                  mode="vertical"
                  items={items}
                  onClick={onClick}
                  className="responsive-menu"
                />
                <div className="w-full flex items-center justify-center">
                  <Link
                    to="/menu"
                    type="button"
                    className="bg-darkgreen w-[350px] font-semibold btn rounded-none text-white border-none my-6 order_now_btn text-md md:text-lg py-2"
                  >
                    Order Online
                  </Link>
                </div>
              </div>
            </ul>
          </div>
          <a href="/" className="lg:block hidden">
            <img src="logo-white.png" className="w-44" alt="logo" />
          </a>
        </div>
        <a href="/" className="lg:hidden block">
          <img src="logo-white.png" className="w-44" alt="logo" />
        </a>
        <div className="navbar-center hidden lg:flex">
          <ul className="text-white hover:text-dark menu menu-horizontal px-1">
            {navItems}
          </ul>
        </div>
        <div className="navbar-end ">
          <Link to="/cartpage">
            <div
              className="btn btn-ghost btn-circle md:flex items-center justify-center mr-3 hidden"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">
                  {cart.length || 0}
                </span>
              </div>
            </div>
          </Link>

          {/* login button */}

          {user ? (
            <Profile user={user} />
          ) : (
            <div>
              <button
                onClick={() =>
                  document.getElementById("my_modal_5").showModal()
                }
                className="btn md:flex items-center gap-2 rounded-full px-6 bg-white text-dark hidden"
              >
                <FaRegUser /> Login
              </button>
              <FaRegUser
                className="flex md:hidden text-[#fff] mr-4"
                onClick={() =>
                  document.getElementById("my_modal_5").showModal()
                }
              />
            </div>
          )}
          <Modal />
        </div>
      </div>
    </header>
  );
};
export default Navbar;

const navItems = (
  <>
    <li>
      <a href="/">Home</a>
    </li>
    <li>
      <a href="/#/menu">Menu</a>
    </li>
    <li>
      <a href="/#/about">
        About Us
      </a>
    </li>
    <li>
      <a href="/#/Story">
        Our Story
      </a>
    </li>
    <li>
      <a href="/#/contact">Contact us</a>
    </li>
  </>
);

const items = [
  {
    key: "homw",
    label: "Home",
    title: "",
    //className: "border-b-1 border",
  },
  {
    key: "menu",
    label: "Menu",
    title: "menu",
    //className: "border-b-1 border",
  },
  {
    key: "about",
    label: "About Us",
    title: "about",
    //className: "border-b-1 border",
  },
  {
    key: "story",
    label: "Our Story",
    title: "story",
    //className: "border-b-1 border",
  },
  {
    key: "contact",
    label: "Contact us",
    title: "contact",
    //className: "",
  },
];

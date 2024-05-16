import React, { useContext, useEffect, useState } from "react";
import logo from "/logo-white.png";
import { FaRegUser } from "react-icons/fa";
import Modal from "./Modal";
import { AuthContext } from "../contexts/AuthProvider";
import Profile from "./Profile";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";
import { Menu } from "antd";
import MenuItem from "antd/es/menu/MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isSticky, setSticky] = useState(false);
  const { user, loading } = useContext(AuthContext);
  const [cart, refetch] = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = (
    <>
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        <a href="/#/menu">Menu</a>
      </li>
      <li>
        <a href="/#/about">About Us</a>
      </li>
      <li>
        <a href="/#/contact">Contact us</a>
      </li>
    </>
  );

  return (
    <header
      className={`bg-darkgreen max-w-screen-2xl h-22 mb-6 container mx-auto fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out`}
    >
      <div
        className={`navbar xl:px-24 ${
          isSticky
            ? "shadow-md bg-darkgreen transition-all duration-300 ease-in-out text-white"
            : ""
        }`}
      >
        <div className="navbar-start ">
          <div className="dropdown justify-between">
            <label
              onClick={toggleMenu}
              tabIndex={0}
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
            </label>
            <ul
              className={`hamburger-menu menu menu-sm dropdown-content  mt-3 z-[1] shadow bg-base-100 space-y-3 `}
              style={{ display: isMenuOpen ? "block" : "none" }}
            >
              <div className="menu-container">
                <Menu mode="vertical" className="responsive-menu">
                  <MenuItem
                    key="1"
                    onClick={() => {
                      navigate("/");
                      setIsMenuOpen(false);
                    }}
                    className=" border-b-2 border-dashed"
                  >
                    <div className="flex items-center justify-between w-full">
                      <p className="text-md md:text-lg pt-2">Home</p>
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="w-3 h-3 text-md md:text-lg"
                      />
                    </div>
                  </MenuItem>
                  <MenuItem
                    key="2"
                    onClick={() => {
                      navigate("menu");
                      setIsMenuOpen(false);
                    }}
                    className=" border-b-2 border-dashed"
                  >
                    <div className="flex items-center justify-between w-full">
                      <p className="text-md md:text-lg">Menu</p>
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="w-3 h-3 text-md md:text-lg"
                      />
                    </div>
                  </MenuItem>
                  <MenuItem
                    key="3"
                    onClick={() => {
                      navigate("about");
                      setIsMenuOpen(false);
                    }}
                    className=" border-b-2 border-dashed"
                  >
                    <div className="flex items-center justify-between w-full">
                      <p className="text-md md:text-lg">About Us</p>
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="w-3 h-3 text-md md:text-lg"
                      />
                    </div>
                  </MenuItem>
                  <MenuItem
                    key="4"
                    onClick={() => {
                      navigate("contact");
                      setIsMenuOpen(false);
                    }}
                    className=""
                  >
                    <div className="flex items-center justify-between w-full">
                      <p className="text-md md:text-lg">Contact Us</p>
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="w-3 h-3 text-md md:text-lg"
                      />
                    </div>
                  </MenuItem>
                </Menu>
                <div className="w-full flex items-center justify-center">
                  <Link
                    to="/menu"
                    type="button"
                    className="bg-darkgreen font-semibold btn text-white my-6 order_now_btn text-md md:text-lg py-2"
                  >
                    Order Online
                  </Link>
                </div>
              </div>
            </ul>
          </div>
          <a href="/" className="lg:block hidden">
            <img src={logo} className="w-44" />
          </a>
        </div>
        <a href="/" className="lg:hidden block">
          <img src={logo} className="w-44" />
        </a>
        <div className="navbar-center hidden lg:flex">
          <ul className="text-white hover:text-dark menu menu-horizontal px-1">
            {navItems}
          </ul>
        </div>
        <div className="navbar-end ">
          <Link to="/cartpage">
            <label
              tabIndex={0}
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
            </label>
          </Link>

          {/* login button */}

          {user ? (
            <>
              <Profile user={user} />
            </>
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

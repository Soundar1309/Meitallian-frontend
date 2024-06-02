import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useStoreManager from "../hooks/useStoreManager";

const Profile = ({ user }) => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isAdmin, isAdminLoading] = useAdmin();
  const [isStoreManager, isStoreManagerLoading] = useStoreManager();

  // logout
  const handleLogout = () => {
    logOut()
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="drawer drawer-end z-50">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-4"
            className="drawer-button btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              {user.photoURL ? (
                <img alt="" src={user.photoURL} />
              ) : (
                <img alt="" src="/images/avatar.jpg" />
              )}
            </div>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <a href="/#/update-profile">Profile</a>
            </li>
            <li>
              <a href="/#/order">Order</a>
            </li>
            {isAdmin || isStoreManager ? (
              <li>
                <a href="/#/dashboard">Dashboard</a>
              </li>
            ) : (
              <></>
            )}

            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;

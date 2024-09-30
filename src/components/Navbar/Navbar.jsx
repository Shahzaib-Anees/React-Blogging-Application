import React, { useState, useEffect } from "react";
import { auth } from "../../configs/firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { FaPowerOff } from "react-icons/fa6";
import {
  signOutUser,
  getSingleData,
} from "../../configs/firebase/firebaseMethods";
import { FaBars, FaBloggerB, FaRegBookmark } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "./Navbar.css";
function Navbar() {
  const [checkUser, setCheckUser] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userID, setUserID] = useState(null);
  const [hamMenuCall, setHamMenuCall] = useState(false);

  // Toggle Column Navigation Menu
  const colNav = document.getElementById("col-nav-container");
  const toggelColNav = () => {
    console.log(colNav);
    setHamMenuCall(!hamMenuCall);
    console.log(hamMenuCall);
    if (hamMenuCall) {
      colNav.style.display = "flex";
    } else {
      colNav.style.display = "none";
    }
  };
  const getUserData = async (id) => {
    const userData = await getSingleData("users", id);
    if (userData) {
      setUserData(userData);
      console.log(userData);
    } else {
      console.log("No User Data Found");
    }
  };
  useEffect(() => {
    const authCheck = async () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setCheckUser(true);
          // Calling getUserData Function
          getUserData(user.uid);
          setUserID(user.uid);
        } else {
          setCheckUser(false);
        }
      });
    };
    authCheck();
  }, []);

  const logOutUser = async () => {
    const response = await signOutUser();
    console.log(response);
  };

  return (
    <div
      className="navbar py-1 px-5"
      style={{
        boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
      }}
    >
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <button className="flex" id="hamMenu-btn-nav" onClick={toggelColNav}>
            <FaBars className="text-[20px]" />
          </button>
          <FaBloggerB className="text-5xl text-[#4f3085]" />
          <span className="text-3xl px-1 font-bold">Blogs</span>
        </div>
      </div>
      {checkUser ? (
        <div className="flex-none">
          <div className="dropdown dropdown-end mx-2">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <FaRegBookmark className="text-3xl text-[#4f3085]" />
                <span className="badge badge-sm indicator-item">
                  {userData?.saved?.length}
                </span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
            >
              <div className="card-body">
                <span className="text-lg font-bold">Saved Blogs</span>
                <span className="text-info">
                  Subtotal: {userData?.saved?.length}
                </span>
                <div className="card-actions">
                  <button className="btn btn-primary btn-block">
                    <Link to={`Profile/${userID}/SavedBlogs`}>
                      Check Saved Blogs
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={userData?.profileImage}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to={`Profile/${userID}`} className="justify-between">
                  <span>Profile</span>
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <button
                className="w-[fit-content] flex items-center gap-[5px] py-1 px-3 mt-2 mb-2 rounded ml-2 text-[#404040] font-semibold bg-[#ededed]"
                onClick={logOutUser}
              >
                <span>
                  <FaPowerOff />
                </span>
                <span>Logout</span>
              </button>
            </ul>
          </div>
        </div>
      ) : (
        <div className="flex-none">
          <button className="auth-nav-btn">
            <Link to="/Signin">Login</Link>
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;

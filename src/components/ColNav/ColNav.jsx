import React from "react";
import "./ColNav.css";
import {
  FaHouse,
  FaGoogleDrive,
  FaFilePen,
  FaBook,
  FaBookmark,
  FaBars,
} from "react-icons/fa6";

import { Link } from "react-router-dom";

function ColNav({ id }) {
  // onMouseEnter Col Nav
  const toggleColNavElement = (evt) => {
    const targetElement = evt.target;
    const spanText = targetElement.childNodes[1];
    if (targetElement.className !== "active") {
      targetElement.classList.add("active");
      console.log(spanText, targetElement);
    }

    spanText.style.display = "flex";
  };

  // onMouseLeave Col Nav
  const hideColNavElement = (evt) => {
    const targetElement = evt.target;
    const spanText = targetElement.childNodes[1];
    targetElement.classList.remove("active");
    spanText.style.display = "none";
  };
  return (
    <article className="flex w-[fit-content] h-[100%] top-0 left-0 overflow-visible gap-2 py-5 bg-[#272727] text-[#fff]">
      <div className="flex flex-col gap-[30px]">
        <div className="w-[100%] flex items-center justify-center overflow-hidden cursor-pointer py-2 px-3">
          <button className="flex rounded bg-[rgba(0,0,0,0.4)]">
            <FaBars className="text-[20px]" />
          </button>
        </div>
        <div className="flex flex-col gap-[50px] py-4">
          <div
            className="relative flex gap-2 items-center cursor-pointer p-2"
            onMouseEnter={toggleColNavElement}
            onMouseLeave={hideColNavElement}
          >
            <Link to="/">
              <FaHouse className="text-[22px]" />
            </Link>
            <span className="col-nav-text-hide ml-14">Home</span>
          </div>
          <div
            className="relative flex gap-2 items-center cursor-pointer p-2"
            onMouseEnter={toggleColNavElement}
            onMouseLeave={hideColNavElement}
          >
            <Link to={`/Profile/${id}`}>
              <FaGoogleDrive className="text-[22px]" />
            </Link>
            <span className="relative col-nav-text-hide ml-14">Dashboard</span>
          </div>
          <div
            className="relative flex gap-2 items-center cursor-pointer p-2 z-10"
            onMouseEnter={toggleColNavElement}
            onMouseLeave={hideColNavElement}
          >
            <Link to={`/Profile/${id}/MyBlogs`}>
              <FaFilePen className="text-[22px]" />
            </Link>
            <span className="col-nav-text-hide ml-14">Your Blogs</span>
          </div>
          <div
            className="relative flex gap-2 items-center cursor-pointer p-2"
            onMouseEnter={toggleColNavElement}
            onMouseLeave={hideColNavElement}
          >
            <Link to="/blogs">
              <FaBook className="text-[22px]" />
            </Link>
            <span className="col-nav-text-hide ml-14">All Blogs</span>
          </div>
          <div
            className="flex gap-2 items-center cursor-pointer p-2"
            onMouseEnter={toggleColNavElement}
            onMouseLeave={hideColNavElement}
          >
            <Link to={`/Profile/${id}/SavedBlogs`}>
              <FaBookmark className="text-[22px]" />
            </Link>
            <span className="col-nav-text-hide ml-14">Saved</span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ColNav;

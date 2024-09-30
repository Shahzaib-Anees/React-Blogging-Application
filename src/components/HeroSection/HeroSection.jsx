import React from "react";
import "./HeroSection.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../configs/firebase/firebaseConfig";
import RecentSection from "../RecentSection/RecentSection";
function HeroSection() {
  const navigate = useNavigate();
  const navigateUser = () => {
    if (auth.currentUser) {
      const user = auth.currentUser;
      navigate(`Profile/${user.uid}/CreateBlog`);
    } else {
      navigate("/Signin");
    }
  };
  return (
    <>
      <article className="w-[100%] min-h-[50vh] mx-h-[fit-content] flex items-center justify-center py-5 px-3 bg-[#4f3085] mt-1">
        <div className="flex flex-col items-center justify-center gap-2 lg:w-[50%] sm:w-[90%] text-[#fff]">
          <h1 className="text-4xl font-bold text-center">
            Join millions of others
          </h1>
          <p className="text-[18px] font-semibold text-center">
            Whether sharing your expertise, breaking news, or whatever’s on your
            mind, you’re in good company on Blogger. Get Started to discover why
            millions of people have published their passions here.
          </p>
          <button
            className="bg-[#272727] py-2 px-4 rounded mt-2 font-semibold hero-btn"
            style={{
              boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
            }}
            onClick={navigateUser}
          >
            Create Your Blog
          </button>
        </div>
      </article>
        <RecentSection />
    </>
  );
}

export default HeroSection;

import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { auth } from "../../configs/firebase/firebaseConfig";
import { getSingleData } from "../../configs/firebase/firebaseMethods";
import { FaAngleLeft } from "react-icons/fa6";
function BlogCard() {
  const [blog, setBlog] = useState([]);
  const { blogId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const currentUser = auth.currentUser?.uid;
    if (currentUser) {
      console.log("User hai");
    } else {
      console.log("User nahi hai");
      navigate("/Signin");
      return;
    }
  }, []);
  useEffect(() => {
    const getBlogData = async () => {
      try {
        const data = await getSingleData("blogs", blogId);
        setBlog(data);
        console.log(data);
        console.log(blog);
      } catch (error) {
        console.log(error);
      }
    };
    getBlogData();
  });

  useEffect(() => {
    console.log("Blog Mounted");
  }, [blog]);
  return (
    <>
      <div className="mt-8 ml-8">
        <Link
          className="text-[17px] font-bold rounded bg-[rgba(0,0,0,0.1)] w-[fit-content] p-3 text-[#545454] flex items-center gap-1"
          to="/"
        >
          <FaAngleLeft />
        </Link>
      </div>
      <article className="flex flex-col gap-2 items-center justify-center w-[100%] mt-5 py-5">
        <div className="flex flex-col lg:w-[50%] sm:w-[100%] sm:p-3 h-[fit-content]">
          <div className="w-[100%] h-[100%]">
            <img
              className="w-[100%] h-[100%]"
              src={blog?.blogImage}
              alt="blog-img"
            />
          </div>
          <div className="flex flex-col py-2 gap-2 w-[100%]">
            <div className="flex flex-col gap-4">
              <h3 className="text-4xl font-semibold ml-3 mb-1">
                {blog?.blogTitle}
              </h3>
              <div
                className="flex flex-row items-center text-[14px] font-[400] text-[#474747] w-[100%] h-[40px] py-2 overflow-hidden"
                style={{
                  borderTop: "1px solid #cdcdcd",
                  borderBottom: "1px solid #cdcdcd",
                }}
              >
                <span
                  className="px-2"
                  style={{
                    borderRight: "1px solid #cdcdcd",
                  }}
                >
                  {blog?.blogAuthor?.name}
                </span>
                <span
                  className="ml-2 px-2"
                  style={{
                    borderRight: "1px solid #cdcdcd",
                  }}
                >
                  {blog?.blogDate}
                </span>
              </div>
              <p className="text-[18px] text-[#272727] font-semibold">
                {blog?.blogDescription}
              </p>
            </div>
            <div
              className="w-[100%] flex items-center gap-2 ml-2 py-2 px-2"
              style={{
                borderTop: "2px solid #cdcdcd",
                borderBottom: "2px solid #cdcdcd",
              }}
            >
              <div className="flex items-center justify-center">
                <img
                  src={blog?.blogAuthor?.image}
                  alt="user-img"
                  className="w-[70px] h-[70px] rounded-full"
                />
              </div>
              <div className="w-[fit-content] flex flex-col justify-center py-2 ml-2">
                <p className="text-[16px] text-[#6e6e6e] font-semibold">
                  Written By
                </p>
                <h5 className="text-[18px] text-[#6e6e6e] font-semibold">
                  {blog?.blogAuthor?.name}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

export default BlogCard;

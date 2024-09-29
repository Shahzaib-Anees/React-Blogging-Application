import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSingleData } from "../../configs/firebase/firebaseMethods";
import SaveBlogButton from "../SaveBlogButton/SaveBlogButton";
function BlogCard({ blogId }) {
  const [data, setData] = useState({});
  useEffect(() => {
    const getBlogData = async () => {
      const blogData = await getSingleData("blogs", blogId);
      setData({ ...blogData });
    };
    getBlogData();
  }, [blogId]);

  useEffect(() => {
    console.log("Data Rendered in Blog Card");
  }, [data]);

  const { blogTitle, blogDescription, blogImage } = data;
  return (
    <>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div>
          <img
            className="rounded-t-lg h-64 w-full object-cover"
            src={blogImage}
            alt="blog-image"
          />
        </div>
        <div className="p-5">
          <div>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {blogTitle?.length > 40
                ? blogTitle.slice(0, 40) + "..."
                : blogTitle}
            </h5>
          </div>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {blogDescription?.length > 100
              ? blogDescription.slice(0, 100) + "..."
              : blogDescription}
          </p>
          <div className="flex items-center justify-between">
            <Link
              to={`/SingleBlog/${blogId}`}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Read more
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Link>
            <SaveBlogButton blogId={blogId} />
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogCard;

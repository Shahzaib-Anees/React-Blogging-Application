import React, { useState, useEffect } from "react";
import BlogCard from "../../components/BlogCard/BlogCard";
import { getAllDocuments } from "../../configs/firebase/firebaseMethods";
import { Link } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa6";
function AllBlogs() {
  const [allBlogData, setAllBlogData] = useState([]);
  useEffect(() => {
    const getAllData = async () => {
      const blogCollection = [];
      try {
        const data = await getAllDocuments("blogs");
        setAllBlogData([...data]);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllData();
  }, []);

  useEffect(() => {
    console.log("All Blogs Data =>", allBlogData);
  }, [allBlogData]);

  return (
    <>
      <article className="flex flex-col gap-5 bg-[#f2f2f2] h-[fit-content] py-5 px-8">
        <Link className="text-[17px] font-bold rounded bg-[rgba(0,0,0,0.1)] w-[fit-content] p-3 text-[#545454] flex items-center gap-1" to="/">
          <FaAngleLeft />
        </Link>
        <div className="flex flex-col gap-2 items-center justify-center">
          <p className="text-xl text-[#727272] font-bold">OUR BLOGS</p>
          <h1 className="text-3xl font-bold text-center text-[#272727]">
            Find our all blogs from here
          </h1>
          <p className="text-[14px] text-[#727272] font-semibold w-[50%] text-center">
            Check out our all blogs . Our Bloggers have done a great job in
            writing these blogs. We provide you the best blogs to read them all
            along
          </p>
        </div>
        <div className="flex flex-wrap gap-8 items-center justify-center py-2 px-4">
          {allBlogData.length > 0 ? (
            allBlogData.map((blog) => {
              return <BlogCard key={blog.blogId} blogId={blog.blogId} />;
            })
          ) : (
            <h1>No Blogs Found</h1>
          )}
        </div>
      </article>
    </>
  );
}

export default AllBlogs;

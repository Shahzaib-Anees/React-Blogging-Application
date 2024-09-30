import React, { useEffect, useState } from "react";
import { getAllDocuments } from "../../configs/firebase/firebaseMethods";
import BlogCard from "../BlogCard/BlogCard";
/**
 * Renders a section displaying recent blog posts.
 * Fetches blog data from Firestore and renders a list of `ProfileBlogCard` components for each blog.
 */
function RecentSection() {
  const [blogsData, setBlogsData] = useState([]);
  useEffect(() => {
    const allBlogsData = async () => {
      try {
        const data = await getAllDocuments("blogs");
        console.log(data);
        setBlogsData([...data]);
      } catch (error) {
        console.log(error);
      }
    };
    allBlogsData();
  }, []);
  return (
    <>
      <article className="w-[100%] flex flex-col gap-3 items-center justify-center mt-4 py-5 px-2">
        <h3 className='w-100% text-[#272727] text-[40px] font-bold mt-2 mb-2'>Our Recent Posts</h3>
        <article className="flex flex-wrap gap-3 items-center justify-center">
          {blogsData?.length > 0
            ? blogsData?.map((blog, index) => {
                if (index <= 5) {
                  return <BlogCard blogId={blog?.blogId} key={blog?.blogId} />;
                }
              })
            : null}
        </article>
      </article>
    </>
  );
}

export default RecentSection;

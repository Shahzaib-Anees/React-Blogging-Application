import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleData } from "../../../../configs/firebase/firebaseMethods";
import ProfileBlogCard from "../../ProfileComponents/ProfileBlogCard/ProfileBlogCard";

function ProfileSavedBlogs() {
  const { id } = useParams();
  const [savedBlogs, setSavedBlogs] = useState([]);
  console.log(id);
  useEffect(() => {
    const getSavedData = async () => {
      try {
        const response = await getSingleData("users", id);
        const { saved } = response;
        console.log(saved);
        setSavedBlogs(saved);
      } catch (error) {
        console.log(error);
      }
    };
    getSavedData();
  }, []);

  useEffect(() => {
    console.log(savedBlogs);
  }, [savedBlogs]);

  return (
    <>
      <article className="py-3 px-2">
        <h1 className="w-[fit-content] text-3xl font-semibold text-[#542F84] bg-[rgba(0,0,0,0.1)] py-2 px-3 ml-2">
          Saved Blogs
        </h1>

        <div className="flex flex-col gap-3 py-3 px-2 items-center justify-center">
          {savedBlogs?.length > 0 ? (
            savedBlogs.map((blog) => {
              return (
                <ProfileBlogCard
                  key={blog?.blogId}
                  id={blog?.blogId}
                  blogTitle={blog?.blogTitle}
                  blogDescription={blog?.blogDescription}
                  blogImage={blog?.blogImage}
                  creationDate={blog?.blogDate}
                  authorName={blog?.blogAuthor?.name}
                  authorImage={blog?.blogAuthor?.image}
                />
              );
            })
          ) : (
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex items-center justify-center">
              <h1 className="text-3xl text-[#272727] text-center font-bold">No Saved Blog</h1>
            </div>
          )}
        </div>
      </article>
    </>
  );
}

export default ProfileSavedBlogs;

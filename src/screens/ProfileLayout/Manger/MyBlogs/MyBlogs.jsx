import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../../configs/firebase/firebaseConfig";
import { getDocs, collection, query, where } from "firebase/firestore";
import ProfileBlogCard from "../../ProfileComponents/ProfileBlogCard/ProfileBlogCard";
function MyBlogs() {
  const { id } = useParams();
  const [userBlogs, setUserBlogs] = useState([]);

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const q = query(
          collection(db, "blogs"),
          where("blogAuthor.id", "==", `${id}`)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          userBlogs.push(doc.data());
          setUserBlogs([...userBlogs]);
        });
        console.log(userBlogs);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserBlogs();
  }, []);

  useEffect(() => {
    console.log(userBlogs);
  }, [userBlogs]);
  return (
    <>
      <article className="py-3 px-2">
        <h1 className="w-[fit-content] text-3xl font-semibold text-[#542F84] bg-[rgba(0,0,0,0.1)] py-2 px-3 ml-2">
          My Blogs
        </h1>

        <div className="flex flex-col gap-3 py-3 px-2 items-center justify-center">
          {userBlogs ? (
            userBlogs.map((blog) => {
              return (
                <ProfileBlogCard
                  key={blog?.blogId}
                  id={id}
                  blogId={blog?.blogId}
                  blogTitle={blog?.blogTitle}
                  blogDescription={blog?.blogDescription}
                  blogImage={blog?.blogImage}
                  creationDate={blog?.blogDate}
                  authorName={"You"}
                  authorImage={blog?.blogAuthor?.image}
                  updationState="true"
                />
              );
            })
          ) : (
            <h1>No Blogs Saved</h1>
          )}
        </div>
      </article>
    </>
  );
}

export default MyBlogs;

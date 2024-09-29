import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ColNav from "../../../components/ColNav/ColNav";
import { getDocs, collection, query, where } from "firebase/firestore";
import { auth, db } from "../../../configs/firebase/firebaseConfig";
import ProfileCard from "../ProfileComponents/ProfileCard/ProfileCard";
import ProfileBlogCard from "../ProfileComponents/ProfileBlogCard/ProfileBlogCard";
import { FaAngleRight } from "react-icons/fa6";

function ProfileDashboard() {
  const [allBlogData, setAllBlogData] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

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
          allBlogData.push(doc.data());
          setAllBlogData([...allBlogData]);
        });
        console.log(allBlogData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserBlogs();
  }, []);

  return (
    <>
      <div className="flex gap-3 profile-container">
        <div>
          <ProfileCard id={id} />
        </div>
        <div className="w-[fit-content] h-[fit-content] flex flex-col items-center justify-center px-2 gap-[1px] mt-2">
          <div
            className="w-[100%] h-[fit-content] flex items-center justify-center text-3xl text-[#4F3085] font-bold bg-[#fff] py-2 px-3 rounded"
            style={{
              boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
            }}
          >
            Your Blogs
          </div>
          {allBlogData?.length > 0 ? (
            allBlogData.map((blog, index) => {
              if (index < 4) {
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
              }
            })
          ) : (
            <div className="w-[100%] h-[fit-content] flex items-center justify-center text-3xl text-[#4F3085] font-bold bg-[#fff] py-2 px-3 rounded">
              No Blogs Found
            </div>
          )}
          <div className="w-[100%] h-[fit-content] flex items-center justify-end text-xl text-[#4F3085] font-bold py-5 px-3 rounded">
            <Link
              className="flex items-center justify-center gap-2"
              to={`MyBlogs`}
            >
              <span>See All</span>
              <FaAngleRight />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileDashboard;

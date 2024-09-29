import React, { useEffect, useState } from "react";
import { FaEllipsisVertical, FaBookmark } from "react-icons/fa6";
import {
  getSingleData,
  updateDocument,
} from "../../configs/firebase/firebaseMethods";
import { auth } from "../../configs/firebase/firebaseConfig";
import "./SaveBlogButton.css";
function SaveBlogButton({ blogId }) {
  const currentUserId = auth.currentUser?.uid;
  const [savedBlogs, setSavedBlogs] = useState([]);
  // Toggle Save Button
  const [ifToggleSaveBtn, setIfToggleSaveBtn] = useState(false);

  //   Save Blog Post
  useEffect(() => {
    const getCurrentUserData = async () => {
      const userData = await getSingleData("users", currentUserId);
      const { saved } = userData;
      setSavedBlogs([...saved]);
    };
    getCurrentUserData();
  }, []);

  //   Save Blog Post Function
  const saveBlogPost = async () => {
    const trigeredBlogData = await getSingleData("blogs", blogId);
    console.log(trigeredBlogData);
    console.log(savedBlogs);
    for (let savedItems of savedBlogs) {
      if (savedItems?.blogId === trigeredBlogData?.blogId) {
        console.log(savedItems.blogId);
        alert("Already Saved");
        return;
      }
    }
    savedBlogs.push(trigeredBlogData);
    setSavedBlogs([...savedBlogs]);
    console.log(savedBlogs);
    
    const updateDoc = await updateDocument("users", currentUserId, {
      saved: [...savedBlogs],
    });
    console.log(updateDoc);
    console.log(currentUserId);
  };

  useEffect(() => {
    console.log(savedBlogs);
  }, [savedBlogs]);
  return (
    <>
      <div className="relative">
        <button
          className="w-full flex items-center justify-center"
          onClick={() => setIfToggleSaveBtn(!ifToggleSaveBtn)}
        >
          <FaEllipsisVertical className="text-2xl" />
        </button>
        {ifToggleSaveBtn ? (
          <div
            className="absolute top-10 right-3 hidden-save-btn"
            onClick={() => setIfToggleSaveBtn(false)}
          >
            <div
              className="flex items-center justify-center gap-2"
              onClick={saveBlogPost}
            >
              <FaBookmark className="text-xl" />
              Save
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default SaveBlogButton;

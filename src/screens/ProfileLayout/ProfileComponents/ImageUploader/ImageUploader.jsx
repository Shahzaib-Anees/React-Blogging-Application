import React, { useState, useRef, useEffect } from "react";
import { FaCameraRotate } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";
import { auth } from "../../../../configs/firebase/firebaseConfig";
import {
  uploadImage,
  imageDownloadUrl,
  updateDocument,
} from "../../../../configs/firebase/firebaseMethods";
import "./ImageUploader.css";
function ImageUploader({ image }) {
  const [ifImageUploaderCall, setIfImageUploaderCall] = useState(false);
  const userProfileImage = image;
  const newProfileImage = useRef();
  const getNewProfileImage = async (evt) => {
    evt.preventDefault();
    const imageUploaderButton = document.querySelector(
      "#image-uploader-button"
    );
    let image = newProfileImage.current.files[0];
    try {
      imageUploaderButton.setAttribute("disabled", "true");
      imageUploaderButton.classList.add("bg-gray-400");
      imageUploaderButton.innerText = "Saving...";
      const snapshot = await uploadImage("profileImages", image, image.name);
      console.log(snapshot);
      const url = await imageDownloadUrl("profileImages", image.name);
      console.log(url);
      const doc = await updateDocument("users", auth.currentUser?.uid, {
        profileImage: url,
      });
      console.log(doc);
      setIfImageUploaderCall(false);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        location.reload();
      }, 1000);
    }
  };
  return (
    <>
      <div
        id="main-container"
        onMouseEnter={() => {
          const nullEmpty = document.getElementById("null-empty");
          nullEmpty.style.display = "flex";
        }}
        onMouseLeave={() => {
          const nullEmpty = document.getElementById("null-empty");
          nullEmpty.style.display = "none";
        }}
      >
        <div id="image-container">
          <img id="profile-image" src={userProfileImage} alt="profile-image" />
        </div>
        <div id="null-empty">
          <span id="upload-image-icon">
            <FaCameraRotate
              className="text-[20px] text-[#bfbdbd] mb-[4px]"
              onClick={() => setIfImageUploaderCall(true)}
            />
          </span>
        </div>
      </div>
      {/* Image Uploader  */}
      {ifImageUploaderCall ? (
        <div
          className="w-[350px] h-[fit-content] absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]  rounded flex flex-col items-center justify-center p-1 cursor-pointer z-50"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            backgroundColor: "white",
          }}
        >
          <div className="flex justify-end w-[100%] p-2">
            <FaXmark
              className="icon text-[24px] text-[#9e2929] mb-[4px]"
              onClick={() => {
                setIfImageUploaderCall(false);
              }}
            />
          </div>
          <form
            className="flex flex-col items-center justify-center gap-3"
            onSubmit={getNewProfileImage}
          >
            <div className="w-[fit-content]">
              <input type="file" ref={newProfileImage} accept="image/*" />
            </div>
            <button
              id="image-uploader-button"
              type="submit"
              className="w-[100%] bg-[#1F2937] text-[#fff] font-bold p-1 text-[18px] mt-1 mb-3 rounded"
              style={{
                boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
              }}
            >
              Save
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
}

export default ImageUploader;

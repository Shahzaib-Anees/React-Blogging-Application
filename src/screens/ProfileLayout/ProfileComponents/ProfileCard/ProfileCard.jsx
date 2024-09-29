import React, { useState, useEffect } from "react";
import ImageUploader from "../ImageUploader/ImageUploader";
import { useParams } from "react-router-dom";
import {
  getSingleData,
  signOutUser,
} from "../../../../configs/firebase/firebaseMethods";
import { useNavigate } from "react-router-dom";
import { FaPowerOff } from "react-icons/fa6";
import "./ProfileCard.css";
function ProfileCard({ id }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const getuserData = async () => {
      const data = await getSingleData("users", id);
      setUserData(data);
    };
    getuserData();
  }, []);

  const logOutUser = async () => {
    const response = await signOutUser();
    if (response) {
      console.log("Sign Out Successfully");
      navigate("/");
    } else {
      console.log("Sign Out Failed");
    }
  };

  return (
    <>
      <article>
        <div className="profile-card flex flex-col gap-2 items-center justify-center lg:w-[400px] sm:w-[100%] h-[fit-content] bg-[#fff] mt-3 ml-3 py-6 px-3 rounded">
          <ImageUploader image={userData?.profileImage} />
          <h1 className="text-xl font-bold">{userData?.name}</h1>
          <button
            className="w-[100%] flex items-center justify-center gap-[5px] py-2 px-3 mt-2 mb-2 rounded ml-2 text-[#404040] font-semibold bg-[#ededed]"
            onClick={logOutUser}
          >
            <span>
              <FaPowerOff />
            </span>
            <span>Logout</span>
          </button>
        </div>
      </article>
    </>
  );
}

export default ProfileCard;

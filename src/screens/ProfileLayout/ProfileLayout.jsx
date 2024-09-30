import React, { useEffect } from "react";
import ColNav from "../../components/ColNav/ColNav";
import { Outlet } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { auth } from "../../configs/firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
function ProfileLayout() {
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    console.log(auth);
    const checkAuth = async () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log(user);
        } else {
          navigate("/");
        }
      });
    };
    checkAuth();
  }, [id]);
  return (
    <>
      <article className="w-[100%] min-h-[100vh] max-h-[fit-content] flex gap-2 bg-[#f2f2f2]">
        <article className="max-h-[fit-content] flex">
          <div className="col-nav-container">
            <ColNav id={id} />
          </div>
        </article>
        <article className="w-[100%] min-h-[100vh] max-h-[fit-content] flex">
          <Outlet />
        </article>
      </article>
    </>
  );
}

export default ProfileLayout;

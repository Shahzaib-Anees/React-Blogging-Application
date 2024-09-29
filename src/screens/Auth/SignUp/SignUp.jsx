import React, { useRef, useState } from "react";
import "./SignUp.css";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import {
  signUpUser,
  uploadImage,
  imageDownloadUrl,
  addDatainDb,
} from "../../../configs/firebase/firebaseMethods";

function SignUp() {
  const navigate = useNavigate();
  const [userProfileImage, setUserProfileImage] = useState();
  const [ifTrySignUp, setIfTrySignUp] = useState(false);
  const handleImageControl = (evt) => {
    setUserProfileImage(evt.target.files[0]);
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    setIfTrySignUp(true);
    const submitBtn = document.getElementById("submitButton");
    submitBtn.disabled = true;
    submitBtn.classList.add("disabled");
    console.log(data);
    console.log(userProfileImage);
    try {
      const newUser = await signUpUser(data.email, data.password);
      const snapshot = await uploadImage(
        "profileImages",
        userProfileImage,
        `${userProfileImage.name}`
      );
      const imageUrl = await imageDownloadUrl(
        "profileImages",
        `${userProfileImage.name}`
      );

      const userInDb = await addDatainDb("users", newUser.uid, {
        userId: newUser.uid,
        name: data.fullName,
        email: data.email,
        profileImage: imageUrl,
        saved: [],
      });
      console.log(newUser.uid, snapshot, imageUrl, userInDb);
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      reset();
      setIfTrySignUp(false);
      submitBtn.disabled = false;
      submitBtn.classList.remove("disabled");
    }
  };
  return (
    <>
      <article className="w-[100%] min-h-[45vh] max-h-[fit-content] flex flex-col items-center py-8 px-3 bg-[#f2f2f2] relative">
        <div className="w-[100%] h-[100%] flex flex-col gap-2 justify-center items-center lg:w-[40%] sm:w-[100%]">
          <h1 className="text-4xl text-[#4f3085] font-bold">Register</h1>
          <p className="text-[15px] text-[#272727] font-semibold text-center">
            Register yourself to connect with the world of Bloggers and let
            share some exciting and informative chunks with the community
          </p>
        </div>
        <div
          className="lg:w-[550px] sm:w-[90%] h-[fit-content] flex flex-col gap-2 justify-center items-center bg-[#fff] rounded-md py-8 px-8 absolute top-[46%] left-[50%] translate-x-[-50%]"
          style={{
            boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.2)",
          }}
        >
          <form
            className="w-[100%] flex flex-col gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-1">
              <label
                className="text-[14px] text-[#272727] font-semibold"
                htmlFor="fullName"
              >
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                placeholder="enter your full name"
                className="inputField"
                {...register("fullName", { required: true })}
              />
              {errors.fullName && (
                <span className="error-text">This field is required</span>
              )}
            </div>
            <div className="flex flex-col gap-[2px]">
              <label
                className="text-[14px] text-[#272727] font-semibold"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="enter your email"
                className="inputField"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="error-text">This field is required</span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label
                className="text-[14px] text-[#272727] font-semibold"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="enter a strong password"
                className="inputField"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="error-text">This field is required</span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label
                className="text-[14px] text-[#272727] font-semibold"
                htmlFor="passwordConfirm"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="passwordConfirm"
                placeholder="enter a strong password"
                className="inputField"
                {...register("passwordConfirm", {
                  required: true,
                  validate: (value) => value === getValues().password,
                })}
              />
              {errors.passwordConfirm && (
                <span className="error-text">
                  Confirm Password is required and mush match password
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Profile Image
              </label>
              <input
                type="file"
                className="mt-1 mb-1"
                accept="image/*"
                {...register("profileImage", { required: true })}
                onChange={handleImageControl}
              />
              {errors.profileImage && (
                <span className="error-text">This field is required</span>
              )}
            </div>
            <div className="flex flex-col gap-1 mt-1 mb-1">
              <p className="text-[13px] text-[#272727] font-bold">
                Already have an account
                <Link to="/Signin" className="py-1 px-2 ml-1 bg-[#e2e2e2]">
                  Login
                </Link>
              </p>
            </div>
            <button
              type="submit"
              className="w-[100%] bg-[#4f3085] text-[#fff] py-2 font-bold rounded"
              id="submitButton"
            >
              {ifTrySignUp ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
        </div>
      </article>
    </>
  );
}

export default SignUp;

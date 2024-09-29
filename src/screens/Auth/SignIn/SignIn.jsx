import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { signInUser } from "../../../configs/firebase/firebaseMethods";
function SignIn() {
  const navigate = useNavigate();
  const [ifTrySignIn, setIfTrySignIn] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    setIfTrySignIn(true);
    const submitBtn = document.getElementById("submitButton");
    submitBtn.disabled = true;
    submitBtn.classList.add("disabled");
    console.log(data);
    try {
      const user = await signInUser(data.email, data.password);
      console.log(user.uid);
      console.log("Sign In Successfully");
    } catch (error) {
      console.log(error);
      console.log("Sign In Failed");
    } finally {
      reset();
      setIfTrySignIn(false);
      submitBtn.disabled = false;
      submitBtn.classList.remove("disabled");
      navigate("/");
    }
  };
  return (
    <>
      <article className="w-[100%] min-h-[45vh] max-h-[fit-content] flex flex-col items-center py-8 px-3 bg-[#f2f2f2] relative">
        <div className="w-[100%] h-[100%] flex flex-col gap-2 justify-center items-center lg:w-[40%] sm:w-[100%]">
          <h1 className="text-4xl text-[#4f3085] font-bold">Log In</h1>
          <p className="text-[15px] text-[#272727] font-semibold text-center">
            Welcome back blogger ! Let reume your connect with the world of
            Bloggers and let share some exciting and informative chunks with the
            community
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
                placeholder="enter you password"
                className="inputField"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="error-text">This field is required</span>
              )}
            </div>
            <div className="flex gap-1 items-center justify-between mt-1 mb-1">
              <p className="text-[13px] text-[#272727] font-bold">
                Dont't have an account
                <Link to="/Signup" className="py-1 px-2 ml-1 bg-[#e2e2e2]">
                  Sign Up
                </Link>
              </p>

              <p className="text-[13px] text-[#3030b3] font-bold">
                Forgot Password?
              </p>
            </div>
            <button
              type="submit"
              className="w-[100%] bg-[#4f3085] text-[#fff] py-2 font-bold rounded"
              id="submitButton"
            >
              {ifTrySignIn ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
      </article>
    </>
  );
}

export default SignIn;

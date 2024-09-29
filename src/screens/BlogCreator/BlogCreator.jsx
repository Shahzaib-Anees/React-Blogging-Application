import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { auth } from "../../configs/firebase/firebaseConfig";
import {
  addDatainDb,
  getSingleData,
  uploadImage,
  imageDownloadUrl,
} from "../../configs/firebase/firebaseMethods";
function BlogCreator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ifTryCreateBlog, setIfTryCreateBlog] = useState(false);
  const [blogImage, setBlogImage] = useState(null);
  const [currentUser, setCurrentUser] = useState({});

  const handleBlogImageControl = (evt) => {
    console.log(evt.target.files[0]);
    setBlogImage(evt.target.files[0]);
  };
  //  Getting Present User Id
  useEffect(() => {
    const getData = async () => {
      const data = await getSingleData("users", id);
      setCurrentUser(data);
      console.log(data);
    };
    getData();
  }, []);

  function generateRandomId() {
    const randomId = [];
    for (let i = 0; i < 29; i++) {
      randomId.push(Math.floor(Math.random() * 10));
    }
    const id = randomId.join("");
    console.log(id);
    return id;
  }
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    const submitButton = document.getElementById("submitButton");
    submitButton.disabled = true;
    submitButton.classList.add("disabled");
    setIfTryCreateBlog(true);
    console.log(blogImage);

    try {
      // Images Upload in Storage
      const snapshot = await uploadImage(
        "blogImages",
        blogImage,
        blogImage.name
      );
      console.log(snapshot);
      // Image Url
      const downloadUrl = await imageDownloadUrl("blogImages", blogImage.name);
      console.log(downloadUrl);
      const generatedId = generateRandomId();
      console.log(generatedId);

      // Blog Data in Database
      const blogInDb = await addDatainDb("blogs", generatedId, {
        blogId: generatedId,
        blogTitle: data.blogTitle,
        blogDescription: data.blogDescription,
        blogImage: downloadUrl,
        blogDate: new Date().toLocaleDateString(),
        blogTime: new Date().toLocaleTimeString(),
        blogAuthor: {
          name: currentUser.name,
          email: currentUser.email,
          image: currentUser.profileImage,
          id: auth.currentUser?.uid,
        },
      });
      console.log(blogInDb);
    } catch (err) {
      console.log(err);
    } finally {
      submitButton.disabled = false;
      submitButton.classList.remove("disabled");
      setIfTryCreateBlog(false);
      reset();
      setBlogImage(null);
      setTimeout(() => {
        navigate("/blogs");
      }, 500);
    }
    console.log(data);
  };
  return (
    <>
      <article className="w-[100%] min-h-[45vh] max-h-[fit-content] flex flex-col items-center gap-5 py-8 px-3 bg-[#f2f2f2]">
        <div className="w-[fit-content] h-[fit-content] flex flex-col gap-2 items-center lg:w-[60%] sm:w-[100%]">
          <h1 className="text-4xl text-[#4f3085] font-bold">Create Blog</h1>
          <p className="text-[15px] text-[#272727] font-semibold text-center">
            Hey Blogger ! Let create some exciting and informative chunks with
            the community . Whether you’re an artist, writer, or simply someone
            looking to explore new passions, you’ll find a wealth of content
            designed to spark your imagination. Join me on this exciting
            journey, and let’s inspire each other to create something amazing!
          </p>
        </div>
        <div
          className="lg:w-[550px] sm:w-[90%] h-[fit-content] flex flex-col gap-2 justify-center items-center bg-[#fff] rounded-md py-8 px-8"
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
                Blog Title
              </label>
              <input
                type="text"
                name="blogTitle"
                placeholder="title your blog"
                className="inputField"
                {...register("blogTitle", { required: true })}
              />
              {errors.blogTitle && (
                <span className="error-text">This field is required</span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label
                className="text-[14px] text-[#272727] font-semibold"
                htmlFor="password"
              >
                Blog Description
              </label>
              <textarea
                placeholder="describe your blog"
                className="inputField"
                rows="5"
                {...register("blogDescription", { required: true })}
              />
              {errors.blogDescription && (
                <span className="error-text">This field is required</span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Blog Image
              </label>
              <input
                type="file"
                className="mt-1 mb-1"
                accept="image/*"
                {...register("blogImage", { required: true })}
                onChange={handleBlogImageControl}
              />
              {errors.blogImage && (
                <span className="error-text">This field is required</span>
              )}
            </div>
            <button
              type="submit"
              className="w-[100%] bg-[#4f3085] text-[#fff] py-2 font-bold rounded"
              id="submitButton"
            >
              {ifTryCreateBlog ? "Creating Blog ..." : "Create Blog"}
            </button>
          </form>
        </div>
      </article>
    </>
  );
}

export default BlogCreator;

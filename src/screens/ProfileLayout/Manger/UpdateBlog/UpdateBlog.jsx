import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  getSingleData,
  updateDocument,
  uploadImage,
  imageDownloadUrl,
} from "../../../../configs/firebase/firebaseMethods";

function UpdateBlog() {
  const [ifTryCreateBlog, setIfTryCreateBlog] = useState(false);
  const [newBlogImage, setNewBlogImage] = useState(null);
  const [prevBlogTitle, setPrevBlogTitle] = useState(null);
  const [prevBlogDescription, setPrevBlogDescription] = useState(null);
  const [prevBlogImage, setPrevBlogImage] = useState(null);
  const { id, blogId } = useParams();
  const [newImageUrl, setNewImageUrl] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    //   Getting Previuos Data
    const getBlogPrevData = async () => {
      try {
        const previouData = await getSingleData("blogs", blogId);
        const { blogTitle, blogDescription, blogImage } = previouData;
        setPrevBlogTitle(blogTitle);
        setPrevBlogDescription(blogDescription);
        setPrevBlogImage(blogImage);
        console.log(prevBlogTitle, prevBlogDescription, prevBlogImage);
      } catch (error) {
        console.log(error);
      }
    };
    getBlogPrevData();
  }, []);

  useEffect(() => {
    console.log("Update hua hai");
  }, [newImageUrl]);

  //   Image Handlers
  const handleBlogImageControl = (evt) => {
    console.log(evt.target.files[0]);
    setNewBlogImage(evt.target.files[0]);
    console.log(newBlogImage);
  };

  const uploadNewImage = async () => {
    if (typeof newBlogImage !== "string") {
      try {
        const image = await uploadImage(
          "blogImages",
          newBlogImage,
          newBlogImage.name
        );
        const url = await imageDownloadUrl("blogImages", newBlogImage.name);
        console.log(url);
        setNewImageUrl(url);
        return newImageUrl;
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Update Blog
  const updateBlog = async (
    title = prevBlogTitle,
    description = prevBlogDescription,
    image = prevBlogImage
  ) => {
    if(!title || !description || !image) {
      console.log("Please fill all the fields");
      return;
    }
    try {
      const blogUpdate = await updateDocument("blogs", blogId, {
        blogTitle: title,
        blogDescription: description,
        blogImage: image,
      });
      console.log(blogUpdate);
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = (data) => {
    setIfTryCreateBlog(true);
    console.log(data);
    uploadNewImage();
    console.log(newImageUrl);
    updateBlog(data.blogTitle, data.blogDescription, newImageUrl);
  };

  return (
    <>
      <>
        <article className="w-[100%] min-h-[45vh] max-h-[fit-content] flex flex-col items-center gap-5 py-8 px-3 bg-[#f2f2f2]">
          <div className="w-[fit-content] h-[fit-content] flex flex-col gap-2 items-center lg:w-[60%] sm:w-[100%]">
            <h1 className="text-4xl text-[#4f3085] font-bold">Update Blog</h1>
            <p className="text-[15px] text-[#272727] font-semibold text-center">
              Hey Blogger ! You're are going to update your blog.
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
                  {...register("blogTitle")}
                />
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
                  {...register("blogDescription")}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Blog Image
                </label>
                <input
                  type="file"
                  className="mt-1 mb-1"
                  accept="image/*"
                  {...register("blogImage")}
                  onChange={handleBlogImageControl}
                />
              </div>
              <button
                type="submit"
                className="w-[100%] bg-[#4f3085] text-[#fff] py-2 font-bold rounded"
                id="submitButton"
              >
                {ifTryCreateBlog ? "Updating Blog ..." : "Update Blog"}
              </button>
            </form>
          </div>
        </article>
      </>
    </>
  );
}

export default UpdateBlog;

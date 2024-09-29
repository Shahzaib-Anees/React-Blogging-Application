import React from "react";

function BlogCard({
  title,
  description,
  image,
  profieImage,
  profileName,
  date,
}) {
  return (
    <>
      <article className="flex flex-col gap-2 justify-center w-[80%]">
        <div className="w-[100%] h-[fitt-content]">
          <img className="w-[100%] h-[100%]" src={image} alt="blog-img" />
        </div>
        <div>
          <div>
            <h3 className="text-3xl ml-3">{title}</h3>
            <p>{description}</p>
          </div>
          <div className="flex items-center justify-between gap-2 w-[fit-content] ml-2 py-1 px-2">
            <div className="flex items-center justify-center">
              <img
                src={profieImage}
                alt="user-img"
                className="w-[50px] h-[50px] rounded-full"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h5 className="text-[15px] text-[#272727] font-semibold">
                {profileName}
              </h5>
              <p className="text-[12px] text-[#272727] font-semibold">
                Created On-
                <span>{Date}</span>
              </p>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

export default BlogCard;

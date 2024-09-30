import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Layout from "./Layout.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HeroSection from "./components/HeroSection/HeroSection";
import SignUp from "./screens/Auth/SignUp/SignUp";
import SignIn from "./screens/Auth/SignIn/SignIn";
import ProfileLayout from "./screens/ProfileLayout/ProfileLayout";
import ProfileDashboard from "./screens/ProfileLayout/ProfileDashboard/ProfileDashboard";
import BlogCreator from "./screens/BlogCreator/BlogCreator";
import AllBlogs from "./screens/AllBlogs/AllBlogs";
import SingleBlog from "./screens/SingleBlog/SingleBlog";
import ProfileSavedBlogs from "./screens/ProfileLayout/Manger/ProfileSavedBlogs/ProfileSavedBlogs";
import MyBlogs from "./screens/ProfileLayout/Manger/MyBlogs/MyBlogs";
import UpdateBlog from "./screens/ProfileLayout/Manger/UpdateBlog/UpdateBlog";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HeroSection />,
      },
      {
        path: "Signup",
        element: <SignUp />,
      },
      {
        path: "Signin",
        element: <SignIn />,
      },
      {
        path: "Profile/:id",
        element: <ProfileLayout />,
        children: [
          {
            index: true,
            element: <ProfileDashboard />,
          },
          {
            path: "CreateBlog",
            element: <BlogCreator />,
          },
          {
            path: "SavedBlogs",
            element: <ProfileSavedBlogs />,
          },
          {
            path: "MyBlogs",
            element: <MyBlogs />,
          },
          {
            path: "UpdateBlog/:blogId",
            element: <UpdateBlog />,
          },
        ],
      },
      {
        path: "blogs",
        element: <AllBlogs />,
      },
      {
        path: "SingleBlog/:blogId",
        element: <SingleBlog />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

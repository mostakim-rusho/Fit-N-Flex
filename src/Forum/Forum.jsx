import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ImArrowRight2 } from "react-icons/im";
import { Link } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";
import useAuth from "../Hooks/useAuth";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";

const Forum = () => {
  const [blogs, setBlogs] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["forum", currentPage],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/forum?page=${currentPage - 1}`);
      setBlogs(data.blogs);
      setCount(data.totalBlogs);
      return data;
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (voting) => {
      const { data } = await axiosSecure.patch(
        `/voteBlog?email=${user?.email}`,
        voting
      );
      return data;
    },
    onSuccess: () => {
      refetch();
    },
  });

  const pages = [...Array(Math.ceil(parseInt(count) / 6)).keys()];

  const handleVote = async (vote, id, email) => {
    if (!user) return toast.error("Please login first!");

    const voting = { vote, id, email };
    try {
      await mutateAsync(voting);
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );

  return (
    <div className="min-h-[60vh] py-8 md:py-12 lg:py-16">
      <Helmet>
        <title>Forum | Fit N Flex Arena</title>
      </Helmet>
      <div className="container mx-auto">
        <h2 className="mb-8 text-center text-3xl font-semibold text-amber-500">
          Latest Forum Posts
        </h2>
        <p className="mb-8 text-center text-gray-700">
          Stay updated with the newest discussions and topics in our community.
          Join conversations, share insights, and connect with fellow fitness
          enthusiasts!
        </p>
        <div className="mx-auto flex max-w-[1440px] flex-wrap justify-center gap-8">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="card w-full max-w-sm rounded-lg border border-amber-500 shadow-xl transition-shadow duration-300 hover:shadow-amber-300"
            >
              <img
                src={blog.image}
                alt="Card img"
                className="h-56 w-full rounded-t-lg object-cover object-center"
              />
              <div className="flex flex-col flex-grow justify-between p-6">
                <div >
                  <div className="mb-4 flex items-center justify-between">
                    <p>
                      <span className="inline-block border-b-2 border-amber-500 text-sm font-bold capitalize">
                        {blog.author}
                      </span>
                      <span className="ms-3 rounded-sm bg-amber-500 px-1 py-0.5 text-xs font-semibold uppercase text-white">
                        {blog.role}
                      </span>
                    </p>
                    <p className="text-xs text-gray-500">{blog.postDate}</p>
                  </div>
                  <h3 className="mb-4 text-2xl font-black leading-tight text-gray-900">
                    {blog.title}
                  </h3>
                  <p className="text-gray-700 ">
                    {blog.description.slice(0, 100)} . . . . . .
                  </p>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <Link
                    to={`/forumDetails/${blog._id}`}
                    className="flex items-center gap-1 text-base font-black uppercase text-amber-500 hover:underline"
                  >
                    Read More <ImArrowRight2 />
                  </Link>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() =>
                        handleVote("like", blog._id, user?.email)
                      }
                      className="flex h-8 items-center gap-1 rounded-md border border-gray-400 px-3 py-1.5 text-center text-sm hover:scale-105 hover:text-green-600 hover:shadow lg:gap-2"
                    >
                      <FaThumbsUp />
                      <span>{blog.likes}</span>
                    </button>
                    <button
                      onClick={() =>
                        handleVote("dislike", blog._id, user?.email)
                      }
                      className="flex h-8 items-center gap-1 rounded-md border border-gray-400 px-3 py-1.5 text-center text-sm hover:scale-105 hover:text-red-600 hover:shadow lg:gap-2"
                    >
                      <FaThumbsDown />
                      <span>{blog.dislikes}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center md:mt-12 lg:mt-16">
          {blogs && (
            <ul className="flex space-x-2">
              <li>
              <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className={`${
                      currentPage === 1
                        ? "cursor-not-allowed bg-gray-300 text-gray-700"
                        : "bg-gray-300 text-gray-700 hover:bg-opacity-80"
                    } rounded-l-lg px-4 py-2 focus:outline-none`}
                    disabled={currentPage === 1}
                  >
                    Prev
                  </button>
              </li>
              {pages.map((page) => (
                <li key={page}>
                  <button
                      onClick={() => setCurrentPage(page + 1)}
                      className={`${
                        currentPage === page + 1
                          ? "bg-amber-500 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-opacity-80"
                      } px-4 py-2 focus:outline-none`}
                    >
                      {page + 1}
                    </button>
                </li>
              ))}
              <li>
              <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className={`${
                      currentPage === pages.length
                        ? "cursor-not-allowed bg-gray-300 text-gray-700"
                        : "bg-gray-300 text-gray-700 hover:bg-opacity-80"
                    } rounded-r-lg px-4 py-2 focus:outline-none`}
                    disabled={currentPage === pages.length}
                  >
                    Next
                  </button>
              </li>
            </ul>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Forum;

import { useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";

const ForumDetails = () => {
  const blog = useLoaderData();

  return (
    <div className="container mx-auto">
      <Helmet>
        <title>Forum Details | Fit N Flex Arena</title>
      </Helmet>
      <div className="mx-auto max-w-screen-xl p-4 sm:p-10 md:p-16">
        <div
          className="overflow-hidden rounded-3xl border border-amber-500 bg-cover bg-center text-center shadow-lg shadow-amber-200"
          style={{ minHeight: "500px", backgroundImage: `url(${blog.image})` }}
          title="Blog Image"
        ></div>
        <div className="mx-auto max-w-3xl pt-3">
          <div className="mt-3 flex flex-col justify-between rounded-lg bg-white p-4">
            <div className="rounded-lg border border-amber-500 bg-white p-6 shadow-lg shadow-amber-500">
              <h1 className="mb-2 pt-3 text-3xl font-bold text-gray-900">
                {blog.title}
              </h1>
              <div className="mt-6 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={blog.author_img}
                    alt="Author"
                    className="h-10 w-10 rounded-full"
                  />
                  <div>
                    <p className="text-md font-medium text-gray-900">
                      Written By: <span>{blog.author}</span>
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      {blog.postDate}
                    </p>
                  </div>
                </div>
                <span className="rounded bg-amber-500 px-2 py-0.5 text-sm font-semibold uppercase text-white">
                  {blog.role}
                </span>
              </div>

              <div className="my-4 h-px bg-black"></div>

              <p className="my-5 text-base leading-8 opacity-80">
                {blog.description}
              </p>

              <div className="my-4 h-px bg-black"></div>

              <div className="flex flex-wrap items-center gap-2">
                {blog.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <button className="flex items-center gap-1 rounded-md border border-gray-400 px-3 py-1.5 text-sm hover:scale-105 hover:text-green-600 hover:shadow">
                  <FaThumbsUp></FaThumbsUp>

                  <span>{blog.likes}</span>
                </button>

                <button className="flex items-center gap-1 rounded-md border border-gray-400 px-3 py-1.5 text-sm hover:scale-105 hover:text-red-600 hover:shadow">
                  <FaThumbsDown></FaThumbsDown>
                  <span>{blog.dislikes}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumDetails;

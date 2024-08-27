import { Link } from "react-router-dom";
import { ImArrowRight2 } from "react-icons/im";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const LatestCommunityPosts = () => {
  const axiosPublic = useAxiosPublic();

  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/blogs");
      return data;
    },
  });

  return (
    <section className="my-20 rounded-3xl border border-amber-500 py-12 shadow-xl shadow-amber-200">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-3xl font-semibold text-amber-500">
          Latest Community Posts
        </h2>
        <p className="mb-8 text-center text-gray-700">
          Stay updated with the newest discussions and topics in our community.
          Join conversations, share insights, and connect with fellow fitness
          enthusiasts!
        </p>
        {isLoading ? (
          <div className="flex justify-center">
            <span className="loading loading-dots loading-lg"></span>
          </div>
        ) : (
          <div className="mx-auto grid grid-cols-1 justify-center gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="card w-full rounded-lg border border-amber-500 shadow-xl transition-shadow duration-300 hover:shadow-amber-300"
              >
                <img
                  src={blog.image}
                  alt="Card img"
                  className="h-56 w-full rounded-t-lg object-cover object-center"
                />
                <div className="flex flex-grow flex-col justify-between p-6">
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <p className="inline-block border-b-2 border-amber-500 text-xl font-bold capitalize">
                        {blog.author}
                        <span className="ml-4 rounded-sm bg-amber-500 px-2 py-0.5 text-sm font-semibold uppercase text-white">
                          {blog.role}
                        </span>
                      </p>
                      <p className="text-xs text-gray-500">{blog.postDate}</p>
                    </div>
                    <h3 className="mb-4 text-2xl font-black leading-tight text-gray-900">
                      {blog.title}
                    </h3>
                    <p className="text-gray-700">
                      {blog.description.slice(0, 100)}...
                    </p>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Link
                      to={`/forumDetails/${blog._id}`}
                      className="flex items-center gap-1 text-base font-black uppercase text-amber-500 hover:underline"
                    >
                      Read More <ImArrowRight2 />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestCommunityPosts;

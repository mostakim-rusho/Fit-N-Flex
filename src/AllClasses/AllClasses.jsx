import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import ClassCard from "./ClassCard";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const AllClasses = () => {
  const [allClasses, setAllClasses] = useState([]);
  const [search, setSearch] = useState("");
  const [totalClass, setTotalClass] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const axiosPublic = useAxiosPublic();

  const { data = {}, isLoading } = useQuery({
    queryKey: ["allClasses", currentPage, search],
    queryFn: async () => {
      const { data } = await axiosPublic.get(
        `/classes?page=${currentPage - 1}&search=${search}`,
      );
      setAllClasses(data.result);
      setTotalClass(data.matchedTrainers);
      return data;
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const searchText = form.search.value;
    setSearch(searchText);
    setCurrentPage(1);
  };

  const pages = [...Array(Math.ceil(parseInt(totalClass) / 6)).keys()];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>All Classes | Fit N Flex Arena</title>
      </Helmet>
      <div className="container mx-auto py-8">
        <div className="mb-12 flex justify-center">
          <form onSubmit={handleSearch} className="flex max-w-lg items-center">
            <input
              type="search"
              name="search"
              id="input-9"
              className="h-10 w-full rounded-l border border-r-0 border-amber-500 px-3 text-sm text-gray-700 shadow-sm focus:outline-none"
              placeholder="Search class name"
            />
            <button className="h-10 rounded-r border border-l-0 border-amber-500 bg-amber-500 px-4 text-sm text-white shadow-sm hover:bg-opacity-80 focus:outline-none">
              Search
            </button>
          </form>
        </div>

        {!isLoading && allClasses.length === 0 ? (
          <div className="flex h-[30vh] items-center justify-center">
            <p className="text-3xl text-red-500">
              No class found
            </p>
          </div>
        ) : isLoading ? (
          <div className="flex justify-center">
            <span className="loading loading-dots loading-lg"></span>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {allClasses.map((item) => (
                <ClassCard key={item._id} item={item} />
              ))}
            </div>

            <div className="mt-8 flex justify-center">
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
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllClasses;

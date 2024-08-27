import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const FeaturedClasses = () => {
  const axiosPublic = useAxiosPublic();

  // Fetch featured classes data using react-query
  const { data: featuredClasses = [], isLoading } = useQuery({
    queryKey: ["featuredClasses"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/featuredClass");
      return data;
    },
  });

  return (
    <section className="my-10 rounded-3xl border border-amber-500 py-12 shadow-xl shadow-amber-200 md:my-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-6 text-center text-3xl font-semibold text-amber-500">
          Featured Classes
        </h2>
        <p className="mb-6 text-center text-gray-700">
          Discover a variety of engaging fitness classes at Fit N Flex Arena. From yoga
          to HIIT, our expert-led sessions cater to all levels and keep you
          motivated.
        </p>
        {isLoading ? (
          <div className="flex justify-center">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredClasses.map((item) => (
              <div
                key={item.id}
                className="flex flex-col overflow-hidden rounded-lg border border-amber-500 shadow-xl transition-shadow duration-300 hover:shadow-amber-300"
              >
                <div
                  className="h-48 bg-cover bg-center md:h-64 lg:h-72"
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                  <div className="flex h-full w-full items-center justify-center bg-black bg-opacity-50 text-2xl font-bold text-white">
                    {item.name}
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <span className="mb-2 inline-block rounded-full bg-black bg-opacity-75 px-2 py-1 text-white">
                      {item.totalBooking} Bookings
                    </span>
                    <h3 className="mb-2 mt-3 text-xl font-medium text-amber-500">
                      {item.name}
                    </h3>
                    <p className="text-gray-700">
                      {item.description.slice(0, 80)}...
                    </p>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Link
                      to="/allClasses"
                      className="text-lg font-medium text-amber-500 hover:text-amber-700"
                    >
                      View Details
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

export default FeaturedClasses;

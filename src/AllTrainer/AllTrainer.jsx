import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const AllTrainer = () => {
  const axiosPublic = useAxiosPublic();

  const { data: trainers = [], isLoading } = useQuery({
    queryKey: ["trainers"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/allTrainers");
      return data;
    },
  });

  if (isLoading)
    return (
      <div className="mt-20 flex justify-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );

  if (trainers.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-2xl font-semibold text-red-600">
          No Trainers Available
        </p>
      </div>
    );
  }

  return (
    <section className="my-20 rounded-3xl border border-amber-500 py-12 shadow-xl shadow-amber-200">
      <div className="min-h-[60vh] px-4">
        <Helmet>
          <title>All Trainer | Fit N Flex Arena</title>
        </Helmet>
        <div className="container mx-auto">
          <h2 className="mb-8 text-center text-3xl font-semibold text-amber-500">
            All Trainers
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {trainers.map((trainer) => (
              <div key={trainer._id}>
                <div className="card h-full rounded-lg border border-amber-500 shadow-xl transition-shadow duration-300 hover:shadow-amber-300">
                  <img
                    src={trainer?.photoUrl}
                    alt={trainer?.name}
                    className="h-56 w-full rounded-t-lg object-cover object-center"
                  />
                  <div className="flex h-full flex-col p-6">
                    <h3 className="mb-2 text-xl font-semibold text-gray-900">
                      {trainer?.name}
                    </h3>
                    <p className="mb-4 text-sm text-gray-700">
                      Experience: {trainer?.experience} year
                    </p>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {trainer.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="rounded-full border bg-amber-500 px-3 py-1 font-semibold text-white"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="flex-grow"></div>
                    <div className="flex items-center justify-between">
                      <Link
                        to={`/trainerDetails/${trainer._id}`}
                        className="btn bg-gradient-to-r from-[#DC5F00] to-[#d39361] text-white hover:bg-gradient-to-r hover:from-[#d39361] hover:to-[#DC5F00]"
                      >
                        Know More
                      </Link>
                      <div className="flex space-x-3">
                        <Link to={`#`} className="text-gray-600">
                          <FontAwesomeIcon icon={faGithub} size="lg" />
                        </Link>
                        <Link to={`#`} className="text-gray-600">
                          <FontAwesomeIcon icon={faTwitter} size="lg" />
                        </Link>
                        <Link to={`#`} className="text-gray-600">
                          <FontAwesomeIcon icon={faInstagram} size="lg" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllTrainer;

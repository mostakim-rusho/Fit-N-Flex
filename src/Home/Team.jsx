import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import TeamCard from "./TeamCard";

const Team = () => {
  const axiosPublic = useAxiosPublic();

  const { data: teams = [], isLoading } = useQuery({
    queryKey: ["teams"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/teams");
      return data;
    },
  });

  return (
    <section className="my-20 rounded-3xl border border-amber-500 py-12 shadow-xl shadow-amber-200">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-3xl font-semibold text-amber-500">
          Meet Our Expert Team
        </h2>
        <p className="mb-8 text-center text-gray-700">
          Our team of dedicated fitness professionals is here to guide you on
          your fitness journey. With diverse expertise in personal training,
          nutrition, and wellness, we're committed to helping you achieve your
          health and fitness goals.
        </p>

        {isLoading ? (
          <div className="flex justify-center">
            <span className="loading loading-dots loading-lg"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {teams.map((team) => (
              <TeamCard key={team._id} team={team} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Team;

import { Link, useLoaderData } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const TrainerDetails = () => {
  const axiosPublic = useAxiosPublic();

  const trainer = useLoaderData();

  const { data: slots = [], isLoading } = useQuery({
    queryKey: ["slots", trainer?._id],
    enabled: !!trainer,
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/trainerSlots/${trainer?._id}`);
      return data;
    },
  });

  if (isLoading)
    return (
      <div className="mt-20 flex justify-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );

  return (
    <div className="">
      <Helmet>
        <title>Trainer Details | Fit N Flex Arena</title>
      </Helmet>
      <div className="container mx-auto py-16">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-lg border border-amber-500 bg-white shadow-xl shadow-amber-200 lg:flex">
          <div className="lg:relative lg:w-1/2">
            <img
              className="h-64 w-full object-cover object-center lg:h-full"
              src={trainer?.photoUrl}
              alt={trainer?.name}
            />
          </div>
          <div className="px-6 py-12 lg:flex-1">
            <h2 className="mb-4 text-3xl font-semibold text-amber-500">
              {trainer?.name}
            </h2>
            <p className="mb-2 text-gray-700">
              Experience: {trainer?.experience} year
            </p>
            <div className="mb-4 flex flex-wrap gap-2">
              {trainer?.skills?.length > 0 ? (
                trainer.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="rounded-full border border-amber-200 px-3 py-1 text-xs font-medium text-amber-500 shadow-sm"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-sm text-gray-500">No skills listed</p>
              )}
            </div>
            <p className="mb-6 text-gray-700">{trainer?.biography}</p>
            <div className="flex gap-4">
              <Link to="#" className="text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#718096"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-github"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </Link>
              <Link to="#" className="text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#718096"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-twitter"
                >
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </Link>
              <Link to="#" className="text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#718096"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-instagram"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 overflow-x-auto">
          {slots.length === 0 ? (
            <p className="py-8 text-center text-4xl font-bold text-red-500">
              No Slots Available!
            </p>
          ) : (
            <table className="mt-8 w-full overflow-hidden rounded-lg border border-amber-500">
              <thead className="bg-amber-500 text-white">
                <tr>
                  <th className="px-6 py-3 text-left">Day</th>
                  <th className="px-6 py-3 text-left">Slot Name</th>
                  <th className="px-6 py-3 text-left">Slot Time</th>
                  <th className="px-6 py-3 text-left">Classes</th>
                  <th className="px-6 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {slots.map(
                  (slot, index) => (
                    console.log(slot),
                    (
                      <tr key={index} className="bg-white">
                        <td className="px-6 py-4">{slot.day}</td>
                        <td className="px-6 py-4">{slot.slotName}</td>
                        <td className="px-6 py-4">{slot.slotTime} hr</td>
                        <td className="px-6 py-4">
                          {/* {slot.classesName.map((cls, i) => (
                        <span
                          key={i}
                          className="mr-2 inline-block rounded-full bg-amber-500 px-2 py-1 font-medium text-white"
                        >
                          {cls}
                        </span>
                      ))} */}
                          {
                            <span
                              className="mr-2 inline-block rounded-full bg-amber-500 px-2 py-1 font-medium text-white"
                              key={slot.className}
                            >
                              {slot.className}
                            </span>
                          }
                        </td>
                        <td className="px-6 py-4">
                          <Link
                            to={`/booking/${trainer._id}`}
                            state={{
                              day: slot.day,
                              sTime: slot.slotTime,
                              sName: slot.slotName,
                              slotId: slot._id,
                              className: slot.className,
                            }}
                            className="btn border border-amber-500 bg-amber-500 text-lg text-white hover:border-amber-500 hover:bg-transparent hover:text-amber-500"
                          >
                            Book <MdKeyboardArrowRight className="inline" />
                          </Link>
                        </td>
                      </tr>
                    )
                  ),
                )}
              </tbody>
            </table>
          )}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            to="/becomeATrainer"
            className="btn btn-outline border-2 border-amber-500 bg-transparent text-xl text-amber-500 hover:border-amber-500 hover:bg-amber-500 hover:text-white"
          >
            Become a Trainer
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrainerDetails;

import { IoEyeOutline } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import { Helmet } from "react-helmet-async";

const ActivityLog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data = [], isLoading } = useQuery({
    queryKey: ["activeLogs", user?.email],
    enabled: !loading && !!user,
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/activityLogs/${user?.email}?email=${user?.email}`,
      );
      return data;
    },
  });

  function open(msg) {
    setMessage(msg);
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  if (loading || isLoading)
    return (
      <div className="flex justify-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );

  if (data.length === 0)
    return (
      <div className="flex min-h-[70vh] w-full items-center justify-center">
        <p className="text-3xl font-medium text-gray-700 md:text-4xl lg:text-5xl">
          You haven't any activity
        </p>
      </div>
    );

  return (
    <section className="my-20 rounded-3xl border border-amber-500 py-12 shadow-xl shadow-amber-200">
      <Helmet>
        <title>Activity Log | Fit N Flex Arena</title>
      </Helmet>
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-3xl font-semibold text-amber-500">
          Activity Log
        </h2>
        <p className="mb-8 text-center text-gray-700">
          Review your latest activities and logs.
        </p>
        <div className="flex w-full items-center justify-center">
          <div className="card w-full shadow-xl md:w-3/4 lg:w-full">
            <div className="overflow-x-auto">
              <table className="w-full table-auto rounded-xl border border-amber-500 shadow-amber-200">
                <thead className="bg-amber-500 text-white">
                  <tr>
                    <th className="p-4">#</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((trainer, index) => (
                    <tr
                      key={index}
                      className="border-2 bg-white text-center hover:border-amber-500 hover:bg-gray-100 hover:shadow-md"
                    >
                      <td className="p-4">{index + 1}</td>
                      <td className="p-4">{trainer?.name}</td>
                      <td className="p-4">{trainer?.email}</td>
                      <td className="p-4">
                        {trainer?.status === "rejected"
                          ? "Rejected"
                          : trainer?.status === "pending"
                            ? "Pending"
                            : "No Application"}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => open(trainer?.feedback)}
                          className="border-1 btn btn-outline border-amber-500 bg-red-300 text-xl hover:border-amber-500 hover:bg-amber-500 hover:text-white"
                          disabled={
                            trainer?.status === "pending" ||
                            trainer?.status === undefined
                          }
                        >
                          <IoEyeOutline className="text-xl" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {isOpen && (
          <div className="fixed inset-0 z-10 flex items-center justify-center bg-opacity-25">
            <div className="modal modal-open">
              <div className="modal-box relative w-full max-w-md rounded-xl border border-[#DC5F00] p-6">
                <div className="p-4">
                  <div>
                    <textarea
                      className="textarea textarea-bordered w-full"
                      placeholder="Message"
                      value={message}
                      readOnly
                    ></textarea>
                  </div>
                  <div className="mt-4 text-right">
                    <button onClick={close} className="btn-danger btn">
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ActivityLog;

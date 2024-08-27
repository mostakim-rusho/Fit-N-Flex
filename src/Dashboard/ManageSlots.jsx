import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import { IoEyeOutline } from "react-icons/io5";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";

const ManageSlots = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [slotBookUser, setSlotBookUser] = useState({});
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: slots = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["manageMySlots", user?.email],
    enabled: !!user && !loading,
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/manageMySlots/${user?.email}?email=${user?.email}`,
      );
      return data;
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(
        `/deleteSlot/${id}?email=${user?.email}`,
      );
      return data;
    },
    onSuccess: (data) => {
      if (data.deletedCount === 1) {
        refetch();
        Swal.fire({
          title: "Deleted!",
          text: "Your slot has been deleted.",
          icon: "success",
        });
      } else {
        toast.error("Something went wrong!!");
      }
    },
  });

  const handleDeleteSlot = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await mutateAsync(id);
        } catch (error) {
          toast.error(error.message);
        }
      }
    });
  };

  const openModal = (user) => {
    setSlotBookUser(user);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  if (loading || isLoading) {
    return (
      <div className="flex justify-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <section className="my-20 rounded-3xl border border-amber-500 py-12 shadow-xl shadow-amber-200">
      <Helmet>
        <title>Manage Slots | Fit N Flex Arena</title>
      </Helmet>
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-3xl font-semibold text-amber-500">
          Manage Slots
        </h2>
        <p className="mb-8 text-center text-gray-700">
          Review and manage your slots.
        </p>
        <div className="flex w-full items-center justify-center">
          <div className="card w-full shadow-xl md:w-3/4 lg:w-full">
            {slots.length === 0 ? (
              <div className="flex min-h-[70vh] w-full items-center justify-center">
                <p className="text-3xl font-medium text-gray-700 md:text-4xl lg:text-5xl">
                  No Available slot!
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full table-auto rounded-xl border border-amber-500 shadow-amber-200">
                  <thead className="bg-amber-500 text-white">
                    <tr>
                      <th className="p-4">Day</th>
                      <th className="p-4">Slot Name</th>
                      <th className="p-4">Slot Time</th>
                      <th className="p-4">Classes</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {slots.map((slot, i) => (
                      console.log(slot),
                      <tr
                        key={i}
                        className="border-2 bg-white text-center hover:border-amber-500 hover:bg-gray-100 hover:shadow-md"
                      >
                        <td className="p-4">{slot.day}</td>
                        <td className="p-4">{slot.slotName}</td>
                        <td className="p-4">{slot.slotTime} hr</td>
                        <td className="p-4">
                          {
                            <span className="mr-2 inline-block rounded-full bg-amber-500 px-2 py-1 font-medium text-white" key={i}>
                              {slot.className}
                            </span>
                          }
                          {/* {slot.classesName.map((cls, i) => (
                        <span
                          key={i}
                          className="mr-2 inline-block rounded-full bg-amber-500 px-2 py-1 font-medium text-white"
                        >
                          {cls}
                        </span>
                      ))} */}
                        </td>
                        <td
                          className={`p-4 ${slot.status === "booked" ? "text-red-500" : "text-green-500"}`}
                        >
                          {slot.status}
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => openModal(slot.bookedBy)}
                            className={`border-1 btn btn-outline border-amber-500 bg-red-300 text-xl hover:border-amber-500 hover:bg-amber-500 hover:text-white ${slot.status !== "booked" && "cursor-not-allowed bg-gray-500 text-gray-300"}`}
                            disabled={slot.status !== "booked"}
                          >
                            <IoEyeOutline className="text-xl" />
                          </button>
                          <button
                            onClick={() => handleDeleteSlot(slot._id)}
                            className="border-1 btn btn-outline ml-2 border-amber-500 bg-red-300 text-xl hover:border-amber-500 hover:bg-amber-500 hover:text-white"
                          >
                            <RxCross2 className="text-xl" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        {isOpen && (
          <div className="fixed inset-0 z-10 flex items-center justify-center bg-opacity-25">
            <div className="modal modal-open">
              <div className="modal-box relative w-full max-w-md rounded-xl border border-[#DC5F00] p-6">
                <div className="p-4">
                  <div>
                    <p>{slotBookUser.name}</p>
                    <p>{slotBookUser.email}</p>
                    <p className="font-semibold">
                      {slotBookUser.class_name?.value}
                    </p>
                  </div>
                  <div className="mt-4 text-right">
                    <button onClick={closeModal} className="btn-danger btn">
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <ToastContainer />
      </div>
    </section>
  );
};

export default ManageSlots;

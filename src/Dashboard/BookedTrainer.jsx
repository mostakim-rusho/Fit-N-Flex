import { useState } from "react";
import { MdRateReview } from "react-icons/md";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";

const BookedTrainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [info, setInfo] = useState({});
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: myBooking = [], isLoading } = useQuery({
    queryKey: ["bookedTrainer", user?.email],
    enabled: !loading && !!user,
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/myBooked/${user?.email}?email=${user?.email}`,
      );
      return data;
    },
  });

  function open(trainer, pkg, price, trxId) {
    const info = { trainer, pkg, price, trxId };
    setInfo(info);
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = async () => {
    const feedbackData = {
      description: feedback,
      imageUrl: user.photoURL,
      userName: user.displayName,
      rating,
    };

    try {
      await axiosSecure.post("/testimonials", feedbackData);
      close();
      setFeedback("");
      setRating(0);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  if (loading || isLoading) {
    return (
      <div className="flex justify-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Booked Trainer | Fit N Flex Arena</title>
      </Helmet>
      {myBooking.length === 0 ? (
        <div className="flex min-h-[70vh] w-full items-center justify-center">
          <p className="text-3xl font-medium text-gray-700 md:text-4xl lg:text-5xl">
            You haven't booked any trainers yet.
          </p>
        </div>
      ) : (
        <section className="my-20 rounded-3xl border border-amber-500 py-12 shadow-xl shadow-amber-200">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center text-3xl font-semibold text-amber-500">
              My Booking
            </h2>
            <p className="mb-8 text-center text-gray-700">
              Review your bookings and details.
            </p>
            <div className="flex w-full items-center justify-center">
              <div className="w-full shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full table-auto rounded-xl border border-amber-500 shadow-amber-200">
                    <thead className="bg-amber-500 text-white">
                      <tr>
                        <th className="p-4">#</th>
                        <th className="p-4">Day</th>
                        <th className="p-4">Trainer</th>
                        <th className="p-4">Class</th>
                        <th className="p-4">Slot Name</th>
                        <th className="p-4">Slot Time</th>
                        <th className="p-4">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myBooking.map((slot, index) => (
                        <tr
                          key={index}
                          className="border-2 bg-white text-center hover:border-amber-500 hover:bg-gray-100 hover:shadow-md"
                        >
                          <td className="p-4">{index + 1}</td>
                          <td className="p-4">{slot?.class?.day}</td>
                          <td className="p-4">{slot?.trainer?.name}</td>
                          <td className="p-4">{slot?.class?.cName?.label}</td>
                          <td className="p-4">{slot?.class?.sName}</td>
                          <td className="p-4">{slot?.class?.sTime} Hr</td>
                          <td className="p-4">
                            <button
                              onClick={() =>
                                open(
                                  slot.trainer,
                                  slot.package,
                                  slot.price,
                                  slot.transactionId,
                                )
                              }
                              className="border-1 btn btn-outline border-amber-500 bg-red-300 text-xl hover:border-amber-500 hover:bg-amber-500 hover:text-white"
                            >
                              <MdRateReview className="text-xl" />
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
              <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-25">
                <div className="modal modal-open">
                  <div className="modal-box relative w-full max-w-md rounded-xl border border-[#DC5F00] bg-gray-50 p-6">
                    <div className="flex flex-col gap-3 p-4 text-gray-700 md:p-6 lg:gap-4">
                      <p>
                        <span className="font-semibold">
                          Trainer Name: {info?.trainer?.name}
                        </span>
                      </p>
                      <p>
                        <span className="font-semibold">
                          Trainer Email: {info?.trainer?.email}
                        </span>
                      </p>
                      <div className="h-[1px] w-full bg-gray-700"></div>
                      <p>
                        <span className="font-semibold">
                          Package:{" "}
                          <span className="text-green-500">{info?.pkg}</span>
                        </span>
                      </p>
                      <p>
                        <span className="font-semibold">
                          Price: {info?.price} $
                        </span>
                      </p>
                      <p>
                        <span className="font-semibold">
                          Trx Id: {info?.trxId}
                        </span>
                      </p>
                      <div className="h-[1px] w-full bg-gray-700"></div>
                      <div>
                        <label className="font-semibold">Feedback:</label>
                        <textarea
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                          className="mt-2 w-full rounded border border-gray-300 p-2"
                          rows="4"
                          placeholder="Write your feedback here..."
                        />
                      </div>
                      <div>
                        <label className="font-semibold">Rating:</label>
                        <div className="mt-2 flex text-3xl">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              onClick={() => handleRatingChange(star)}
                              className={`cursor-pointer ${
                                star <= rating
                                  ? "text-amber-500"
                                  : "text-gray-300"
                              }`}
                            >
                              &#9733;
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-5 text-right">
                        <button
                          onClick={handleSubmit}
                          className="rounded-lg bg-green-500 px-3 py-2 text-white"
                        >
                          Submit
                        </button>
                        <button
                          onClick={close}
                          className="ml-2 rounded-lg bg-red-500 px-3 py-2 text-white"
                        >
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
      )}
    </>
  );
};

export default BookedTrainer;

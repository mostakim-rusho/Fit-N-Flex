import { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useParams, useNavigate, useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const AppliedTrainerDetails = () => {
  const { id } = useParams();
  const appliedTrainerDetail = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
    setIsSubmitDisabled(e.target.value.trim() === "");
  };

  const handleReject = () => {
    document.getElementById("my_modal_5_reject").showModal();
  };

  const handleSubmit = async () => {
    try {
      await axiosSecure.put(`/users/${id}/statusReject`, {
        status: "rejected",
        feedback: feedback,
      });
      navigate("/dashboard/appliedTrainer");
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const handleConfirm = async () => {
    try {
      await axiosSecure.put(
        `/users/${appliedTrainerDetail._id}/statusResolved`,
        {
          status: "resolved",
          role: "trainer",
        },
      );
      navigate("/dashboard/appliedTrainer");
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto px-4">
      <Helmet>
        <title>Applied Trainer Details | Fit N Flex Arena</title>
      </Helmet>
      <h1 className="my-8 text-center text-3xl font-semibold text-amber-500">
        User Details
      </h1>
      <div className="text-center">
        <p>Name: {appliedTrainerDetail.name}</p>
        <p>Email: {appliedTrainerDetail.email}</p>
        <p>Role: {appliedTrainerDetail.role}</p>
        <p>Age: {appliedTrainerDetail.age}</p>
        <p>Available Days: {appliedTrainerDetail.availableDays.join(", ")}</p>
        <p>Available Times: {appliedTrainerDetail.availableTimes.join(", ")}</p>
        <p>Skills: {appliedTrainerDetail.skills.join(", ")}</p>
        <p>Status: {appliedTrainerDetail.status}</p>
        <div className="mt-4">
          <button
            className="btn mr-2 bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            onClick={handleReject}
          >
            Reject
          </button>
          <button
            className="btn bg-green-500 px-4 py-2 text-white hover:bg-green-600"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
        <dialog
          id="my_modal_5_reject"
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <h3 className="text-lg font-bold">User Details</h3>
            <p>Name: {appliedTrainerDetail.name}</p>
            <p>Email: {appliedTrainerDetail.email}</p>
            <p>Role: {appliedTrainerDetail.role}</p>
            <p>Age: {appliedTrainerDetail.age}</p>
            <p>
              Available Days: {appliedTrainerDetail.availableDays.join(", ")}
            </p>
            <p>
              Available Times: {appliedTrainerDetail.availableTimes.join(", ")}
            </p>
            <p>Skills: {appliedTrainerDetail.skills.join(", ")}</p>
            <p>Status: {appliedTrainerDetail.status}</p>
            <textarea
              className="textarea textarea-bordered mt-4 w-full"
              placeholder="Enter feedback"
              value={feedback}
              onChange={handleFeedbackChange}
            />
            <div className="modal-action">
              <button
                className="btn"
                onClick={() =>
                  document.getElementById("my_modal_5_reject").close()
                }
              >
                Cancel
              </button>
              <button
                className="btn bg-green-500 text-white"
                onClick={handleSubmit}
                disabled={isSubmitDisabled}
              >
                Reject
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default AppliedTrainerDetails;

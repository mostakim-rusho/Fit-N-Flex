import { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const AllTrainers = () => {
  const axiosSecure = useAxiosSecure();
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await axiosSecure.get("/usersTrainer");
        setTrainers(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainers();
  }, [axiosSecure]);

  const handleRemove = async (trainer) => {
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmResult.isConfirmed) {
      try {
        await axiosSecure.put(`/users/${trainer._id}/roleMember`, {
          role: "member",
        });

        // Optimistically update UI
        setTrainers((prevTrainers) =>
          prevTrainers.filter((t) => t._id !== trainer._id),
        );

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      } catch (error) {
        console.error("Error updating user role:", error);
        Swal.fire({
          title: "Error",
          text: "Failed to delete the trainer. Please try again later.",
          icon: "error",
        });
      }
    }
  };

  if (loading) return <div className="my-8 text-center">Loading...</div>;
  if (error)
    return <div className="my-8 text-center">Error: {error.message}</div>;
  if (!trainers.length)
    return <div className="my-8 text-center">No trainers found</div>;

  return (
    <div className="mx-auto px-4">
      <Helmet>
        <title>All Trainers | Fit N Flex Arena</title>
      </Helmet>
      <h1 className="my-8 text-center text-3xl font-semibold text-amber-500">
        Trainers List
      </h1>
      <div className="overflow-x-auto">
        <table className="rounded-xl border border-gray-200 bg-white shadow-xl">
          <thead className="bg-amber-500 text-center text-white">
            <tr>
              <th className="px-6 py-3">Photo</th>
              <th className="px-6">Name</th>
              <th className="py-3">Email</th>
              <th className="py-3">Role</th>
              <th className="py-3">Age</th>
              <th className="py-3">Available Days</th>
              <th className="py-3">Available Times</th>
              <th className="py-3">Skills</th>
              <th className="py-3">Status</th>
              <th className="py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {trainers.map((trainer) => (
              <tr key={trainer._id} className="hover:bg-amber-50">
                <td className="px-6 py-4">
                  <img
                    src={trainer.photoUrl}
                    alt={trainer.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                </td>
                <td>{trainer.name}</td>
                <td>{trainer.email}</td>
                <td>{trainer.role}</td>
                <td>{trainer.age}</td>
                <td>{trainer.availableDays.join(", ")}</td>
                <td>{trainer.availableTimes.join(", ")}</td>
                <td>{trainer.skills.join(", ")}</td>
                <td>{trainer.status}</td>
                <td>
                  <button
                    className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600 mx-2"
                    onClick={() => handleRemove(trainer)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllTrainers;

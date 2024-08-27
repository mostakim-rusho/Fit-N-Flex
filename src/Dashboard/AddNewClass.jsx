import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../Hooks/useAuth";
import { uploadImage } from "../Hooks/imageUpload";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const AddNewClass = () => {
  const { user } = useAuth();
  const [isCURDLoading, setIsCRUDLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (newClass) => {
      const { data } = await axiosSecure.post(
        `/addNewClass?email=${user?.email}`,
        newClass,
      );
      return data;
    },
    onSuccess: (data) => {
      if (data.insertedId) {
        Swal.fire({
          title: "Success",
          text: "You successfully added a new class.",
          icon: "success",
        });
      } else {
        toast.error("Something went wrong!");
      }
    },
  });

  const handleAddNewClass = async (e) => {
    setIsCRUDLoading(true);
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.files[0];
    const details = form.details.value;

    try {
      const img_url = await uploadImage(photo);
      const newClass = {
        name: name,
        description: details,
        image: img_url,
        totalBooking: 0,
      };
      await mutateAsync(newClass);
      form.reset();
      setIsCRUDLoading(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex min-h-[80vh] w-full items-center justify-center p-4 lg:p-8">
      <Helmet>
        <title>Add New Class | Fit N Flex Arena</title>
      </Helmet>
      <div className="w-full max-w-3xl rounded-3xl border border-amber-500 bg-white shadow-xl shadow-amber-500">
        <form onSubmit={handleAddNewClass} className="space-y-6 p-6 lg:p-8">
          <h2 className="text-center text-2xl font-semibold text-amber-500">
            Add a New Class
          </h2>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Class Name</span>
            </label>
            <input
              name="name"
              type="text"
              className="input input-bordered"
              placeholder="Enter class name"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Class Image</span>
            </label>
            <input
              name="photo"
              type="file"
              accept="image/*"
              className="file-input file-input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Class Description</span>
            </label>
            <textarea
              name="details"
              className="textarea textarea-bordered"
              placeholder="Enter class description"
              required
            />
          </div>
          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn btn-outline border-2 border-amber-500 bg-transparent text-xl text-amber-500 shadow-lg shadow-amber-300 hover:border-amber-500 hover:bg-amber-500 hover:text-white"
              disabled={isLoading}
            >
              {isCURDLoading ? (
                <span className="flex items-center">
                  <span className="loading loading-spinner loading-sm mr-2"></span>
                  Adding...
                </span>
              ) : (
                "Add Class"
              )}
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AddNewClass;

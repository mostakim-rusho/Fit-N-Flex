import Select from "react-select";
import { Helmet } from "react-helmet-async";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AddNewSlot = () => {
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const slotName = ["Morning", "Afternoon", "Evening", "Night"];
  const daysOfWeek = [
    { value: "Sat", label: "Saturday" },
    { value: "Sun", label: "Sunday" },
    { value: "Mon", label: "Monday" },
    { value: "Tue", label: "Tuesday" },
    { value: "Wed", label: "Wednesday" },
    { value: "Thu", label: "Thursday" },
    { value: "Fri", label: "Friday" },
  ];

  const { data: trainer = {}, isLoading } = useQuery({
    queryKey: ["addNewSlot", user?.email],
    enabled: !loading && !!user,
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/slotUser/${user?.email}?email=${user?.email}`,
      );
      setSelectedDays(
        data.availableDays.map((day) => ({
          value: day,
          label: daysOfWeek.find((d) => d.value === day)?.label,
        })),
      );
      setSelectedClasses(data.skills || []);
      return data;
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (newSlot) => {
      const { data } = await axiosSecure.post(
        `/addNewSlot?email=${user?.email}`,
        newSlot,
      );
      return data;
    },
    onSuccess: (data) => {
      if (data.insertedCount) {
        toast.success("Slot added successfully");
        navigate("/dashboard/manageSlots");
      } else {
        toast.error("Something went wrong!");
      }
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.slotName.value;
    const time = form.slotTime.value;
    const classDays = selectedDays.map((day) => day.value);
    const classesName = selectedClasses;

    if (!name) return toast.error("Select slot name!");
    if (classDays.length === 0) return toast.error("Select class days");
    if (classesName.length === 0) return toast.error("Select classes!");

    const slotData = {
      slotName: name,
      slotTime: time,
      classDays,
      classesName,
      trainer: {
        name: trainer?.name,
        email: trainer?.email,
        id: trainer?._id,
      },
      status: "available",
    };

    let allSlots = [];
    classDays.forEach((day) => {
      classesName.forEach((className) => {
        allSlots.push({
          slotName: name,
          slotTime: time,
          day,
          className,
          trainer: {
            name: trainer?.name,
            email: trainer?.email,
            id: trainer?._id,
          },
          status: "available",
        });
      });
    });

    try {
      await mutateAsync(allSlots);
      form.reset();
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading || isLoading)
    return (
      <div className="flex justify-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );

  return (
    <div className="min-h-[60vh] py-8 md:py-12 lg:py-16">
      <Helmet>
        <title>Add New Slot | Fit N Flex Arena</title>
      </Helmet>
      <div className="flex h-full w-full items-center justify-center">
        <div className="my-20 w-full rounded-3xl border border-amber-500 p-6 py-12 shadow-xl shadow-amber-200 md:p-8 lg:w-10/12 lg:p-10 xl:w-3/4">
          <form
            onSubmit={handleSubmit}
            className="w-full space-y-4 lg:space-y-6"
          >
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={trainer?.name}
                  className="input input-bordered"
                  readOnly
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  defaultValue={trainer?.email}
                  className="input input-bordered"
                  readOnly
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  name="photo"
                  defaultValue={trainer?.photoUrl}
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Age</span>
                </label>
                <input
                  type="number"
                  name="age"
                  defaultValue={trainer?.age}
                  className="input input-bordered"
                  readOnly
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Skills</span>
              </label>
              <textarea
                name="skills"
                defaultValue={trainer?.skills.join(", ")}
                className="textarea textarea-bordered"
              ></textarea>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Available Days</span>
              </label>
              <input
                type="text"
                name="days"
                defaultValue={trainer?.availableDays.join(", ")}
                className="input input-bordered"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Experience (Year)</span>
                </label>
                <input
                  type="number"
                  defaultValue={trainer?.experience}
                  className="input input-bordered"
                  readOnly
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Class Duration (Hour)</span>
                </label>
                <input
                  type="number"
                  defaultValue={trainer?.classDuration}
                  className="input input-bordered"
                  readOnly
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Available Time</span>
                </label>
                <input
                  type="text"
                  defaultValue={trainer?.availableTimes}
                  className="input input-bordered"
                  readOnly
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Status</span>
                </label>
                <input
                  type="text"
                  defaultValue={trainer?.status}
                  className="input input-bordered"
                  readOnly
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Biography</span>
              </label>
              <textarea
                name="biography"
                defaultValue={trainer?.biography}
                className="textarea textarea-bordered"
                readOnly
              ></textarea>
            </div>
            <div className="divider"></div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Select Slot Name</span>
                </label>
                <select name="slotName" className="select select-bordered">
                  <option value="" disabled>
                    Select Slot Name
                  </option>
                  {slotName.map((slot, i) => (
                    <option value={slot} key={i}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Slot Time (Hour)</span>
                </label>
                <input
                  type="number"
                  name="slotTime"
                  className="input input-bordered"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Available Days</span>
                </label>
                <Select
                  placeholder="Select Available Days"
                  defaultValue={selectedDays}
                  value={selectedDays}
                  onChange={setSelectedDays}
                  options={daysOfWeek}
                  isMulti={true}
                  className="w-full"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Select Classes</span>
                </label>
                <Select
                  placeholder="Select Classes"
                  defaultValue={selectedClasses.map((className) => ({
                    value: className,
                    label: className,
                  }))}
                  value={selectedClasses.map((className) => ({
                    value: className,
                    label: className,
                  }))}
                  onChange={(selectedOptions) =>
                    setSelectedClasses(
                      selectedOptions.map((option) => option.value),
                    )
                  }
                  options={selectedClasses.map((className) => ({
                    value: className,
                    label: className,
                  }))}
                  isMulti={true}
                  className="w-full"
                />
              </div>
            </div>
            <div className="text-right">
              <button
                type="submit"
                className="btn btn-outline border-2 border-amber-500 bg-transparent text-xl text-amber-500 shadow-lg shadow-amber-300 hover:border-amber-500 hover:bg-amber-500 hover:text-white"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default AddNewSlot;

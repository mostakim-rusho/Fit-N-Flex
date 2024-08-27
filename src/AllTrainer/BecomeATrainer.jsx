import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import useClassName from "../Hooks/useClassName";
import { Helmet } from "react-helmet-async";

const BecomeATrainer = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { classes } = useClassName();

  const daysOfWeek = [
    { value: "Sat", label: "Saturday" },
    { value: "Sun", label: "Sunday" },
    { value: "Mon", label: "Monday" },
    { value: "Tue", label: "Tuesday" },
    { value: "Wed", label: "Wednesday" },
    { value: "Thu", label: "Thursday" },
    { value: "Fri", label: "Friday" },
  ];

  const timesOfDay = [
    { value: "morning", label: "Morning (7 AM - 8 AM)" },
    { value: "afternoon", label: "Afternoon (3 PM - 4 PM)" },
    { value: "evening", label: "Evening (5 PM - 6 PM)" },
    { value: "night", label: "Night (7 PM - 8 PM)" },
  ];

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState([]);
  // const [selectedGptSkills, setSelectedGptSkills] = useState([]);

  // const handleSkillsChange = (selectedOptions) => {
  //   setSelectedSkills(selectedOptions);
  // };


  const handleSkillsChange = (skillName, checked) => {
    if (checked) {
      setSelectedSkills((prevSkills) => [
        ...prevSkills,
        { value: skillName, label: skillName },
      ]);
    } else {
      setSelectedSkills((prevSkills) =>
        prevSkills.filter((skill) => skill.value !== skillName),
      );
    }
  };


  const handleDaysChange = (selectedOptions) => {
    setSelectedDays(selectedOptions);
  };
  const handleTimesChange = (selectedOptions) => {
    setSelectedTimes(selectedOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const age = form.age.value;
    const classDuration = form.classDuration.value;
    const biography = form.biography.value;
    const experience = form.experience.value;
    const selectedSkillsValues = selectedSkills.map((skill) => skill.value);
    const selectedDayValues = selectedDays.map((day) => day.value);
    const selectedTimeValues = selectedTimes.map((time) => time.value);

    try {
      const userResponse = await fetch(
        `${import.meta.env.VITE_SERVER}/users/${email}`,
      );
      const userData = await userResponse.json();

      if (userData.status === "pending") {
        toast.error("You have a pending application.", {
          autoClose: 1500,
        });
        setTimeout(() => {
          navigate(location?.state ? location.state : "/dashboard/activityLog");
        }, 1500);
        return;
      }
      if (userData.status === "resolved") {
        toast.error("You are already a trainer", {
          autoClose: 1500,
        });
        setTimeout(() => {
          navigate(location?.state ? location.state : "/dashboard/manageSlots");
        }, 1500);
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/users/${email}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            skills: selectedSkillsValues,
            availableDays: selectedDayValues,
            availableTimes: selectedTimeValues,
            status: "pending",
            age,
            classDuration,
            biography,
            experience,
          }),
        },
      );

      if (response.ok) {
        toast.success("Submission successful. Please wait for redirect...", {
          autoClose: 1500,
        });
        setTimeout(() => {
          navigate(location?.state ? location.state : "/dashboard/activityLog");
        }, 1500);
      } else {
        console.error("Failed to submit skills");
      }
      form.reset();
    } catch (error) {
      console.error("Error submitting skills:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-10">
      <div className="grid grid-cols-2 gap-4">
        <Helmet>
          <title>Become A Trainer | Fit N Flex Arena</title>
        </Helmet>
        <div className="form-control col-span-2 w-full md:col-span-1">
          <label className="label">
            <span className="label-text">Full Name</span>
          </label>
          <label className="input-group">
            <input
              type="text"
              className="input input-bordered w-full"
              name="fullName"
              defaultValue={user?.displayName}
              placeholder="Enter Full Name"
              required
            />
          </label>
        </div>
        <div className="form-control col-span-2 w-full md:col-span-1">
          <label className="label">
            <span className="label-text">E-Mail</span>
          </label>
          <label className="input-group">
            <input
              type="email"
              className="input input-bordered w-full"
              name="email"
              disabled
              defaultValue={user?.email}
              required
            />
          </label>
        </div>
        <div className="form-control col-span-2 w-full md:col-span-1">
          <label className="label">
            <span className="label-text">Age</span>
          </label>
          <label className="input-group">
            <input
              type="number"
              min={0}
              className="input input-bordered w-full"
              name="age"
              placeholder="Enter Your Age"
              required
            />
          </label>
        </div>

        <div className="form-control col-span-2 w-full md:col-span-1">
          <label className="label">
            <span className="label-text">Applied For</span>
          </label>
          <label className="input-group">
            <input
              type="text"
              min={0}
              className="input input-bordered w-full"
              name="applierFor"
              placeholder=""
              required
              defaultValue="Trainer"
              disabled
            />
          </label>
        </div>

        <div className="form-control col-span-2 w-full md:col-span-1">
          <label className="label">
            <span className="label-text">Experience</span>
          </label>
          <label className="input-group">
            <input
              type="number"
              min={0}
              className="input input-bordered w-full"
              name="experience"
              placeholder="Experience In ( Year )"
              required
            />
          </label>
        </div>

        <div className="form-control col-span-2 w-full md:col-span-1">
          <label className="label">
            <span className="label-text">Profile Image URL</span>
          </label>
          <label className="input-group">
            <input
              type="url"
              min={0}
              className="input input-bordered w-full"
              name="profileImage"
              placeholder="Profile Image URL"
              defaultValue={user?.photoURL}
              required
            />
          </label>
        </div>

        <div className="form-control col-span-2 w-full md:col-span-1">
          <label className="label">
            <span className="label-text">Available Days</span>
          </label>
          <div className="input-group">
            <Select
              isMulti
              options={daysOfWeek}
              className="w-full"
              classNamePrefix="select"
              placeholder="Select Available Days"
              onChange={handleDaysChange}
              required
            />
          </div>
        </div>
        <div className="form-control col-span-2 w-full md:col-span-1">
          <label className="label">
            <span className="label-text">Available Times</span>
          </label>
          <div className="input-group">
            <Select
              isMulti
              options={timesOfDay}
              className="w-full"
              classNamePrefix="select"
              placeholder="Select Available Times"
              onChange={handleTimesChange}
              required
            />
          </div>
        </div>
        {/* <div className="form-control col-span-2 w-full md:col-span-1">
          <label className="label">
            <span className="label-text">Skills</span>
          </label>
          <div className="input-group">
            <Select
              isMulti
              options={classes.map((skill) => ({
                value: skill.name,
                label: skill.name,
              }))}
              className="w-full"
              classNamePrefix="select"
              placeholder="Select Your Skills"
              onChange={handleSkillsChange}
              required
            />
          </div>
        </div> */}

        <div className="form-control col-span-2 w-full md:col-span-2">
          <label className="label">
            <span className="label-text">Skills</span>
          </label>
          <div className="input-group flex  flex-wrap">
            {classes.map((skill) => (
              <label key={skill.name} className=" cursor-pointer flex flex-row-reverse m-1 p-1 ">
                <span className="label-text ml-1">{skill.name}{"   "}</span>
                <input
                  type="checkbox"
                  className="checkbox-warning checkbox"
                  onChange={(e) =>
                    handleSkillsChange(skill.name, e.target.checked)
                  }
                />
              </label>

            ))}
          </div>
        </div>

        <div className="form-control col-span-2 w-full md:col-span-1">
          <label className="label">
            <span className="label-text">Class Duration</span>
          </label>
          <label className="input-group">
            <input
              type="number"
              min={0}
              className="input input-bordered w-full"
              name="classDuration"
              placeholder="Input Class Duration In Hour"
              required
            />
          </label>
        </div>
        <div className="form-control col-span-2 w-full md:col-span-1">
          <label className="label">
            <span className="label-text">Biography</span>
          </label>
          <label className="input-group">
            <textarea
              type="text"
              min={0}
              className="input input-bordered w-full"
              name="biography"
              placeholder="Your biography"
              required
            />
          </label>
        </div>
        <button className="btn btn-outline col-span-2 border-2 border-amber-500 bg-transparent text-xl text-amber-500 hover:border-amber-500 hover:bg-amber-500 hover:text-white">
          Apply
        </button>
      </div>
      <ToastContainer></ToastContainer>
    </form>
  );
};

export default BecomeATrainer;

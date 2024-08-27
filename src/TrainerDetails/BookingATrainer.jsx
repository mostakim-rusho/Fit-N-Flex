import {
  Navigate,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";

import useAuth from "../Hooks/useAuth";
import { Helmet } from "react-helmet-async";

const BookingATrainer = () => {
  const { user } = useAuth();
  const [plan, setPlan] = useState("");
  const [className, setClassName] = useState("");
  console.log(className);

  const trainer = useLoaderData();
  const { state } = useLocation();
  console.log(state);
  // output {day: 'Wed', sTime: '1', sName: 'Morning', slotId: '667916382542544c55f214e4', className: 'Kickboxing'}
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!plan) return toast.error("Please select a plan!");
    if (!className) return toast.error("Please select a class!");

    let price = 0;
    if (plan === "Basic") price = 10;
    if (plan === "Standard") price = 50;
    if (plan === "Premium") price = 100;

    const bookingData = {
      class: {
        cName: className,
        day: state.day,
        sTime: state.sTime,
        sName: state.sName,
        sId: state.slotId,
      },
      package: plan,
      price: price,
      trainer: {
        name: trainer.name,
        id: trainer._id,
        email: trainer.email,
      },
      user: {
        name: user?.displayName,
        email: user?.email,
        uid: user?.uid,
        image: user?.image,
      },
    };

    console.log(bookingData);
    navigate("/payment", { state: { bookingData } });
  };

  if (!state) return <Navigate to="/" />;

  const classOptions = [
    {
      value: state.className,
      label: state.className,
    },
  ];

  return (
    <div className="py-8 md:py-12 lg:py-16">
      <Helmet>
        <title>Trainer Booking | Fit N Flex Arena</title>
      </Helmet>
      <div className="container mx-auto">
        <div>
          <section>
            <div>
              <div className="mx-auto max-w-3xl pb-6 text-center md:pb-8 lg:pb-10">
                <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                  Pricing Plans
                </h2>
                <p className="text-xl">
                  Choose a plan that best suits your needs.
                </p>
              </div>
              <div className="grid grid-cols-1 justify-items-center gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                <div
                  className={`${plan === "Basic" ? "bg-amber-50" : ""} hover:border-primary-focus/20 hover:shadow-primary-focus/20 mx-auto flex max-w-md flex-col rounded-box border border-base-300 border-primary/10 p-4 text-center shadow-xl shadow-primary/10 transition xl:p-6`}
                >
                  <h3 className="text-2xl font-semibold">Basic Membership</h3>
                  <div className="my-5 flex items-baseline justify-center lg:my-7">
                    <span className="mr-2 text-5xl font-extrabold">$10</span>
                    <span className="">/month</span>
                  </div>
                  <ul role="list" className="mb-8 space-y-4 text-left">
                    <li className="flex items-center space-x-3">
                      <svg
                        className="h-6 w-6 text-amber-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"></path>
                      </svg>
                      <span className="text-base-content/80">
                        Access to gym facilities during regular operating hours.
                      </span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <svg
                        className="h-6 w-6 text-amber-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"></path>
                      </svg>
                      <span className="text-base-content/80">
                        Use of cardio and strength training equipment.
                      </span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <svg
                        className="h-6 w-6 text-amber-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"></path>
                      </svg>
                      <span className="text-base-content/80">
                        Access to locker rooms and showers.
                      </span>
                    </li>
                  </ul>
                  <div>
                    <button
                      onClick={() => setPlan("Basic")}
                      className="btn w-full bg-amber-500 p-2 font-bold uppercase text-white shadow hover:border-amber-500 hover:bg-white hover:text-amber-500"
                    >
                      Select
                    </button>
                  </div>
                </div>
                <div
                  className={`${plan === "Standard" ? "bg-amber-50" : ""} hover:border-primary-focus/20 hover:shadow-primary-focus/20 mx-auto flex max-w-md flex-col rounded-box border border-base-300 border-primary/10 p-4 text-center shadow-xl shadow-primary/10 transition xl:p-6`}
                >
                  <h3 className="text-2xl font-semibold">
                    Standard Membership
                  </h3>
                  <div className="my-5 flex items-baseline justify-center lg:my-7">
                    <span className="mr-2 text-5xl font-extrabold">$50</span>
                    <span className="">/month</span>
                  </div>
                  <ul role="list" className="mb-8 space-y-4 text-left">
                    <li className="flex items-center space-x-3">
                      <svg
                        className="h-6 w-6 text-amber-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"></path>
                      </svg>
                      <span className="text-base-content/80">
                        All benefits of the basic membership.
                      </span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <svg
                        className="h-6 w-6 text-amber-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"></path>
                      </svg>
                      <span className="text-base-content/80">
                        Access to group fitness classes.
                      </span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <svg
                        className="h-6 w-6 text-amber-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"></path>
                      </svg>
                      <span className="text-base-content/80">
                        Complimentary fitness assessment.
                      </span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <svg
                        className="h-6 w-6 text-amber-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"></path>
                      </svg>
                      <span className="text-base-content/80">
                        Discounts on personal training sessions.
                      </span>
                    </li>
                  </ul>
                  <div>
                    <button
                      onClick={() => setPlan("Standard")}
                      className="btn w-full bg-amber-500 p-2 font-bold uppercase text-white shadow hover:border-amber-500 hover:bg-white hover:text-amber-500"
                    >
                      Select
                    </button>
                  </div>
                </div>
                <div
                  className={`${plan === "Premium" ? "bg-amber-50" : ""} hover:border-primary-focus/20 hover:shadow-primary-focus/20 mx-auto flex max-w-md flex-col rounded-box border border-base-300 border-primary/10 p-4 text-center shadow-xl shadow-primary/10 transition xl:p-6`}
                >
                  <h3 className="text-2xl font-semibold">Premium Membership</h3>
                  <div className="my-5 flex items-baseline justify-center lg:my-7">
                    <span className="mr-2 text-5xl font-extrabold">$100</span>
                    <span className="">/month</span>
                  </div>
                  <ul role="list" className="mb-8 space-y-4 text-left">
                    <li className="flex items-center space-x-3">
                      <svg
                        className="h-6 w-6 text-amber-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"></path>
                      </svg>
                      <span className="text-base-content/80">
                        All benefits of the standard membership.
                      </span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <svg
                        className="h-6 w-6 text-amber-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"></path>
                      </svg>
                      <span className="text-base-content/80">
                        Unlimited access to all fitness classes.
                      </span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <svg
                        className="h-6 w-6 text-amber-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"></path>
                      </svg>
                      <span className="text-base-content/80">
                        One-on-one personal training sessions.
                      </span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <svg
                        className="h-6 w-6 text-amber-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"></path>
                      </svg>
                      <span className="text-base-content/80">
                        Access to exclusive premium-only areas.
                      </span>
                    </li>
                  </ul>
                  <div>
                    <button
                      onClick={() => setPlan("Premium")}
                      className="btn w-full bg-amber-500 p-2 font-bold uppercase text-white shadow hover:border-amber-500 hover:bg-white hover:text-amber-500"
                    >
                      Select
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="mt-10">
            <div className="flex items-center justify-center py-10 md:py-14 lg:py-20">
              <div className="w-full space-y-3 rounded-2xl border border-amber-500 p-6 shadow-xl shadow-amber-200 md:p-8 lg:w-2/3 lg:space-y-5 lg:p-10 xl:w-1/2">
                <p>
                  <span className="text-lg font-medium">Trainer Name :</span>{" "}
                  <span className="opacity-80">{trainer.name}</span>
                </p>
                <p>
                  <span className="text-lg font-medium">Day :</span>{" "}
                  <span className="opacity-80">{state?.day}</span>
                </p>
                <p>
                  <span className="text-lg font-medium">Slot Name :</span>{" "}
                  <span className="opacity-80">{state.sName}</span>
                </p>
                <p>
                  <span className="text-lg font-medium">Slot Time :</span>{" "}
                  <span className="opacity-80">{state.sTime} hr</span>
                </p>
                <p>
                  <span className="text-lg font-medium">Package :</span>{" "}
                  <span className="opacity-80">{plan}</span>
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="w-72">
                    <Select
                      onChange={(e) => setClassName(e)}
                      label="Select Class"
                      options={classOptions.map(() => ({
                        value: state.className,
                        label: state.className,
                      }))}
                    ></Select>
                  </div>
                  <div className="mt-4 text-right">
                    <button
                      type="submit"
                      className="btn btn-outline text-xl text-amber-500 hover:border-amber-500 hover:bg-amber-500"
                    >
                      Join Now
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default BookingATrainer;

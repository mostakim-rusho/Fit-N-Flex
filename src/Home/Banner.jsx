import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="w-full">
      <div className="relative w-full">
        <img
          src="https://i.ibb.co/PWLSrvj/orangetheory-today-180605-tease.jpg"
          className="max-h-[calc(60vh)] w-full rounded-3xl border border-amber-500 object-cover shadow-xl shadow-amber-200"
        />
        <div className="absolute bottom-2 left-2 right-2 rounded-xl border border-amber-500 bg-base-content bg-opacity-60 p-1 text-center text-lg font-bold text-white md:bottom-5 md:left-10 md:right-10 md:p-4 md:text-2xl">
          <h1>Your Fitness Destination</h1>
          <p className="text-xs font-medium md:text-lg">
            Top-notch equipment, personalized training plans, and a supportive
            community. Start your fitness journey with us now.
          </p>
          <Link
            to="/allClasses"
            className="btn btn-outline border-2 border-amber-500 bg-transparent text-white max-sm:btn-sm hover:border-amber-500 hover:bg-amber-500 hover:text-white md:mt-5 md:text-xl"
          >
            All Classes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const NewsLetter = () => {
  const axiosPublic = useAxiosPublic();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;

    const subscribeUser = { name, email };

    try {
      const { data } = await axiosPublic.post("/subs", subscribeUser);

      if (data.insertedId) {
        toast.success("Subscribed successfully.");
      } else {
        toast.error("Already subscribed");
      }

      form.reset();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section className="my-20 rounded-3xl border border-amber-500 py-12 shadow-xl shadow-amber-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6 md:gap-8 lg:flex-row lg:gap-10">
          <div className="text-center lg:w-1/2">
            <h3 className="mb-4 text-3xl font-semibold text-amber-500 md:text-4xl lg:text-5xl">
              Stay Informed with Our Fitness Newsletter
            </h3>
            <p className="text-gray-700">
              Subscribe to our newsletter for the latest fitness tips, workout
              routines, healthy recipes, and exclusive offers delivered straight
              to your inbox. Stay motivated and informed!
            </p>
          </div>
          <div className="w-full lg:w-1/2">
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                className="w-full rounded-lg p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Enter your name..."
                required
              />
              <input
                type="email"
                name="email"
                className="w-full rounded-lg p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Enter your email..."
                required
              />
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-amber-500 text-white font-bold shadow-md transition duration-300 hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                Subscribe Now
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default NewsLetter;

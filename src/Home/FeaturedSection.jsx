import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDumbbell,
  faSpa,
  faHeartbeat,
  faRunning,
  faUserFriends,
  faLeaf,
} from "@fortawesome/free-solid-svg-icons";

const features = [
  {
    title: "State-of-the-Art Gym",
    description:
      "Equipped with the latest machines and free weights to enhance your workout.",
    icon: faDumbbell,
  },
  {
    title: "Yoga Classes",
    description:
      "Join our yoga classes to improve flexibility, balance, and mental well-being.",
    icon: faSpa,
  },
  {
    title: "Personal Training",
    description:
      "Get personalized workout plans and guidance from our certified trainers.",
    icon: faHeartbeat,
  },
  {
    title: "Group Fitness",
    description:
      "Engage in motivating group workouts including aerobics, Zumba, and more.",
    icon: faUserFriends,
  },
  {
    title: "Cardio Training",
    description:
      "Boost your cardiovascular health with our state-of-the-art cardio equipment.",
    icon: faRunning,
  },
  {
    title: "Nutrition Counseling",
    description:
      "Receive expert advice on nutrition and diet plans to complement your fitness regime.",
    icon: faLeaf,
  },
];

const FeaturedSection = () => {
  return (
    <section className="my-20 rounded-3xl border border-amber-500 object-cover py-12 shadow-xl shadow-amber-200">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-3xl font-semibold text-amber-500">
          Our Key Features
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card flex h-full w-full rounded-lg border border-b border-amber-500 border-b-amber-500 p-6 text-center shadow-xl shadow-amber-100 transition-shadow duration-300 hover:shadow-amber-300"
            >
              <div className="mb-4 text-4xl text-amber-500">
                <FontAwesomeIcon icon={feature.icon} />
              </div>
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;

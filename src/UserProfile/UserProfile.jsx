import { useContext} from "react";
import { AuthContext } from "../AuthProvider";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    data: userData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userProfile", user?.email],
    queryFn: async () => {
      if (user?.email) {
        const response = await axiosSecure.get(`/users/${user.email}`);
        return response.data;
      }
      return null;
    },
    enabled: !!user?.email,
  });

  if (isLoading)
    return (
      <div className="flex justify-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );

  if (error) return <div>Error: {error.message}</div>;
  if (!userData) return <div>No user data found</div>;

  return (
    <section className="my-20 rounded-3xl py-12">
      <Helmet>
        <title>User Profile | Fit N Flex Arena</title>
      </Helmet>
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-3xl font-semibold text-amber-500">
          User Profile
        </h2>
        <div className="mx-auto max-w-md rounded-lg border border-amber-500 p-6 shadow-xl">
          <div className="flex flex-col items-center">
            <img
              src={userData.photoUrl}
              alt={`${userData.name}'s profile`}
              className="mb-4 h-32 w-32 rounded-full object-cover shadow-md"
            />
            <h3 className="mb-2 text-2xl font-bold text-gray-900">
              {userData.name}
            </h3>
            <p className="mb-4 text-gray-700">{userData.email}</p>
            <p className="mb-4 text-gray-700">{userData.role}</p>
            <p className="text-gray-500">
              Last Login: {new Date(userData.lastSignInTime).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;

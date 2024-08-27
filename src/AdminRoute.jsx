import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import useAuth from "./Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./Hooks/useAxiosPublic";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const axiosPublic = useAxiosPublic();
  const {
    data: role = "",
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !loading && !!user,
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/user/role/${user?.email}`);
      return data;
    },
  });

  if (loading || isLoading)
    return (
      <div className="flex justify-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );

  if (user && role === "admin") return children;

  return <Navigate to="/" replace />;
};

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminRoute;

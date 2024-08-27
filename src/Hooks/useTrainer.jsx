import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useTrainer = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: isTrainer, isPending: isTrainerLoading } = useQuery({
    queryKey: [user?.email, "isTrainer"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/trainer/${user.email}`);
      return res.data?.trainer;
    },
  });
  return [isTrainer, isTrainerLoading];
};

export default useTrainer;

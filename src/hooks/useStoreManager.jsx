import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useStoreManager = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const token = localStorage.getItem("access_token");

  const { refetch: refetchUseStoreManager, data: isStoreManager, isPending: isStoreManagerLoading } = useQuery({
    queryKey: [user?.email, "isStoreManager"],
    enabled: !loading,
    queryFn: async () => {
      if (token) {
        const res = await axiosSecure.get(`/users/admin/${user.email}`);
        return res.data?.storeManager;
      }
    },
  });
  return [isStoreManager, isStoreManagerLoading, refetchUseStoreManager];
};

export default useStoreManager;

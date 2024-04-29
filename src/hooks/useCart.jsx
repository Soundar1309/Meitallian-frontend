import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

const useCart = () => {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("access_token");

  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["carts", user?.email],
    queryFn: async () => {
      if (user?.email && token) {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/carts?email=${user?.email}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        return res.json();
      } else {
        return [];
      }
    },
  });

  return [cart, refetch];
};
export default useCart;

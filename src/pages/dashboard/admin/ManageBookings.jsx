import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import AdminOrder from "./AdminOrder";

const ManageBookings = () => {
  const { user, loading } = useAuth();
  const token = localStorage.getItem("access_token");
  const { refetch, data: orders = [] } = useQuery({
    queryKey: ["orders", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/payments/all`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return res.json();
    },
  });
  //   console.log(menu)
  const axiosSecure = useAxiosSecure();

  //   pagination
  const [currentPage, setCurrentPage] = useState(1);
  const items_Per_Page = 10;
  const indexOfLastItem = currentPage * items_Per_Page;
  const indexOfFirstItem = indexOfLastItem - items_Per_Page;
  const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);

  // delete item
  const handleDeleteItem = (item) => {
    console.log(item._id);
  };

  // confirm order
  const confiremedOrder = async (item) => {
    console.log(item);
    await axiosSecure.patch(`/payments/${item._id}`).then((res) => {
      console.log(res.data);
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: `Order Confirmed Now!`,
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
    });
  };

  return (
    <div className="w-[78vw] mx-auto px-4 ">
      <h2 className="text-2xl font-semibold my-4">
        Manage All <span className="text-green">Bookings!</span>
      </h2>

      {/* menu items table  */}
      <AdminOrder isAdmin={true} />
    </div>
  );
};

export default ManageBookings;

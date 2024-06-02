import { useCallback, useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import { Table } from "antd";
import useUser from "../../../hooks/useUser";
import FoodBasket from "../../../components/FoodBasket";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Order = ({ isAdmin }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [loggedinUser] = useUser();
  const [order, setOrder] = useState([]);

  const GetOrder = useCallback(() => {
    let mailData =
      !isAdmin && loggedinUser?.role === "user" ? `?email=${user?.email}` : "";

    axiosSecure
      .get(`${import.meta.env.VITE_API_URL}/order${mailData}`)
      .then((res) => {
        console.log(res.data.orders);
        setOrder(res.data.orders);
      });
  }, [loggedinUser?.role, user?.email, axiosSecure, isAdmin]);

  useEffect(() => {
    GetOrder();
  }, [GetOrder]);

  const formatDate = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    return createdAtDate.toLocaleDateString();
  };

  const handleCancelOrder = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.patch(`${import.meta.env.VITE_API_URL}/order/${id}`, {
          status: "Cancelled",
        });
        GetOrder();
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: `Order Cancelled successfully`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  // const columns = [
  //   { title: "S.No", dataIndex: "sno", key: "sno" },
  //   {
  //     title: "Order Date",
  //     dataIndex: "orderDate",
  //     key: "orderDate",
  //   },
  //   { title: "Price", dataIndex: "price", key: "price" },
  //   { title: "Status", dataIndex: "status", key: "status" },
  //   {
  //     title: "",
  //     dataIndex: "_id",
  //     key: "_id",
  //     width: "10%",
  //     render: (id) => (
  //       <button
  //         onClick={() => handleCancelOrder(id)}
  //         className="btn btn-danger btn-xs"
  //       >
  //         Cancel Order
  //       </button>
  //     ),
  //   },
  // ];
  const columns = [
    { title: "S.No", dataIndex: "sno", key: "sno" },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      key: "orderDate",
    },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "",
      dataIndex: "_id",
      key: "_id",
      width: "10%",
      render: (id, record) => {
        return record.status === "Delivered" ||
          record.status === "Ready" ? null : (
          <button
            onClick={() => handleCancelOrder(id)}
            className="btn btn-danger btn-xs"
          >
            Cancel Order
          </button>
        );
      },
    },
  ];
  let data = [];

  if (order?.length > 0) {
    data = order?.map((order, index) => ({
      key: index + 1,
      sno: index + 1,
      _id: order._id,
      orderDate: formatDate(order.createdAt),
      price: `Rs. ${order.total}`,
      status: order.status,
      description: order?.orderItems?.map((cartItem, index) => (
        <div key={cartItem._id} className="w-1/3 p-2">
          <FoodBasket cartItem={cartItem} />
        </div>
      )),
    }));
  }

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      {/* banner */}
      {!isAdmin ? (
        <div className=" bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
          <div className="py-28 flex flex-col items-center justify-center">
            {/* content */}
            <div className=" text-center px-4 space-y-7">
              <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
                Track Your All<span className="text-green"> Orders</span>
              </h2>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      {/* table content */}
      <div>
        {
          <div
            className={`overflow-x-auto order_table ${
              isAdmin ? "w-[1000px]" : ""
            }`}
          >
            <Table
              columns={columns}
              expandable={{
                expandedRowRender: (record) => (
                  <div className="flex flex-wrap p-4">{record.description}</div>
                ),
                rowExpandable: (record) => record.name !== "Not Expandable",
              }}
              dataSource={data}
            />
          </div>
        }
      </div>
    </div>
  );
};

export default Order;

import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import { Table } from "antd";
import useUser from "../../../hooks/useUser";
import FoodBasket from "../../../components/FoodBasket";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Order = ({ isAdmin }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [loggedinUser] = useUser();
  const [order, setOrder] = useState([]);

  useEffect(() => {
    let mailData =
      !isAdmin && loggedinUser?.role === "user" ? `?email=${user?.email}` : "";

    axiosSecure
      .get(`${import.meta.env.VITE_API_URL}/order${mailData}`)
      .then((res) => {
        setOrder(res.data.orders);
      });
  }, [loggedinUser?.role, user?.email, axiosSecure, isAdmin]);

  const formatDate = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    return createdAtDate.toLocaleDateString();
  };

  const columns = [
    { title: "S.No", dataIndex: "sno", key: "sno" },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      key: "orderDate",
    },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Status", dataIndex: "status", key: "status" },
  ];

  let data = [];

  if (order?.length > 0) {
    data = order?.map((order, index) => ({
      key: index + 1,
      sno: index + 1,
      orderDate: formatDate(order.createdAt),
      price: `Rs. ${order.total}`,
      status: order.status,
      description: order?.orderItems?.map((cartItem, index) => (
        <div key={cartItem._id} className="w-1/2"><FoodBasket cartItem={cartItem} /></div>
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
            className={`overflow-x-auto order_table ${isAdmin ? "w-[1000px]" : ""
              }`}
          >
            <Table
              columns={columns}
              expandable={{
                expandedRowRender: (record) => (
                  <div className="flex gap-4" style={{ margin: 0 }}>
                    {record.description}
                  </div>
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

import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import { Select, Table } from "antd";
import useUser from "../../../hooks/useUser";
import FoodBasket from "../../../components/FoodBasket";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminOrder = ({ isAdmin }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [loggedinUser] = useUser();
  const [order, setOrder] = useState([]);
  const { Option } = Select;
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
  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/order/${id}`, {
        status: newStatus,
      });
    } catch (error) {
      console.error(error);
    }
  };
  const formatCustomerDetails = (order) => {
    const { userName, mobileNumber, address } = order;
    const locality = address?.locality || "";
    const area = address?.area || "";
    const city = address?.city || "";
    const pincode = address?.pincode || "";
    const landmark = address?.landmark || "";

    return `${userName}\nMobile Number: ${mobileNumber}\n${
      locality ? `${locality}, ` : ""
    }${area ? `${area}, ` : ""}\n${city ? `${city}- ` : ""}${
      pincode ? `Pincode: ${pincode}` : ""
    }\n${landmark ? `Landmark: ${landmark}` : ""}`;
  };

  const columns = [
    { title: "S.No", dataIndex: "sno", key: "sno" },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      key: "orderDate",
    },
    { title: "Price", dataIndex: "price", key: "price" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <Select
          defaultValue={text}
          onChange={(value) => handleStatusChange(record._id, value)}
        >
          {statusOptions.map((status) => (
            <Option key={status} value={status}>
              {status}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Customer Details",
      dataIndex: "customerDetails",
      key: "customerDetails",
      width: "35%",
      render: (text) => <div style={{ whiteSpace: "pre-wrap" }}>{text}</div>,
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
      customerDetails: formatCustomerDetails(order),
      description: order?.orderItems?.map((cartItem, index) => (
        <FoodBasket cartItem={cartItem} key={index} />
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
      {/*  className={`overflow-x-auto order_table ${
              isAdmin ? "sm:w-[800px] md:w-[1200px]" : ""
            }`} */}
      {/* table content */}
      <div>
        {
          <div className="overflow-x-auto order_table w-[1200px]">
            <Table
              columns={columns}
              expandable={{
                expandedRowRender: (record) => (
                  <p className="w-[500px]" style={{ margin: 0 }}>
                    {record.description}
                  </p>
                ),
                rowExpandable: (record) => record.name !== "Not Expandable",
              }}
              dataSource={data}
              pagination={{ pageSize: 5 }}
            />
          </div>
        }
      </div>
    </div>
  );
};

export default AdminOrder;
const statusOptions = [
  "Order Received",
  "Confirmed",
  "Preparing",
  "Ready",
  "Pickup",
  "Delivered",
  "Cancelled",
];

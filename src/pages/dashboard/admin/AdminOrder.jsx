import { useCallback, useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import { Select, Table } from "antd";
import useUser from "../../../hooks/useUser";
import FoodBasket from "../../../components/FoodBasket";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

import {
  FaTrashAlt,
} from "react-icons/fa";

const AdminOrder = ({ isAdmin }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [loggedinUser] = useUser();
  const [order, setOrder] = useState([]);
  const { Option } = Select;

  const GetOrder = useCallback(() => {
    let mailData =
      !isAdmin && loggedinUser?.role === "user" ? `?email=${user?.email}` : "";

    axiosSecure
      .get(`${import.meta.env.VITE_API_URL}/order${mailData}`)
      .then((res) => {
        setOrder(res.data.orders);
      });
  }, [loggedinUser?.role, user?.email, axiosSecure, isAdmin])

  useEffect(() => {
    GetOrder()
  }, [GetOrder]);

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

    const user = userName ? `<p class="capitalize m-0"> ${userName} </p>` : "";
    const locality = address?.locality || "";
    const area = address?.area || "";
    const city = address?.city || "";
    const pincode = address?.pincode ? `<p> <span class="font-bold">Pincode</span> : ${address?.pincode}</p>` : "";
    const landmark = address?.landmark ? `<p> <span class="font-bold">Landmark</span> : ${address?.landmark}</p>` : "";
    const mobile = mobileNumber ? `<p> <span class="font-bold">Mobile No</span> : ${mobileNumber} </p>` : "";

    return `${user} ${[locality, area, city].filter(Boolean).join(', ')} ${pincode}${landmark}${mobile}`;
  };

  const handleDeleteItem = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/order/${id}`);
        GetOrder();
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: `Order deleted successfully`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
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
          className="w-[60%]"
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
      render: (text) => <div dangerouslySetInnerHTML={{ __html: text }}></div>,
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      width: "10%",
      render: (id) => (
        <button
          onClick={() => handleDeleteItem(id)}
          className="btn btn-ghost btn-xs"
        >
          <FaTrashAlt className="text-red"></FaTrashAlt>
        </button>
      ),
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
        <div key={cartItem._id} className="w-1/2"><FoodBasket cartItem={cartItem} /></div>
      )),
    }));
  }

  return (
    <div className="max-w-screen-2xl container mx-auto">
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
      <div>
        {
          <div className="overflow-x-auto order_table w-full">
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

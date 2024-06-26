import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Users = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeAdmin = (user, e) => {
    axiosSecure
      .patch(`/users/admin/${user._id}`, { role: e.target.value })
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: `${user.name} is an ${res.data.role.toUpperCase()} Now!`,
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      });
  };

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          console.log(res);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        });
        refetch();
      }
    });
  };

  return (
    <div>
      <div className="flex justify-between mx-4 my-4">
        <h2 className="text-2xl">All Users</h2>
        <h2 className="text-2xl">Total Users: {users.length}</h2>
      </div>

      {/* table */}
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra md:w-[870px]">
            {/* head */}
            <thead className="bg-green text-white">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Mobile Number</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.mobileNumber}</td>
                  <td>{user.email}</td>
                  <td>
                    <select
                      className="p-2"
                      value={user.role}
                      onChange={(e) => {
                        handleMakeAdmin(user, e);
                      }}
                    >
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                      <option value="store manager">Store Manager</option>
                    </select>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteUser(user)}
                      className="btn bg-orange-500 btn-xs"
                    >
                      <FaTrashAlt className="text-white" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;

import { Button, Dropdown, Input, Menu, Modal, Space } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

const AddressModal = ({
  modalOpen,
  addressModalCancel,
  setSelectedAddress,
  handleOk,
}) => {
  const { user } = useAuth();
  const [isNewAdderssModalOpen, setIsNewAdderssModalOpen] = useState(false);
  // const [isEditAdderssModalOpen, setIsEditAdderssModalOpen] = useState(false);
  const [existingAddress, setExistingAddress] = useState([]);
  const [addressId, setAddressId] = useState("");
  const [name, setName] = useState("");
  const [pincode, setPincode] = useState("");
  const [locality, setLocality] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [landmark, setLandmark] = useState("");

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "name") {
      setName(value);
    }
    if (name === "pincode") {
      setPincode(value);
    }
    if (name === "locality") {
      setLocality(value);
    }
    if (name === "address") {
      setAddress(value);
    }
    if (name === "city") {
      setCity(value);
    }
    if (name === "landmark") {
      setLandmark(value);
    }
  };

  const addNewAddressHandler = () => {
    setIsNewAdderssModalOpen(true);
    setAddressId("");
    setName("");
    setPincode("");
    setLocality("");
    setAddress("");
    setCity("");
    setLandmark("");
  };
  const addNewAddress = async () => {
    const email = user.email;
    const Loggedinuser = await axios.get(
      `http://localhost:5000/users/${email}`
    );
    const id = Loggedinuser.data._id;
    const newAddress = {
      name,
      pincode,
      locality,
      address,
      city,
      landmark,
    };
    axios
      .post(`${import.meta.env.VITE_API_URL}/address`, newAddress, id)
      .then(() => {
        setIsNewAdderssModalOpen(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "New Address has been Added.",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  const updateAddress = () => {
    const revisedAddress = {
      name,
      pincode,
      locality,
      address,
      city,
      landmark,
    };
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/address/update/${addressId}`,
        revisedAddress
      )
      .then((res) => {
        setIsNewAdderssModalOpen(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "New Address has been Added.",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  const newAddressModalCancel = () => {
    setIsNewAdderssModalOpen(false);
  };
  const confirmAddressHandler = async (id) => {
    const selectedAddress = await axios.get(
      `${import.meta.env.VITE_API_URL}/address/${id}`
    );
    setSelectedAddress(selectedAddress.data);
  };
  const editAddressHandler = async (id) => {
    setIsNewAdderssModalOpen(true);
    setAddressId(id);
    const selectedAddress = await axios.get(
      `${import.meta.env.VITE_API_URL}/address/${id}`
    );
    setAddress(selectedAddress.data.address);
    setCity(selectedAddress.data.city);
    setLandmark(selectedAddress.data.landmark);
    setLocality(selectedAddress.data.locality);
    setName(selectedAddress.data.name);
    setPincode(selectedAddress.data.pincode);
  };
  const deleteAddressHandler = async (id) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/${id}`
    );
    setExistingAddress(response.data);
    Swal.fire({
      position: "center",
      icon: "Delted",
      title: "Address Deleted Successfully.",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/address`).then((res) => {
      console.log(res.data);
      setExistingAddress(res.data);
    });
  }, []);
  return (
    <Modal
      className="mt-48"
      title="Pick your preferred delivery location"
      open={modalOpen}
      onOk={handleOk}
      onCancel={addressModalCancel}
    >
      <button
        className="btn my-4 bg-green font-semibold mr-0 ml-auto"
        onClick={addNewAddressHandler}
      >
        Add New Address
      </button>
      <Modal
        className="mt-48"
        title={`${addressId}` ? "Update Address" : "Add New Address"}
        open={isNewAdderssModalOpen}
        onOk={`${addressId}` ? updateAddress : addNewAddress}
        onCancel={newAddressModalCancel}
      >
        <Input
          placeholder="Name"
          className="py-2 my-2"
          onChange={onChangeHandler}
          name="name"
          value={name}
        />
        <div className="flex gap-4">
          <Input
            placeholder="Pincode"
            className="py-2 my-2"
            onChange={onChangeHandler}
            name="pincode"
            value={pincode}
          />
          <Input
            placeholder="Locality (Door Number, Street)"
            className="py-2 my-2"
            onChange={onChangeHandler}
            name="locality"
            value={locality}
          />
        </div>
        <Input.TextArea
          placeholder="Address (Area )"
          className="py-2 my-2"
          onChange={onChangeHandler}
          name="address"
          value={address}
        />
        <div className="flex gap-4">
          <Input
            placeholder="City/District/Town"
            className="py-2 my-2"
            onChange={onChangeHandler}
            name="city"
            value={city}
          />
          <Input
            placeholder="Landmark"
            className="py-2 my-2"
            onChange={onChangeHandler}
            name="landmark"
            value={landmark}
          />
        </div>
      </Modal>
      <div>
        {existingAddress && existingAddress.length > 0 ? (
          existingAddress.map((address, index) => {
            return (
              <div key={index}>
                <p className="text-green font-bold text-md pb-2">
                  {address.name}
                </p>
                <p>{address.Locality}</p>
                <p>{address.address}</p>
                <p>{address.city}</p>
                <p>{address.pincode}</p>
                <p className="py-2">LandMark: {address.landmark}</p>
                <div className="flex justify-between">
                  <button
                    className=""
                    onClick={() => editAddressHandler(address._id)}
                  >
                    Edit Address{" "}
                    <FontAwesomeIcon icon={faEdit} className="ml-2" />
                  </button>
                  <button
                    className=""
                    onClick={() => confirmAddressHandler(address._id)}
                  >
                    Confirm Address{" "}
                  </button>
                  <button
                    className=""
                    onClick={() => deleteAddressHandler(address._id)}
                  >
                    Delete Address{" "}
                  </button>
                </div>
                {/* <Dropdown
                  menu={[
                    {
                      key: "1",
                      label: (
                        <button
                          className=""
                          onClick={() => editAddressHandler(address._id)}
                        >
                          Edit Address
                        </button>
                      ),
                    },
                    {
                      key: "2",
                      label: (
                        <button
                          className=""
                          onClick={() => confirmAddressHandler(address._id)}
                        >
                          Confirm Address{" "}
                        </button>
                      ),
                    },
                    {
                      key: "3",
                      label: (
                        <button
                          className=""
                          onClick={() => deleteAddressHandler(address._id)}
                        >
                          Delete Address{" "}
                        </button>
                      ),
                    },
                  ]}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                  </a>
                </Dropdown> */}
                <hr className="py-2" />
              </div>
            );
          })
        ) : (
          <p>Please add delivery Address</p>
        )}
      </div>
    </Modal>
  );
};
export default AddressModal;

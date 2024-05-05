import {
  Button,
  Checkbox,
  Dropdown,
  Input,
  Menu,
  Modal,
  Popconfirm,
  Popover,
  Space,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import {
  faCheck,
  faEllipsisVertical,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const AddressModal = ({
  modalOpen,
  addressModalCancel,
  setSelectedAddress,
  handleOk,
}) => {
  const { user } = useAuth();
  const [isNewAdderssModalOpen, setIsNewAdderssModalOpen] = useState(false);
  const [existingAddress, setExistingAddress] = useState([]);
  const [addressId, setAddressId] = useState("");
  const [name, setName] = useState("");
  const [pincode, setPincode] = useState("");
  const [locality, setLocality] = useState("");
  const [area, setArea] = useState("");
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
    if (name === "area") {
      setArea(value);
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
    setArea("");
    setCity("");
    setLandmark("");
  };

  const addNewAddress = async () => {
    const email = user.email;

    const payload = {
      user_email: email,
      name,
      pincode,
      locality,
      area,
      city,
      landmark,
    };
    axios
      .post(`${import.meta.env.VITE_API_URL}/address/`, payload)
      .then((res) => {
        setIsNewAdderssModalOpen(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "New Address has been Added.",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => console.error(error.message));
  };

  const updateAddress = () => {
    const revisedAddress = {
      name,
      pincode,
      locality,
      area,
      city,
      landmark,
    };
    axios
      .patch(
        `${import.meta.env.VITE_API_URL}/address/${addressId}`,
        revisedAddress
      )
      .then(() => {
        setIsNewAdderssModalOpen(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Address has been updated.",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => console.error(error.message));
  };

  const newAddressModalCancel = () => {
    setIsNewAdderssModalOpen(false);
  };

  const confirmAddressHandler = async (id) => {
    const selectedAddress = await axios.get(
      `${import.meta.env.VITE_API_URL}/address/address/${id}`
    );
    const email = user?.email;

    if (email) {
      let payload = {
        email,
        address: id
      }
      await axios.patch(`${import.meta.env.VITE_API_URL}/users/update-address`, payload);
    }

    setSelectedAddress(selectedAddress.data);
    handleOk();
  };

  const editAddressHandler = async (id) => {
    setIsNewAdderssModalOpen(true);
    setAddressId(id);
    const selectedAddress = await axios.get(
      `${import.meta.env.VITE_API_URL}/address/address/${id}`
    );
    const receivedAddress = selectedAddress.data;
    setArea(receivedAddress.area);
    setCity(receivedAddress.city);
    setLandmark(receivedAddress.landmark);
    setLocality(receivedAddress.locality);
    setName(receivedAddress.name);
    setPincode(receivedAddress.pincode);
  };

  const deleteAddressHandler = async (id) => {
    await axios.delete(`${import.meta.env.VITE_API_URL}/address/${id}`);

    const updatedAddresses = existingAddress.filter(
      (address) => address._id !== id
    );

    setExistingAddress(updatedAddresses);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Address Deleted Successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  useEffect(() => {
    const email = user?.email;
    if (email && modalOpen) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/address/${email}`)
        .then((res) => {
          setExistingAddress(res.data);
        });
    }
  }, [modalOpen]);

  return (
    <Modal
      className="mt-48"
      title="Pick your preferred delivery location"
      open={modalOpen}
      onOk={handleOk}
      onCancel={addressModalCancel}
    >
      <button
        className="btn my-4 bg-green font-semibold"
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
          name="area"
          value={area}
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
              <div key={index} className="my-4 pb-2 border-b-2">
                <div className="flex justify-between">
                  <p className="font-bold text-md">{address.name}</p>
                  <div className="flex gap-4">
                    <Popover title="Select this address">
                      <button
                        onClick={() => confirmAddressHandler(address._id)}
                      >
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="text-green text-2xl"
                        />
                      </button>
                    </Popover>
                    <Popover title="Edit this address">
                      <button onClick={() => editAddressHandler(address._id)}>
                        <FontAwesomeIcon icon={faEdit} className="ml-2" />
                      </button>
                    </Popover>
                    <Popconfirm
                      title="Delete this Address"
                      description="Are you sure to delete this address?"
                      onConfirm={() => {
                        deleteAddressHandler(address._id);
                      }}
                      onCancel={() => { }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <button>
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="ml-2 text-red"
                        />
                      </button>
                    </Popconfirm>
                  </div>
                </div>
                <p>{address.Locality}</p>
                <p>{address.area}</p>
                <p>{address.city}</p>
                <p>{address.pincode}</p>
                <p className=""><strong>LandMark:</strong> {address.landmark}</p>
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

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";

import sandwich from "../../assets/sandwich.png";
import AddressModal from "../../components/AddressModal";
import useUser from "../../hooks/useUser";
import axios from "axios";

import { Alert, Modal } from "antd";
import useCart from "../../hooks/useCart";
import Swal from "sweetalert2";

const CheckoutForm = ({ price, cart }) => {
  const stripe = useStripe();
  const [cartData, refetch] = useCart();
  const elements = useElements();
  const [cardError, setcardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState({ error: null, message: "" });
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [loggedinUser] = useUser();
  const navigate = useNavigate();

  const anotherAddressHandler = () => {
    setIsAddressModalOpen(true);
  };
  const addressModalCancel = () => {
    setIsAddressModalOpen(false);
  };
  const handleOk = () => {
    setIsAddressModalOpen(false);
  };
  const discount = 0;

  const basketPrice = cart.reduce((total, cartItem) => {
    return total + cartItem.price * cartItem.quantity; // Accumulate the price of each cart item
  }, 0);

  const tax = cart.reduce((total, cartItem) => {
    return total + cartItem.price * cartItem.quantity * 0.06;
  }, 0);

  const totalAmount = cart.reduce((total, cartItem) => {
    return total + cartItem.price * cartItem.quantity;
  }, 0);

  let deliveryCharge = totalAmount <= 2000 ? 30 : 0;

  const editBasketHandler = () => {
    navigate("/cartpage");
  };

  const confirmOrderHandler = async () => {
    if (cart.length <= 0) {
      setError({
        error: true,
        message:
          "Your cart is empty! Please add items to your cart before checkout.",
      });
    } else {
      console.log(selectedAddress);
      if (
        Object.keys(selectedAddress).length === 0 &&
        selectedAddress.constructor === Object
      ) {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "Please choose address for delivery",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        axiosSecure
          .post(
            `${import.meta.env.VITE_API_URL}/carts/confirm?email=${user?.email
            }`,
            { address: selectedAddress }
          )
          .then((res) => {
            refetch();
            setIsModalOpen(true);
            navigate("/order");
          });
      }
    }
  };
  const handleConfirmOrderCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    if (loggedinUser?.address) {
      const getAddressHandler = async () => {
        const selectedAddress = await axios.get(
          `${import.meta.env.VITE_API_URL}/address/address/${loggedinUser?.address
          }`
        );
        setSelectedAddress(selectedAddress.data);
      };
      getAddressHandler();
    }
  }, [loggedinUser]);

  return (
    <div className="flex flex-col md:flex-row justify-between max-w-6xl mx-auto md:mt-12 ">
      <div className="flex flex-col gap-10 max-w-4xl mx-auto w-full">
        <div className="md:w-3/4 w-full border card shadow-xl bg-base-100 px-4 py-8 my-2">
          <div className="flex flex-col md:flex-row justify-between mb-4">
            <p className="font-bold text-lg">Address</p>
            <button
              className="text-green font-semibold"
              onClick={anotherAddressHandler}
            >
              Manage address
            </button>
            <AddressModal
              modalOpen={isAddressModalOpen}
              addressModalCancel={addressModalCancel}
              setSelectedAddress={setSelectedAddress}
              handleOk={handleOk}
            />
          </div>
          {selectedAddress ? (
            <div>
              <p>{selectedAddress.name}</p>
              <p>{selectedAddress.locality}</p>
              <p>{selectedAddress.area}</p>
              <p>{selectedAddress.city}</p>
              <p>{selectedAddress.pincode}</p>
              <p className="py-2">{selectedAddress.landmark}</p>
              <p>Contact Number: {loggedinUser?.mobileNumber}</p>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="md:w-3/4 w-full border card shadow-xl bg-base-100 px-4 py-8 my-2">
          <div className="flex flex-col-reverse md:flex-row text-center md:justify-between ">
            <p className="text-lg font-bold">Food Basket</p>
            <button onClick={editBasketHandler}>
              Edit Cart <FontAwesomeIcon icon={faEdit} className="ml-2" />
            </button>
          </div>
          <div className="flex flex-col justify-between py-4 ">
            {cart && cart.length > 0 ? (
              cart.map((cartItem, index) => {
                return (
                  <div key={index} className="flex flex-col md:flex-row py-4 ">
                    <div className="flex flex-row gap-2 items-start">
                      <p className="mr-2">x{cartItem.quantity}</p>
                      <div className="w-[80px] h-[80px]">
                        <img
                          src={cartItem?.image || sandwich}
                          alt={cartItem?.name}
                          className="w-[80px] h-[80px] mr-2 object-cover"
                        />
                      </div>
                      <div className="felx flex-col gap-2">
                        <p className="font-bold capitalize mr-4">
                          {cartItem.name}
                        </p>
                        <div className="text-gray-400 text-sm">
                          {cartItem.size && cartItem.size.length > 0 ? (
                            <p className="capitalize">size: {cartItem.size}</p>
                          ) : (
                            <></>
                          )}
                          {cartItem.toppings && cartItem.toppings.length > 0 ? (
                            <p className="capitalize">
                              Toppings: {cartItem.toppings?.join(", ")}
                            </p>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mr-2 ml-auto">
                      <p className="font-bold">
                        Rs. {cartItem.price * cartItem.quantity}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div className="md:w-1/2 w-full border card shadow-xl bg-base-100 px-4 py-8 my-2 h-[550px]">
        <div>
          <p className="font-bold text-lg">Order Summary</p>
          <div className="flex justify-between pt-6">
            <p className="font-semibold">Basket Price</p>
            <p>Rs. {basketPrice}</p>
          </div>
          <div className="flex justify-between pt-4">
            <p className="font-semibold">Delivery</p>
            <p>Rs. {deliveryCharge}</p>
          </div>
          <div className="flex justify-between pt-4">
            <p className="font-semibold">Tax (12%)</p>
            <p>Rs. {tax}</p>
          </div>
          <div className="flex justify-between py-4">
            <p className="font-semibold">Discount</p>
            <p>Rs. {discount}</p>
          </div>
          <hr />
          <div className="flex justify-between pt-4">
            <p className="font-semibold">Order Total</p>
            <p>Rs. {discount + deliveryCharge + tax + basketPrice}</p>
          </div>
        </div>
        <hr />
        <div className="flex justify-between items-center my-8">
          <p className="text-medium font-semibold">Payment Method</p>
          <p className="text-medium">Cash on Delivery</p>
        </div>

        <button
          className="btn bg-green w-full mt-4 text-white"
          onClick={confirmOrderHandler}
        >
          Confirm order
        </button>
        {error.error ? (
          <Alert message={error.message} type="error" className="my-2" />
        ) : (
          <></>
        )}
        <Modal
          className="mt-48 w-1/4"
          open={isModalOpen}
          footer={null}
          onCancel={handleConfirmOrderCancel}
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold  my-4">Thank You!</h2>
            <p className="text-lg">
              The delicious items you have been chosen will soon be at your
              doorstep
            </p>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default CheckoutForm;

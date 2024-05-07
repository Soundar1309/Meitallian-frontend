import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import Swal from "sweetalert2";
import useCart from "../hooks/useCart";
import axios from "axios";
import { Alert, Input, Modal, Popover, Radio } from "antd";
import CheckableTag from "./CheckableTag";
import DisabledPopover from "./DisablePopover";
import useAuth from "../hooks/useAuth";

const Cards = ({ item }) => {
  const { name, image, price, recipe, _id } = item;

  // const { user } = useContext(AuthContext);
  const { user } = useAuth();
  const [cart, refetch] = useCart();
  const [menuDetail, setMenuDetail] = useState([]);
  const [mobileNumber, setMobileNumber] = useState("");
  const [size, setSize] = useState([]);
  const [toppings, setToppings] = useState([]);
  const [count, setCount] = useState(1);
  const [isMobileNoModalOpen, setIsMobileNoModalOpen] = useState(false);
  const [isOrderModelOpen, setIsOrderModelOpen] = useState(false);
  const [error, setError] = useState({ error: false, message: "" });
  const navigate = useNavigate();
  const location = useLocation();

  const MobileNoCancelHandler = () => {
    setIsMobileNoModalOpen(false);
  };

  const OrderCancelHandler = () => {
    setIsOrderModelOpen(false);
  };

  const sizeHandler = (e) => {
    setSize(e.target.value);
    setError({ error: false, message: "" });
  };

  const incrementHandler = () => {
    setCount(count + 1);
  };

  const decrementHandler = () => {
    if (count === 1) return;
    setCount(count - 1);
  };

  const MobileNumberHandler = (e) => {
    setError({ error: false, message: "" });
    const EnteredMobileNumber = e.target.value;
    const isValid = EnteredMobileNumber.replace(/\D/g, "");
    if (!isValid) return;
    setMobileNumber(EnteredMobileNumber);
  };

  const handleAddToCart = async () => {
    setError({ error: false, message: "" });
    setMobileNumber("");
    setSize([]);
    setToppings([]);
    setCount(1);
    const email = user.email;
    const Loggeduser = await axios.get(`http://localhost:5000/users/${email}`);
    if (!Loggeduser.data.mobileNumber) {
      setIsMobileNoModalOpen(true);
    } else {
      setIsOrderModelOpen(true);
    }
  };

  const mobileNumberOkHandler = () => {
    const email = user.email;
    if (mobileNumber.length < 10) {
      setError({ error: true, message: "Enter Valid Mobile Number" });
      setIsMobileNoModalOpen(true);
      setIsOrderModelOpen(false);
    } else {
      setError({ error: false, message: "" });
      const userDataUpdate = { mobileNumber, email };
      axios.patch(
        `${import.meta.env.VITE_API_URL}/users/update`,
        userDataUpdate
      );
      setIsMobileNoModalOpen(false);
      setIsOrderModelOpen(true);
    }
  };
  const orderOkHandler = () => {
    if (user?.email) {
      if (size.length === 0) {
        setError({ error: true, message: "Please customize your order" });
        setIsOrderModelOpen(true);
        return;
      }
      const cartItem = {
        menuItemId: _id,
        name,
        image,
        price: size
          ? item.size.find((item) => item.label === size)?.price
          : price,
        email: user.email,
        size: size,
        toppings: toppings,
        quantity: count,
      };
      axios
        .post(`${import.meta.env.VITE_API_URL}/carts`, cartItem)
        .then((response) => {
          if (response) {
            setIsOrderModelOpen(false);
            refetch(); // refetch cart
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Food added on the cart.",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((error) => {
          const errorMessage = error.response.data.message;
          Swal.fire({
            position: "center",
            icon: "warning",
            title: `${errorMessage}`,
            showConfirmButton: false,
            timer: 1500,
          });
          setIsOrderModelOpen(false);
        });
    } else {
      Swal.fire({
        title: "Please login to order the food",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login now!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/menu/${_id}`).then((res) => {
      setMenuDetail(res.data);
    });
  }, [_id]);

  return (
    <div className="card shadow-xl relative mr-5 md:my-5 cursor-pointer h-[560px]">
      <Link to={`/menu/${item._id}`}>
        <figure>
          <img
            src={item.image}
            alt="popular dish"
            className="hover:scale-105 transition-all duration-300 md:h-72 w-full object-cover card-image"
          />
        </figure>
      </Link>
      <div className="card-body">
        <Link to={`/menu/${item._id}`}>
          <h2 className="card-title">{item.name}</h2>
        </Link>
        <Link to={`/menu/${item._id}`}>
          <p className="card-desc line-clamp-3">{item.recipe}!</p>
        </Link>

        <div className="card-actions justify-between items-center mt-2">
          {item.price ? (
            <h5 className="font-semibold">
              <span className="text-sm text-red">Rs.</span> {item.price}
            </h5>
          ) : item.size[0]?.price ? (
            <h5 className="font-semibold">
              <span className="text-sm text-red">Starts at </span>{" "}
              {item.size[0]?.price}
            </h5>
          ) : (
            <></>
          )}
          {user ? (
            <button
              onClick={() => handleAddToCart(item)}
              className="btn bg-green text-white"
            >
              Add to Cart
            </button>
          ) : (
            <DisabledPopover>
              <button className="btn opacity-50">Add to Cart</button>
            </DisabledPopover>
          )}
          <Modal
            className="mt-48 w-1/4"
            title="Mobile Number"
            open={isMobileNoModalOpen}
            onOk={mobileNumberOkHandler}
            onCancel={MobileNoCancelHandler}
          >
            <Input
              placeholder="Enter Mobile Number"
              onChange={MobileNumberHandler}
              value={mobileNumber}
              maxLength={10}
              className="py-2"
            />
            {error.error ? (
              <Alert message={error.message} type="error" className="mt-4" />
            ) : (
              <></>
            )}
          </Modal>
          <Modal
            className="mt-48 w-1/4"
            title="Choose, Order & TakeOut"
            open={isOrderModelOpen}
            onOk={orderOkHandler}
            onCancel={OrderCancelHandler}
          >
            {menuDetail.size && menuDetail.size.length > 0 ? (
              <div className="my-6 flex flex-row gap-8 items-center ">
                <p className="mb-2">Size :</p>
                <Radio.Group>
                  {menuDetail.size.map((availableSize, index) => (
                    <Radio.Button
                      key={index}
                      value={availableSize.label}
                      onChange={sizeHandler}
                      className="h-[40px]"
                    >
                      {availableSize.label}
                    </Radio.Button>
                  ))}
                </Radio.Group>
              </div>
            ) : (
              <></>
            )}
            {menuDetail.toppings && menuDetail.toppings.length > 0 ? (
              <div className="my-6">
                <CheckableTag
                  label="Toppings :"
                  tagData={menuDetail.toppings}
                  selectedTags={toppings}
                  setToppings={setToppings}
                  setError={setError}
                />
              </div>
            ) : (
              <></>
            )}
            <div className="flex gap-4 items-center mb-6">
              <p>Quantity :</p>
              <button
                onClick={decrementHandler}
                className="bg-white border text-black font-xl rounded-full px-4 py-2"
              >
                -
              </button>

              <p>{count}</p>
              <button
                onClick={incrementHandler}
                className="bg-white border text-black font-xl rounded-full px-4 py-2"
              >
                +
              </button>
            </div>
            {error.error ? (
              <Alert message={error.message} type="error" className="mb-4" />
            ) : (
              <></>
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Cards;

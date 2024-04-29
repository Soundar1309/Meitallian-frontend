import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import Swal from "sweetalert2";
import useCart from "../hooks/useCart";
import axios from "axios";
import { Alert, Modal, Radio } from "antd";
import CheckableTag from "./CheckableTag";

const Cards = ({ item }) => {
  const { name, image, price, recipe, _id } = item;

  const { user } = useContext(AuthContext);
  const [cart, refetch] = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuDetail, setMenuDetail] = useState([]);
  const [size, setSize] = useState([]);
  const [toppings, setToppings] = useState([]);
  const [count, setCount] = useState(1);
  const [error, setError] = useState({ error: false, message: "", name: "" });
  const navigate = useNavigate();
  const location = useLocation();
  const handleCancel = () => {
    setIsModalOpen(false);
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
  const handleAddToCart = (item) => {
    setError({ error: false, message: "" });
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (user && user.email) {
      if (size.length === 0 || toppings.length === 0) {
        setError({ error: true, message: "Please customize your order" });
        setIsModalOpen(true);
        return;
      }
      const cartItem = {
        menuItemId: _id,
        name,
        image,
        price,
        email: user.email,
        size: size,
        toppings: toppings,
        quantity: count,
      };
      axios
        .post("http://localhost:5000/carts", cartItem)
        .then((response) => {
          if (response) {
            setIsModalOpen(false);
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
          setIsModalOpen(false);
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
    axios.get(`http://localhost:5000/menu/${_id}`).then((res) => {
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
            className="hover:scale-105 transition-all duration-300 md:h-72 w-full object-cover"
          />
        </figure>
      </Link>
      <div className="card-body">
        <Link to={`/menu/${item._id}`}>
          <h2 className="card-title">{item.name}!</h2>
        </Link>
        <Link to={`/menu/${item._id}`}>
          <p className="card-desc line-clamp-3">{item.recipe}!</p>
        </Link>

        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold">
            <span className="text-sm text-red">Rs.</span> {item.price}
          </h5>
          <button
            onClick={() => handleAddToCart(item)}
            className="btn bg-green text-white"
          >
            Add to Cart{" "}
          </button>
          <Modal
            className="mt-48 w-1/4"
            title="Customize Your Order"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            {menuDetail.size && menuDetail.size.length > 0 ? (
              <div className="my-6 flex flex-row gap-8 items-center ">
                <p className="mb-2">Size :</p>
                <Radio.Group>
                  {menuDetail.size.map((availableSize, index) => (
                    <Radio.Button
                      key={index}
                      value={availableSize}
                      onChange={sizeHandler}
                      className="h-[40px]"
                    >
                      {availableSize}
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

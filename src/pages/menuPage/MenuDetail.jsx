import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, Input, Modal, Radio, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import CheckableTag from "../../components/CheckableTag";

const MenuDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [menuDetail, setMenuDetail] = useState([]);
  const [size, setSize] = useState([]);
  const [toppings, setToppings] = useState([]);

  const [mobileNumber, setMobileNumber] = useState("");
  const [count, setCount] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState({ error: null, message: "" });
  const { user } = useAuth();

  const email = user.email;
  const addToCheckout = () => {
    const cartItem = {
      ...menuDetail,
      size: size,
      toppings: toppings,
      email: email,
      quantity: count,
      menuItemId: menuDetail._id,
    };

    delete cartItem._id;
    axios
      .post("http://localhost:5000/carts", cartItem)
      .then(() => {
        navigate("/process-checkout");
      })
      .catch((error) =>
        setError({ error: true, message: error.response.data.message })
      );
  };

  const buyNowHandler = async () => {
    if (size.length <= 0) {
      setError({ error: true, message: "Select the size" });
      return;
    }
    const user = await axios.get(`http://localhost:5000/users/${email}`);
    if (!user.data.mobileNumber) {
      setIsModalOpen(true);
      const userDataUpdate = { mobileNumber, email };
      axios.patch("http://localhost:5000/users/update", userDataUpdate);
      addToCheckout();
    } else {
      addToCheckout();
    }
  };

  const handleOk = () => {
    if (mobileNumber.length < 10) {
      setError({ error: true, message: "Enter Valid Mobile Number" });
      setIsModalOpen(true);
    } else {
      setError({ error: false, message: "" });
      setIsModalOpen(false);
      setMobileNumber("");
    }
  };
  const sizeHandler = (e) => {
    setError({ error: null, message: "" });
    setSize(e.target.value);
  };
  const MobileNumberHandler = (e) => {
    setError({ error: false, message: "" });
    const EnteredMobileNumber = e.target.value;
    const isValid = EnteredMobileNumber.replace(/\D/g, "");
    if (!isValid) return;
    setMobileNumber(EnteredMobileNumber);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setMobileNumber("");
  };

  const incrementHandler = () => {
    setCount(count + 1);
  };
  const decrementHandler = () => {
    if (count === 1) return;
    setCount(count - 1);
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/menu/${id}`).then((res) => {
      setMenuDetail(res.data);
    });
  }, [id]);
  return (
    <div className="mt-44 flex gap-2 max-w-4xl mx-auto shadow-xl rounded-lg ">
      <img
        src={menuDetail.image}
        alt=""
        className="w-2/4 rounded-lg object-cover"
      />
      <div className="flex flex-col gap-4 px-4 w-3/4 pb-4">
        <p className="capitalize font-bold text-3xl"> {menuDetail.name}</p>

        <p className="text-lg text-green font-bold"> Rs. {menuDetail.price}</p>
        <p>
          Category:
          <span className="capitalize ml-2 text-green">
            {menuDetail.category}
          </span>{" "}
        </p>
        {menuDetail.size && menuDetail.size.length > 0 ? (
          <div>
            <p className="pb-2">
              Size <span className="text-xl text-[#f06548]">*</span>
            </p>
            <Radio.Group>
              {menuDetail.size.map((availableSize, index) => (
                <Radio.Button
                  key={index}
                  value={availableSize}
                  onChange={sizeHandler}
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
          <div>
            <CheckableTag
              label="Toppings"
              tagData={menuDetail.toppings}
              selectedTags={toppings}
              setToppings={setToppings}
            />
          </div>
        ) : (
          <></>
        )}

        <p className="my-2"> {menuDetail.recipe}</p>
        {error.error ? <Alert message={error.message} type="error" /> : <></>}
        <div className="flex flex-row justify-between mb-4">
          <div className="flex gap-4 items-center">
            <button
              onClick={decrementHandler}
              className="bg-green text-white font-xl rounded-full px-4 py-2"
            >
              -
            </button>

            <p>{count}</p>
            <button
              onClick={incrementHandler}
              className="bg-green text-white font-xl rounded-full px-4 py-2"
            >
              +
            </button>
          </div>

          <button className="btn bg-green text-white" onClick={buyNowHandler}>
            Buy Now
          </button>
          <Modal
            className="mt-48 w-1/4"
            title="Mobile Number"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Input
              placeholder="Enter Mobile Number"
              onChange={MobileNumberHandler}
              value={mobileNumber}
              maxLength={10}
            />
          </Modal>
        </div>
        <button className="flex gap-4 items-center">
          <FontAwesomeIcon icon={faHeart} />
          <p>Add to wishlist</p>
        </button>
      </div>
    </div>
  );
};
export default MenuDetail;

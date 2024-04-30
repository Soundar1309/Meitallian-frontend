import { Alert, Input, Modal, Radio } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import CheckableTag from "../../components/CheckableTag";
import DisabledPopover from "../../components/DisablePopover";

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


  const addToCheckout = (shouldNavigate) => {
    const email = user.email;
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
      .post(`${import.meta.env.VITE_API_URL}/carts`, cartItem)
      .then(() => {
        if (shouldNavigate) navigate("/process-checkout");
      })
      .catch((error) =>
        setError({ error: true, message: error.response.data.message })
      );
  };

  const buyNowHandler = async () => {
    const email = user.email;
    const user = await axios.get(`http://localhost:5000/users/${email}`);
    if (!user.data.mobileNumber) {
      setIsModalOpen(true);
      const userDataUpdate = { mobileNumber, email };
      axios.patch(`${import.meta.env.VITE_API_URL}/users/update`, userDataUpdate);
      addToCheckout(true);
    } else {
      addToCheckout(true);
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
    axios.get(`${import.meta.env.VITE_API_URL}/menu/${id}`).then((res) => {
      setMenuDetail(res.data);
    });
  }, [id]);
  return (
    <div className="my-44 max-w-7xl mx-auto px-16">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 w-full">
          <img
            src={menuDetail.image}
            alt=""
            className="w-full h-[480px] rounded-xl object-cover"
          />
        </div>
        <div className="md:w-1/2 w-full">
          <p className="capitalize font-bold text-xl md:text-3xl mb-2">
            {" "}
            {menuDetail.name}
          </p>
          <p className="mb-4">
            Category: <span className="capitalize ml-2 text-green"> {menuDetail.category} </span>
          </p>
          <p className="text-2xl text-green font-bold my-6">
            {" "}
            Rs. {menuDetail.price}
          </p>
          {menuDetail.size && menuDetail.size.length > 0 ? (
            <div className="mb-4 flex flex-row gap-8 items-center">
              <p className="mb-2">Size :</p>
              <Radio.Group>
                {menuDetail.size.map((availableSize, index) => (
                  <Radio.Button
                    key={availableSize}
                    value={availableSize}
                    onChange={sizeHandler}
                    className="h-[80px]"
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
            <div className="mb-6">
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
          <div className="flex gap-4 items-center mb-5">
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
          <div className="flex flex-row md:gap-12 gap-4">
            {user ?
              <button
                onClick={() => addToCheckout(false)}
                className="btn bg-green text-white w-[150px]"
              >
                Add to Cart
              </button>
              :
              <DisabledPopover>
                <button
                  className="btn opacity-50"
                >
                  Add to Cart
                </button>
              </DisabledPopover>
            }
            {user ?
              <button
                className="btn bg-green text-white w-[150px]"
                onClick={buyNowHandler}
              >
                Buy Now
              </button>
              :
              <DisabledPopover>
                <button
                  className="btn opacity-50"
                >
                  Buy Now
                </button>
              </DisabledPopover>
            }
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
        </div>
      </div>
      <p className="my-8 w-full "> {menuDetail.recipe}</p>
    </div>
  );
};
export default MenuDetail;

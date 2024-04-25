import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input, Modal, Radio } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const MenuDetail = () => {
  const { id } = useParams();
  const [menuDetail, setMenuDetail] = useState([]);
  const [mobileNumber, setMobileNumber] = useState("");
  const [count, setCount] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState({ error: null, message: "" });
  const { user } = useAuth();

  const email = user.email;
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (mobileNumber.length < 10) {
      setError({ error: true, message: "Enter Valid Mobile Number" });
      setIsModalOpen(true);
    } else {
      const userDataUpdate = { mobileNumber, email };
      axios
        .patch("http://localhost:5000/users/update", userDataUpdate)
        .then((res) => console.log(res));
      setError({ error: false, message: "" });
      setIsModalOpen(false);
      setMobileNumber("");
    }
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
      console.log(res.data.size);
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
            <p className="pb-2">Size</p>
            <Radio.Group>
              {menuDetail.size.map((availableSize, index) => (
                <Radio.Button key={index} value={availableSize}>
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
            <p className="pb-2">Toppings</p>
            <Radio.Group>
              {menuDetail.toppings.map((availableTopping, index) => (
                <Radio.Button key={index} value={availableTopping}>
                  {availableTopping}
                </Radio.Button>
              ))}
            </Radio.Group>
          </div>
        ) : (
          <></>
        )}
        <p className="my-2"> {menuDetail.recipe}</p>
        <div className="flex flex-row justify-between mb-4">
          <div className="flex gap-4 items-center">
            <button
              onClick={incrementHandler}
              className="bg-green text-white font-xl rounded-full px-4 py-2"
            >
              +
            </button>

            <p>{count}</p>
            <button
              onClick={decrementHandler}
              className="bg-green text-white font-xl rounded-full px-4 py-2"
            >
              -
            </button>
          </div>
          <button className="btn bg-green text-white" onClick={showModal}>
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
            {error.error ? (
              <p className="mt-2 text-[#f06548]">{error.message}</p>
            ) : (
              <></>
            )}
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

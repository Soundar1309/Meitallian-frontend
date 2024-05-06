import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Checkbox, Col, Row, Tag } from "antd";
import { useState } from "react";
import Tags from "../../../components/Tags";
const AddMenu = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [size, setSize] = useState([]);
  const [sizeValue, setSizeValue] = useState([]);
  const [toppings, setToppings] = useState([]);

  // image hosting keys
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
  const SizeHandler = (e) => {
    setSize(e);
    setSizeValue([...sizeValue.filter((item) => e.includes(item.label))])
  };

  // on submit form
  const onSubmit = async (data) => {

    // image upload to imgbb and then get an url
    const imageFile = { image: data.image[0] };
    const hostingImg = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (hostingImg.data.success) {
      // now send the menu item data to the server with the image url
      const menuItem = {
        name: data.name,
        category: data.category,
        price: sizeValue.length === 0 ? parseFloat(data.price) : 0,
        recipe: data.recipe,
        image: hostingImg.data.data.display_url,
        size: sizeValue,
        toppings: toppings,
      };

      const menuRes = await axiosSecure.post("/menu", menuItem);
      if (menuRes.status === 200) {
        // show success popup
        reset();
        setSize("");
        setToppings([]);
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: `${data.name} is added to the menu.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  const SizeValueChangeHandler = (label, value) => {
    setSizeValue([...sizeValue.filter((item) => item.label !== label), { "label": label, "price": parseInt(value) }])
  };

  return (
    <div className="w-full md:w-[870px] mx-auto px-4">
      <h2 className="text-2xl font-semibold my-4">
        Upload A New <span className="text-green">Menu Item</span>
      </h2>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">
                Recipe Name
                <span className="ml-1 text-xl text-[#f06548]">*</span>
              </span>
            </label>
            <input
              type="text"
              placeholder="Recipe Name"
              {...register("name", { required: true })}
              required
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex gap-6">
            {/* category */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">
                  Category
                  <span className="ml-1 text-xl text-[#f06548]">*</span>
                </span>
              </label>
              <select
                defaultValue="default"
                {...register("category", { required: true })}
                className="select select-bordered w-full"
              >
                <option disabled value="default">
                  Select a category
                </option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">Drinks</option>
                <option value="popular">popular</option>
              </select>
            </div>

            {/* price */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">
                  Price
                  <span className="ml-1 text-xl text-[#f06548]">{size?.length === 0 ? <span>*</span> : <></>}</span>
                </span>
              </label>
              <input
                type="number"
                placeholder="Price"
                {...register("price", { required: size?.length === 0 })}
                className="input input-bordered w-full"
              />
            </div>
          </div>
          <div className="mb-4">
            <p className="mb-2">
              Size
            </p>
            <Checkbox.Group
              onChange={SizeHandler}
              value={size}
            >
              <Row>
                {sizeOptions.map((item) => {
                  return <Col span={24} key={item.value}>
                    <div className="flex items-center my-2">
                      <div className="w-1/5">
                        <Checkbox value={item.value}>{item.label}</Checkbox>
                      </div>
                      {size.includes(item.value) ?
                        <div className="w-3/4">
                          <input
                            type="number"
                            placeholder="Price"
                            {...register(`${item.value}-price`, { required: true })}
                            className="input input-bordered"
                            onChange={(e) => SizeValueChangeHandler(item.value, e.target.value)}
                            value={sizeValue?.find((item) => item.label === item.value)?.price}
                          />
                        </div>
                        : <></>}
                    </div>
                  </Col>
                })}
              </Row>
            </Checkbox.Group>
          </div>
          <div className="mb-4">
            <p className="mb-2">Toppings</p>

            <Tags setToppings={setToppings} toppings={toppings} />
          </div>

          {/* recipe details */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                Recipe Details
                <span className="ml-1 text-xl text-[#f06548]">*</span>
              </span>
            </label>
            <textarea
              {...register("recipe")}
              className="textarea textarea-bordered h-24"
              placeholder="Recipe Details"
            ></textarea>
          </div>

          <div className="form-control w-full my-6">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>

          <button className="btn bg-green text-white px-6">
            Add Item <FaUtensils></FaUtensils>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMenu;
const sizeOptions = [
  {
    label: "Regular",
    value: "Regular",
  },
  {
    label: "Medium",
    value: "Medium",
  },

  {
    label: "Large",
    value: "Large",
  },
];
const toppingOptions = [
  {
    label: "Pepperoni",
    value: "Pepperoni",
  },
  {
    label: "Hawaiian",
    value: "Hawaiian",
  },
  {
    label: "Garlic Prawns",
    value: "Garlic Prawns",
  },
  {
    label: "Potato & Rosemary",
    value: "Potato & Rosemary",
  },
  {
    label: "Broccoli",
    value: "Broccoli",
  },
];

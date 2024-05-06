import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaUtensils } from "react-icons/fa";
import { Checkbox, Col, Row } from "antd";
import Tags from "../../../components/Tags";

const UpdateMenu = () => {
  const [size, setSize] = useState([]);
  const [sizeValue, setSizeValue] = useState([]);
  const [toppings, setToppings] = useState([]);
  const item = useLoaderData();

  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // image hosting keys
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const SizeHandler = (e) => {
    setSize(e);
    setSizeValue([...sizeValue.filter((item) => e.includes(item.label))])
  };

  useEffect(() => {
    setSize(item.size.map((item) => item.label));
    setSizeValue(item.size);
    setToppings(item.toppings);
  }, [item]);

  // on submit form
  const onSubmit = async (data) => {
    // console.log(data);
    // image upload to imgbb and then get an url
    let hostingImg;
    if (data.image[0]) {
      const imageFile = { image: data.image[0] };
      hostingImg = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
    }

    if (item.image || hostingImg.data.success) {
      // now send the menu item data to the server with the image url
      const menuItem = {
        name: data?.name,
        category: data.category,
        price: sizeValue.length === 0 ? parseFloat(data.price) : 0,
        recipe: data.recipe,
        image: hostingImg?.data.data.display_url || item.image,
        size: sizeValue,
        toppings: toppings,
      };

      const menuRes = await axiosSecure.patch(`menu/${item._id}`, menuItem);

      if (menuRes.status === 200) {
        // show success popup
        reset();
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: `Item is updated successfully!`,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/manage-items");
      }
    }
  };

  const SizeValueChangeHandler = (label, value) => {
    setSizeValue([...sizeValue.filter((item) => item.label !== label), { "label": label, "price": parseInt(value) }])
  };

  console.log(sizeValue);
  console.log(size);
  return (
    <div className="w-full md:w-[870px] mx-auto px-4">
      <h2 className="text-2xl font-semibold my-4">
        Update <span className="text-green">Menu Item</span>
      </h2>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full my-6">
            <label htmlFor="name" className="label">
              <span className="label-text">Recipe Name
                <span className="ml-1 text-xl text-[#f06548]">*</span>
              </span>
            </label>
            <input
              type="text"
              placeholder="Recipe Name"
              defaultValue={item.name}
              {...register("name", { required: true })}
              required
              id="name"
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex gap-6">
            {/* category */}
            <div className="form-control w-full my-6">
              <label htmlFor="category" className="label">
                <span className="label-text">Category
                  <span className="ml-1 text-xl text-[#f06548]">*</span>
                </span>
              </label>
              <select
                defaultValue={item.category}
                id="category"
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
              <label htmlFor="price" className="label">
                <span className="label-text">Price
                  <span className="ml-1 text-xl text-[#f06548]">{size?.length === 0 ? <span>*</span> : <></>}</span>
                </span>
              </label>
              <input
                type="number"
                placeholder="Price"
                id="price"
                defaultValue={item.price}
                {...register("price", { required: size?.length === 0 })}
                className="input input-bordered w-full"
              />
            </div>
          </div>
          <div className="mb-4">
            <p className="mb-2">Size</p>
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
                            value={sizeValue?.find((itm) => itm.label === item.value)?.price}
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
            <label htmlFor="recipe" className="label">
              <span className="label-text">Recipe Details</span>
            </label>
            <textarea
              {...register("recipe")}
              id="recipe"
              className="textarea textarea-bordered h-24"
              placeholder="recipe details"
              defaultValue={item.recipe}
            ></textarea>
          </div>

          <div className="form-control w-full my-6">
            <input
              {...register("image", { required: false })}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>

          <button className="btn bg-green text-white px-6">
            Update Item <FaUtensils></FaUtensils>
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateMenu;
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

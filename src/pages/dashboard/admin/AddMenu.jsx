import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Checkbox, Col, Row, Tag } from "antd";
import { useEffect, useState } from "react";
import Tags from "../../../components/Tags";
import InputContainer from "../../../components/input/InputContainer";
import { useLoaderData, useParams } from "react-router-dom";
import axios from "axios";
const AddMenu = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [size, setSize] = useState([]);
  const [sizeValue, setSizeValue] = useState([]);
  const [toppings, setToppings] = useState([]);
  const [formData, setFormData] = useState([]);
  const [formErrors, setFormErrors] = useState([]);

  const item = useLoaderData();
  console.log(item);
  const params = useParams();
  const id = params.id;
  // image hosting keys
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
  const SizeHandler = (e) => {
    setSize(e);
    setSizeValue([...sizeValue.filter((item) => e.includes(item.label))]);
  };
  const validate = (values, imageFile) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Please enter recipe name";
    }
    if (!values.category || values.category.length === 0) {
      errors.category = "Please select category";
    }
    if (!values.price) {
      errors.price = "Please enter price";
    }
    if (!values.recipe) {
      errors.recipe = "Please enter recipe details";
    }
    if (!imageFile || !imageFile.image) {
      errors.image = "Please upload an image";
    }
    return errors;
  };
  // on submit form
  const onSubmit = async (data) => {
    const imageFile =
      data.image && data.image[0] ? { image: data.image[0] } : null;
    const fieldErrors = validate(formData, imageFile);

    if (Object.keys(fieldErrors).length > 0) {
      setFormErrors(fieldErrors);
      return;
    } else {
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
          name: formData.name,
          category: formData.category,
          price: sizeValue.length === 0 ? formData.price : 0,
          recipe: formData.recipe,
          image: hostingImg.data.data.display_url,
          size: sizeValue,
          toppings: toppings,
        };
        const menuRes = await axiosSecure.post("/menu", menuItem);
        if (menuRes.status === 200) {
          // show success popup
          reset();
          setFormData([]);
          setSize("");
          setToppings([]);
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `${formData.name} is added to the menu.`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
    setFormData({ ...formData, [name]: value });
  };

  const SizeValueChangeHandler = (label, value) => {
    setSizeValue([
      ...sizeValue.filter((item) => item.label !== label),
      { label: label, price: parseInt(value) },
    ]);
  };
  const multiSelectChangeHandler = (nameField, valueField, valueObject) => {
    if (valueObject) {
      setFormErrors({ ...formErrors, [nameField]: [] });
    }
    setFormData({
      ...formData,
      [nameField]: valueObject
        ? valueObject.map((item) => item[valueField])
        : [],
    });
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormErrors({ ...formErrors, image: "" });
    }
  };
  useEffect(() => {
    axios.get(`/menu/${id}`).then((res) => {
      console.log(res);
    });
  }, []);
  return (
    <div className="w-full md:w-[870px] mx-auto px-4">
      <h2 className="text-2xl font-semibold my-4">
        Upload A New <span className="text-green">Menu Item</span>
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputContainer
          label="Recipe Name"
          type="text"
          placeholder="Recipe Name"
          name="name"
          onChange={handleChange}
          value={formData.name}
          error={formErrors.name}
          required
          className="mb-4"
        />

        <div className="flex gap-6 mb-4">
          <div className="w-full">
            <InputContainer
              label="Category"
              type="select"
              isMulti
              placeholder=" Select a category"
              name="category"
              value={formData.category}
              error={formErrors?.category}
              required
              menuPlacement="bottom"
              onChange={multiSelectChangeHandler.bind(
                this,
                "category",
                "value"
              )}
              options={categoryOptions}
              optionsValueKey="value"
              optionsLabelKey="label"
            />
          </div>
          <InputContainer
            label="Price"
            type="number"
            placeholder="Price"
            name="price"
            onChange={handleChange}
            value={formData.price}
            error={formErrors?.price}
          />
        </div>
        <div className="mb-4">
          <p className="mb-2 text-[14px] font-[600]">Size</p>
          <Checkbox.Group onChange={SizeHandler} value={size}>
            <Row>
              {sizeOptions.map((item) => {
                return (
                  <Col span={24} key={item.value}>
                    <div className="flex items-center my-2">
                      <div className="w-1/5">
                        <Checkbox value={item.value}>{item.label}</Checkbox>
                      </div>
                      {size.includes(item.value) ? (
                        <div className="w-1/4 ml-8">
                          <InputContainer
                            label="Price"
                            type="number"
                            placeholder="Price"
                            onChange={(e) =>
                              SizeValueChangeHandler(item.value, e.target.value)
                            }
                            name={`${item.value}-price`}
                            value={
                              sizeValue.find(
                                (sizeItem) => sizeItem.label === item.value
                              )?.price || ""
                            }
                          />
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </Col>
                );
              })}
            </Row>
          </Checkbox.Group>
        </div>

        <div className="mb-4 text-[14px] font-[600]">
          <p className="">Toppings</p>
          <Tags setToppings={setToppings} toppings={toppings} />
        </div>

        <InputContainer
          label=" Recipe Details"
          type="textarea"
          placeholder=" Recipe Details"
          name="recipe"
          onChange={handleChange}
          value={formData.recipe}
          error={formErrors?.recipe}
          required
        />
        <div className="form-control w-full my-6">
          <input
            {...register("image")}
            type="file"
            className="file-input w-full max-w-xs"
            onChange={handleFileChange}
          />
          <InputContainer
            label=""
            type=""
            placeholder=""
            name="image"
            error={formErrors?.image}
          />
        </div>
        <button className="btn bg-green text-white px-6">
          Add Item <FaUtensils></FaUtensils>
        </button>
      </form>
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

const categoryOptions = [
  {
    label: "Pizza",
    value: "Pizza",
  },
  {
    label: "Pasta",
    value: "Pasta",
  },
  {
    label: "Burgers",
    value: "Burgers",
  },
  {
    label: "Sandwich",
    value: "Sandwich",
  },
  {
    label: "Dessert",
    value: "Dessert",
  },
  {
    label: "Popular",
    value: "Popular",
  },
];

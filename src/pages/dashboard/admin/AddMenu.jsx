import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import Swal from "sweetalert2";
import { Checkbox, Col, Row } from "antd";

import Tags from "../../../components/Tags";
import InputContainer from "../../../components/input/InputContainer";

import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

// image hosting keys
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddMenu = () => {
  const { register, handleSubmit, reset } = useForm();

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [size, setSize] = useState([]);
  const [sizeValue, setSizeValue] = useState([]);
  const [toppings, setToppings] = useState([]);
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const item = useLoaderData();

  useEffect(() => {
    if (item) {
      setSize(item.size?.map((item) => item.label));
      setSizeValue(item.size);
      setToppings(item.toppings);
      setFormData(item)
    }
  }, [item]);


  const SizeHandler = (e) => {
    setSize(e);
    if (sizeValue) {
      setSizeValue([...sizeValue.filter((item) => e.includes(item.label))]);
    }
  };

  const validate = (values, imageFile) => {
    const errors = {
      size: []
    };

    if (!values.name) {
      errors.name = "Please enter recipe name";
    }

    if (!values.category || values.category?.length === 0) {
      errors.category = "Please select category";
    }

    if ((!size || size?.length === 0) && !values.price) {
      errors.price = "Please enter price";
    }

    if (!values.recipe) {
      errors.recipe = "Please enter recipe details";
    }

    size.map((size, index) => {
      let price = sizeValue.find((sizeItem) => sizeItem.label === size)?.price || null;
      errors.size[index] = price ? "" : "Please enter price for this size";
    })

    if (!imageFile) {
      errors.image = "Please upload an image";
    }

    return errors;
  };

  // on submit form
  const onSubmit = async (data) => {
    const imageFile = data.image && data.image[0] ? data.image[0] : item?.image;
    const fieldErrors = validate(formData, imageFile);

    if (Object.keys(fieldErrors).length > 0) {
      setFormErrors(fieldErrors);
      return;
    } else {
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
          name: formData.name,
          category: formData.category,
          price: sizeValue.length === 0 ? formData.price : 0,
          recipe: formData.recipe,
          image: hostingImg?.data.data.display_url || item.image,
          size: sizeValue,
          toppings: toppings,
        };

        if (item._id) {
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
        } else {
          const menuRes = await axiosSecure.post("/menu", menuItem);
          if (menuRes.status === 200) {
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
      setFormData({ ...formData, image: "" });
    }
  };

  console.log(formErrors);
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
          className=""
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
            required={size?.length === 0}
            onChange={handleChange}
            value={formData.price}
            error={formErrors?.price}
          />
        </div>
        <div className="mb-4">
          <p className="mb-2 text-[14px] font-[600]">Size</p>
          <Checkbox.Group onChange={SizeHandler} value={size}>
            <Row>
              {sizeOptions.map((item, index) => {
                return (
                  <Col span={24} key={item.value}>
                    <div className="flex items-center my-2">
                      <div className="w-[100px]">
                        <Checkbox className="mt-[15px]" value={item.value}>{item.label}</Checkbox>
                      </div>
                      {size.includes(item.value) ? (
                        <div className="w-[200px] ml-8">
                          <InputContainer
                            label="Price"
                            type="number"
                            placeholder="Price"
                            required
                            onChange={(e) =>
                              SizeValueChangeHandler(item.value, e.target.value)
                            }
                            name={`${item.value}-price`}
                            value={
                              sizeValue.find(
                                (sizeItem) => sizeItem.label === item.value
                              )?.price || ""
                            }
                            error={formErrors?.size ? formErrors?.size[index] : "" || ""}
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
        <div className="mb-6">
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
        </div>
        <div className="form-control w-full my-6">
          <InputContainer
            label="Image"
            type=""
            name="image"
            required
          />
          {typeof formData?.image === "string" && formData?.image ? <InputContainer
            label=""
            type="image"
            placeholder=""
            name="image"
            value={{ url: formData?.image }}
            disabled={true}
          />
            : <></>}
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

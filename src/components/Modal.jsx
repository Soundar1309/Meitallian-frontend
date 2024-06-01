import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Modal = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { signUpWithGmail, login } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  // modal close button
  const [isModalOpen, setIsModalOpen] = useState(true);
  const closeModal = () => {
    setIsModalOpen(false);
    document.getElementById("my_modal_5").close();
  };

  const navigate = useNavigate();

  //react hook form
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    login(email, password)
      .then((result) => {
        // Signed in
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          console.log(res.data);
        });

        alert("Login successful!");
        navigate("/");
        console.log("Modal Open:", isModalOpen);
        closeModal();
      })
      .catch((error) => {
        setErrorMessage("Please provide valid email & password!");
      });
    reset();
  };

  // login with google
  const handleRegister = () => {
    signUpWithGmail().then((result) => {
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
      };
      axiosPublic.post("/users", userInfo).then((res) => {
        alert("Login successfully!");
        navigate("/");
        closeModal();
      });
    });
  };

  return (
    <dialog
      id="my_modal_5"
      className={`modal ${
        isModalOpen ? "modal-middle sm:modal-middle" : "hidden"
      }`}
    >
      <div className="modal-box">
        <div className="modal-action flex-col justify-center mt-0">
          <form
            className="card-body"
            method="dialog"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3 className="font-bold text-xl text-black text-center">Welcome back</h3>

            <div className="text-center space-x-3 mt-5">
              <button
                onClick={handleRegister}
                className="w-3/4 btn btn-circle bg-white text-dark hover:bg-green hover:text-white"
              >
                <FaGoogle /> Sign in with Google
              </button>
            </div>

            {/* email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                {...register("email")}
              />
            </div>

            {/* password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                {...register("password", { required: true })}
              />
              {/* <label className="label">
                <a
                  href="/404"
                  className="text-md label-text-alt link link-hover mt-2"
                >
                  Forgot password?
                </a>
              </label> */}
            </div>

            {/* show errors */}
            {errorMessage ? (
              <p className="text-red text-xs italic">
                Provide a correct username & password.
              </p>
            ) : (
              ""
            )}

            {/* submit btn */}
            <div className="form-control mt-4">
              <input
                type="submit"
                className="btn bg-green text-white"
                value="Login"
              />
            </div>

            {/* close btn */}
            <div
              htmlFor="my_modal_5"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById("my_modal_5").close()}
            >
              ✕
            </div>

            <p className="text-center my-2 text-black">
              Don't have an account?
              <Link to="/signup" className="underline text-red ml-1">
                Signup Now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;

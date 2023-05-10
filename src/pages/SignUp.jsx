import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { registerUser } from "../store/slices/userInfo.slice";
import Swal from "sweetalert2";

const SignUp = () => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submit = (data) => {
    dispatch(registerUser(data));
    reset({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phone: "",
    });
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Register successfully, please login!",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      navigate("/login");
    });
  };

  const { token } = useSelector((store) => store.userInfo);
  if (token) {
    return <Navigate to="/" />;
  } else {
    return (
      <main className="bg-gray-100 grid place-content-center px-2">
        <form
          onSubmit={handleSubmit(submit)}
          className="bg-white p-4 rounded-md max-w-[320px] grid gap-6"
        >
          <h2 className="text-2xl font-[500] text-gray-700">Sign Up</h2>
          <div className="grid gap-1">
            <label htmlFor="Email">Email</label>
            <input
              className="border-[1px] border-gray-300 p-1 outline-none"
              type="email"
              id="email"
              placeholder="Enter your email"
              {...register("email", { required: true })}
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="firstName">First Name</label>
            <input
              className="border-[1px] border-gray-300 p-1 outline-none"
              type="text"
              id="firstName"
              placeholder="Enter your first name"
              {...register("firstName", { required: true })}
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="lastName">Last Name</label>
            <input
              className="border-[1px] border-gray-300 p-1 outline-none"
              type="text"
              id="lastName"
              placeholder="Enter your last name"
              {...register("lastName", { required: true })}
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="password">Password</label>
            <input
              className="border-[1px] border-gray-300 p-1 outline-none"
              type="password"
              id="password"
              placeholder="Enter your password"
              {...register("password", { required: true })}
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="phone">Phone (10 Characters)</label>
            <input
              className="border-[1px] border-gray-300 p-1 outline-none"
              type="text"
              id="phone"
              placeholder="Enter your phone"
              {...register("phone", { required: true })}
            />
          </div>
          <button className="block w-full py-2 bg-red-500 text-white hover:bg-red-600 transition-colors">
            Sign Up
          </button>
          <span className="text-sm">
            Already have an account?{" "}
            <Link className="text-blue-400" to="/login">
              Sign in
            </Link>
          </span>
        </form>
      </main>
    );
  }
};
export default SignUp;

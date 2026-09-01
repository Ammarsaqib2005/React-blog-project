import React, { useState } from "react";
import authService from "../appwrite/auth";
import { login } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { Button, Input, Logo } from "./index";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="w-full flex items-center justify-center px-4 py-8">
      <div
        className={`mx-auto w-full max-w-lg rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10`}
      >
        <div className="mb-4 flex justify-center">
          <span className="inline-block w-full max-w-25">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          Already have an Account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-colors duration-200 hover:underline"
          >
            Login
          </Link>
        </p>
        {error && <p className="mt-6 text-center text-sm text-red-600">{error}</p>}
        <form onSubmit={handleSubmit(create)} className="mt-8">
           <div className="space-y-5">
            <Input 
            label="Full Name: "
            placeholder="Enter the full name"
            type="text"
            {...register("name", {
                required: true,
            })}
            /> 
            <Input 
            label="Email: "
            placeholder="Enter your email"
            type="email"
            {...register("email", {
                required: true,
                validate: {
                    matchPattern: (value) => /^\S+@\S+\.\S+$/.test(value) || "Email address must be valid"
                }
            })}
            />
            <Input 
            label="Password: "
            placeholder="Enter the password"
            type="password"
            {...register("password", {
                required: true,
            })}
            /> 
            <Button
            type="submit"
            className="w-full"
            >Create Account</Button>
           </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;

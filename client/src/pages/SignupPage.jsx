import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, register, setLoggedIn } from "../slice/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const navigate = useNavigate();

  const [state, setstate] = useState("Signup");

  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  

  async function handleSubmit(e) {
    e.preventDefault();
  
    try {
      let result;
  
      if (state === "Signup") {
        result = await dispatch(register({ username, email, password })).unwrap();
      } else {
        result = await dispatch(login({ email, password })).unwrap();
      }
  
      dispatch(setLoggedIn());
      toast.success(result.message);
      navigate("/dashboard");
    } catch (err) {
     
      toast.error(err.message);
    }
  }

  // useEffect(() => {
  //   if (success) {
  //     toast.success(message);
  //     navigate('/dashboard');
  //   } else  {
  //     toast.error(message);
  //   }
  // }, [status,success,message]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        {state === "Signup" ? (
          <h2 className="text-2xl font-bold text-black mb-6 text-center">
            Register
          </h2>
        ) : (
          <h2 className="text-2xl font-bold text-black mb-6 text-center">
            Login
          </h2>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {state === "Signup" && (
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-2 border rounded-md"
              onChange={(e) => setUsername(e.target.value)}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md"
            onChange={(e) => setPassword(e.target.value)}
          />
          {state === "Signup" ? (
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 rounded-md"
            >
              Sign up
            </button>
          ) : (
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 rounded-md"
            >
              Login
            </button>
          )}
        </form>
        {state === "Signup" ? (
          <p className="text-base text-center mt-4 ">
            Already have an account?{" "}
            <span
              className="text-blue-700 font-medium hover:cursor-pointer"
              onClick={() => setstate("Login")}
            >
              Login
            </span>
          </p>
        ) : (
          <p className="text-base text-center mt-4">
            Don't have an account?{" "}
            <span
              className="text-blue-700 font-medium hover:cursor-pointer"
              onClick={() => setstate("Signup")}
            >
              SignUp
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

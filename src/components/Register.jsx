import React, { useState } from "react";
import { instance } from "../main";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    instance
      .post("/register", { email, password })
      .then((res) => {
        alert(res.data.message);
        setEmail("");
        setPassword("");
        navigate("/login");
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };
  return (
    <div>
      {" "}
      <div className=" sm:w-96 mx-auto mt-20">
        <form
          onSubmit={handleSubmit}
          className=" flex justify-center items-center border flex-col p-3 mt-10 rounded-lg shadow-lg"
        >
          <h1 className=" text-center text-4xl max-w-max mx-auto">Register</h1>
          <input
            required
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="username"
            className=" w-full m-1 h-10 p-2 text-md mt-3 border rounded-lg   "
          />
          <input
            required
            type="password"
            placeholder="password"
            className=" w-full m-1 h-10 p-2 text-md mt-3 border rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className=" w-full m-1 h-10 p-2 text-md mt-3 border rounded-md bg-green-400"
          >
            Submit
          </button>
          <Link
            to={"/login"}
            className=" w-full m-1 h-10 p-2 text-md mt-3 border rounded-md bg-blue-400 text-center"
          >
            <button>Login</button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;

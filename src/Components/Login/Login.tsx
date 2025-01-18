import { useContext, useState } from "react";
import loignStyle from "./login.module.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaRegEye, FaRegEyeSlash, FaRegUser } from "react-icons/fa";
import { AuthContext } from "../../Context/AuthContext";
import { AuthContextType, LoginForm } from "../Shared/Models/User";

export default function Login() {
  let { saveUserData } = useContext(AuthContext) as AuthContextType;
  let [password, setPassword] = useState(true);
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  let navigate = useNavigate();

  let onSubmit = async (data: LoginForm) => {
    try {
      let response = await axios.post("https://dummyjson.com/auth/login", data);
      localStorage.setItem("userToken", response?.data?.accessToken);
      saveUserData();
      toast.success("Login Successfully");
      navigate("/user");
    } catch (error) {
      console.log(error);
      toast.error("Login Failed");
    }
  };

  let togglePassword = () => {
    setPassword(!password);
  };

  return (
    <>
      <div className={`contaner ${loignStyle.loginCation}`}>
        <div className="vh-100 d-flex justify-content-center align-items-center">
          <div className={loignStyle.loginContent}>
            <div className="bg-white rounded-3 p-4 shadow">
              <div className="text-center">
                <h1 className="fs-4 loginText">User Management System</h1>
                <div className="my-3">
                  <h4>Sign In</h4>
                  <p className="text-muted">
                    Enter your credentials to access your account
                  </p>
                </div>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    User Name
                  </label>
                  <div className="input-group input-group-sm">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text"
                        id="inputGroup-sizing-sm"
                      >
                        <FaRegUser />
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Your Name"
                      aria-label="Small"
                      aria-describedby="inputGroup-sizing-sm"
                      {...register("username", {
                        required: "user name is required",
                      })}
                    />
                  </div>
                  {errors.username && (
                    <span className="text-danger">
                      {errors?.username?.message}
                    </span>
                  )}
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Password
                  </label>
                  <div className="input-group input-group-sm">
                    <input
                      type={password ? "password" : "text"}
                      className="form-control"
                      aria-label="Small"
                      aria-describedby="inputGroup-sizing-sm"
                      placeholder="Enter Your Password"
                      {...register("password", {
                        required: "password is required",
                      })}
                    />
                    <div
                      onClick={togglePassword}
                      className="input-group-prepend inputCursor"
                    >
                      <span
                        className="input-group-text"
                        id="inputGroup-sizing-sm"
                      >
                        {password ? <FaRegEyeSlash /> : <FaRegEye />}
                      </span>
                    </div>
                  </div>
                  {errors.password && (
                    <span className="text-danger">
                      {errors?.password?.message}
                    </span>
                  )}
                </div>
                <button className={`btn ${loignStyle.btnLogin} w-100`}>
                  SIGN IN
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

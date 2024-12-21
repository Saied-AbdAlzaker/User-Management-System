import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface AddUserList {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  birthDate: string;
}

export default function AddUser() {
  let [userData, setUserData]: any = useState({});
  const { id } = useParams();
  let {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AddUserList>({
    defaultValues: {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      age: userData.age,
      phone: userData.phone,
      birthDate: userData.birthDate,
    },
  });
  let navigate = useNavigate();

  let onSubmit = async (data: AddUserList) => {
    try {
      if (id) {
        let response = await axios.put(
          `https://dummyjson.com/users/${id}`,
          data
        );
        toast.success("Update User Successfully");
        navigate("/user/userList");
        // console.log(response);
        console.log(id);
      } else {
        let response = await axios.post(
          `https://dummyjson.com/users/add`,
          data
        );
        toast.success("Add User Successfully");
        navigate("/user/userList");
        // console.log(response);
      }
    } catch (error) {
      toast.error("Error!");
    }
  };

  let getUserById = async () => {
    let rseponse = await axios.get(`https://dummyjson.com/users/${id}`);
    setUserData(rseponse.data);
  };

  useEffect(() => {
    setValue("firstName", userData.firstName);
    setValue("lastName", userData.lastName);
    setValue("email", userData.email);
    setValue("age", userData.age);
    setValue("phone", userData.phone);
    setValue("birthDate", userData.birthDate);
  }, [userData, setValue]);

  useEffect(() => {
    getUserById();
  }, []);

  return (
    <>
      <h3 className="fw-bold ">{id ? "Update User" : "Add User"}</h3>
      <hr />
      <div className="bg-white shadow p-5 m-2 rounded-5 w-75 mx-auto mt-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="exampleFormControlInput1">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  aria-describedby="textHelp"
                  placeholder="Enter Your First Name"
                  {...register("firstName", {
                    required: "First Name Is Required",
                  })}
                />
                {errors.firstName && (
                  <span className="text-danger">
                    {errors?.firstName?.message}
                  </span>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="exampleFormControlInput2">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput2"
                  aria-describedby="textHelp"
                  placeholder="Enter Your Last Name"
                  {...register("lastName", {
                    required: "Last Name Is Required",
                  })}
                />
                {errors.lastName && (
                  <span className="text-danger">
                    {errors?.lastName?.message}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="row my-4">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Your Email"
                  {...register("email", {
                    required: "Email Is Required",
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: "Email Is Invalid",
                    },
                  })}
                />
                {errors.email && (
                  <span className="text-danger">{errors?.email?.message}</span>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="exampleFormControlInput3">Age</label>
                <input
                  type="number"
                  className="form-control"
                  id="exampleFormControlInput3"
                  aria-describedby="numberHelp"
                  placeholder="Enter Your Age"
                  {...register("age", {
                    required: "Age Is Required",
                    min: {
                      value: 20,
                      message: "The age must be greater than 20",
                    },
                    max: {
                      value: 50,
                      message: "The age must be less than 50",
                    },
                  })}
                />
                {errors.age && (
                  <span className="text-danger">{errors?.age?.message}</span>
                )}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="exampleFormControlInput4">Phone Number</label>
                <input
                  type="phone"
                  className="form-control"
                  id="exampleFormControlInput4"
                  aria-describedby="phoneHelp"
                  placeholder="Enter Your Phone Number"
                  {...register("phone", {
                    required: "Phone Is Required",
                    pattern: {
                      value: /^01[01245][0-9]{8}$/,
                      message: "Phone Is Invalid",
                    },
                  })}
                />
                {errors.phone && (
                  <span className="text-danger">{errors?.phone?.message}</span>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="exampleFormControlInput5">birth Date</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput5"
                  aria-describedby="dateHelp"
                  placeholder="ex: 1982-11-6"
                  {...register("birthDate", {
                    required: "Birth Date Is Required",
                  })}
                />
                {errors.birthDate && (
                  <span className="text-danger">
                    {errors?.birthDate?.message}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="text-center mt-3">
            <button className="btn btnColor w-50">
              {id ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

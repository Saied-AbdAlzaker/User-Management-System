import { useNavigate } from "react-router-dom";
import homeImg from "../../assets/images/profile.png";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  let navigate = useNavigate();
  let [users, setUsers] = useState<any[]>([]);

  let navigateToUsers = () => {
    navigate("/user/userList");
  };

  let getPosts = async () => {
    try {
      let response = await axios.get(`https://dummyjson.com/posts`);
      setUsers(response?.data?.posts);
      console.log(response?.data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <div className="h-100">
        <div className="row rounded-5 shadow-sm bgMain m-3 ">
          <div className="col-md-8 p-5">
            <h3 className="my-3">
              Welcome <span className="bgText">UMS</span>
            </h3>
            <p>
              This is a welcoming screen for the entry of the application , you
              can now see the options
            </p>
            <button className="btn btnColor" onClick={navigateToUsers}>
              Get All Users
              <ArrowRightAltIcon />
            </button>
          </div>
          <div className="col-md-4 text-center p-5">
            <img src={homeImg} alt="homeImg" className="rounded-circle w-75" />
          </div>
        </div>
        <div className="row g-3 mb-4">
          {users.slice(0, 10).map((user) => {
            return (
              <div className="col-md-4">
                <div className="card" style={{ backgroundColor: "#f8f8f8" }}>
                  <div className="card-body">
                    <h5 className="card-title">{user.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {user.userId}
                    </h6>
                    <div>
                      <span>
                        likes:
                        <a href="#" className="card-link mx-2">
                          {user.reactions.likes}
                        </a>
                      </span>
                      <span className="mx-2">
                        dislikes:
                        <a href="#" className="card-link mx-2">
                          {user.reactions.dislikes}
                        </a>
                      </span>
                    </div>

                    <span className="mx-2">
                      {" "}
                      Tags:
                      <a href="#" className="card-link mx-2">
                        {user.tags[0]}
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

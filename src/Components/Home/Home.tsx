import { useNavigate } from "react-router-dom";
import homeImg from "../../assets/images/profile.png";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

export default function Home() {
  let navigate = useNavigate();
  let navigateToUsers = () => {
    navigate("/user/userList");
  };
  
  return (
    <>
      <div className="row rounded-5 shadow-sm bgMain m-3">
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
    </>
  );
}

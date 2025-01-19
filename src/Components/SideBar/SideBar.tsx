import { useContext, useState } from "react";
import sidebarStyle from "./sideBar.module.css";
import { AiOutlineUserAdd } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import {
  FaHome,
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";
import { TbUsersGroup } from "react-icons/tb";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import profile from "../../assets/images/profile.png";
import { AuthContext } from "../../Context/AuthContext";
import { AuthContextTypeUser } from "../Shared/Models/User";

export default function SideBar() {
  let [collapsed, setCollapsed] = useState(false);

  let toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  let { userData } = useContext(AuthContext) as AuthContextTypeUser;
 
  return (
    <>
      <Sidebar
        collapsed={collapsed}
        className={`h-100 ${sidebarStyle.sideBg}`}
      >
        {collapsed ? (
          <>
            <div className="d-flex flex-column align-items-center">
              <p className="ms-3 mt-2 loginText ps-1">UMS</p>
              <FaRegArrowAltCircleRight
                size={25}
                onClick={toggleSidebar}
                className="mb-2 inputCursor"
              />
            </div>
            <div className="text-center">
              {userData?.image ? (
                <img
                  src={userData?.image}
                  alt={userData?.username}
                  className="rounded-circle w-50"
                />
              ) : (
                <img
                  src={profile}
                  alt="profile"
                  className="rounded-circle w-50"
                />
              )}
              <h6>
                {userData?.firstName} {userData?.lastName}
              </h6>
              <p className="bgText">Admin</p>
            </div>
          </>
        ) : (
          <>
            <div className="d-flex justify-content-between">
              <p className="ms-3 mt-2 loginText p-1">UMS</p>
              <FaRegArrowAltCircleLeft
                size={25}
                onClick={toggleSidebar}
                className="me-1 mt-3 inputCursor"
              />
            </div>
            <div className="text-center">
              {userData?.image ? (
                <img
                  src={userData?.image}
                  alt={userData?.username}
                  className="rounded-circle w-50"
                />
              ) : (
                <img
                  src={profile}
                  alt="profile"
                  className="rounded-circle w-50"
                />
              )}
              <h5>
                {userData?.firstName} {userData?.lastName}
              </h5>
              <h4 className="bgText">{userData?.role}</h4>
            </div>
          </>
        )}
        <Menu>
          <MenuItem
            icon={<FaHome />}
            component={<Link to="/user" title="Home" />}
          >
            Home
          </MenuItem>
          <MenuItem
            icon={<TbUsersGroup />}
            component={<Link to="/user/userList" title="Users" />}
          >
            Users
          </MenuItem>
          <MenuItem
            icon={<AiOutlineUserAdd />}
            component={<Link to="/user/userData" title="Add User" />}
          >
            Add User
          </MenuItem>
          <MenuItem
            icon={<CgProfile />}
            component={<Link to={`/user/profile`} title="Profile" />}
          >
            Profile
          </MenuItem>
        </Menu>
      </Sidebar>
    </>
  );
}

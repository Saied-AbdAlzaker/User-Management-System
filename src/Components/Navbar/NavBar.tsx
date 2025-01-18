import { useContext } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { AuthContext } from "../../Context/AuthContext";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";

export default function NavBar() {
  let { userData }: any = useContext(AuthContext);
  let navigate = useNavigate();
  let logOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body px-3">
        <Container>
          <Navbar.Brand>
            <FaUsers size={40} className="bgText inputCursor" />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Avatar alt="Remy Sharp" src={userData?.image} />
              <Nav.Link>
                Welcome <span className="bgText">{userData?.firstName}</span>
              </Nav.Link>

              <button className="btn btnColor" onClick={logOut}>
                <IoLogOutOutline size={20} /> logout
              </button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

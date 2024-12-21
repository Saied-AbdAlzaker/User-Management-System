import { useContext } from "react";
import { CiSearch } from "react-icons/ci";
import { IoLogOutOutline } from "react-icons/io5";
import { AuthContext } from "../Context/AuthContext";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  let { userData }: any = useContext(AuthContext);
  let navigate = useNavigate();
  let logOut = () => {
    localStorage.clear();
    navigate("/login");
  };
  
  return (
    <>
      <Navbar expand="lg" className="bg-body">
        <Container>
          <Navbar.Brand>
            <FaUsers size={40} className="bgText inputCursor" />
          </Navbar.Brand>
          <div className="input-group input-group-sm w-50">
            <input
              type="text"
              className="form-control"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              placeholder="Search..."
            />
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                <CiSearch size={20} />
              </span>
            </div>
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link>
                Welcome <span className="bgText">{userData?.firstName}</span>
              </Nav.Link>
              <Nav.Link className="bgColor" onClick={logOut}>
                <IoLogOutOutline size={20} /> logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

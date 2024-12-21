import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete, MdOutlineDeleteSweep } from "react-icons/md";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

interface UserList {
  id: number;
  image: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  address: Address;
  role: string;
}
interface Address {
  country: string;
}

export default function Users() {
  // Loading
  let [loading, setLoading] = useState(false);
  let [users, setUsers] = useState<UserList[]>([]);
  let getUsers = async () => {
    try {
      setLoading(true);
      let response = await axios.get("https://dummyjson.com/users");
      setUsers(response?.data?.users);
      setLoading(false);
    } catch (error) {
      toast.error("Api Failed Fetch");
      setLoading(false);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  // Delete User
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  let [userId, setUserId] = useState<number | null>(null);
  let [userData, setUserData] = useState<any>({});
  const handleShow = (user: UserList) => {
    setShow(true);
    setUserId(user.id);
    setUserData(user);
  };

  let deleteUser = async () => {
    try {
      let response = await axios.delete(
        `https://dummyjson.com/users/${userId}`
      );
      console.log(response);
      handleClose();
      toast.success("Deleted Successfully");
    } catch (error) {
      toast.error("Not Deleted");
    }
  };

  // Add User
  let navigate = useNavigate();
  let navigateToAddUser = () => {
    navigate("/user/addUser");
  };
  // Update User
  let navigateToUpdateUser = (userId: number) => {
    navigate(`/user/addUser/${userId}`);
  };

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center">
          <Loader />
        </div>
      ) : (
        <div className="bgMain">
          <div className="d-flex justify-content-between align-items-center p-2">
            <h5 className="fw-bold">Users List</h5>
            <button className="btn btnColor" onClick={navigateToAddUser}>
              Ad New User
            </button>
          </div>
          <hr />
          <Table striped hover>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Country</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: UserList) => (
                <tr key={user.id}>
                  <td>
                    <img
                      src={user.image}
                      alt={user.username}
                      className="w-50 rounded-5"
                    />
                  </td>
                  <td>
                    {user.firstName} {user.lastName}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.address.country}</td>
                  <td>{user.role}</td>
                  <td>
                    <FaRegEdit
                      className="bgText inputCursor me-2"
                      onClick={() => navigateToUpdateUser(user.id)}
                      size={20}
                    />
                    <MdOutlineDelete
                      onClick={() => handleShow(user)}
                      className="bgText inputCursor"
                      size={20}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <MdOutlineDeleteSweep size={50} className="text-danger" />
              <Modal.Title>Confirm Delete {userData.firstName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete {userData.firstName}
              {userData.lastName}!
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleClose}>
                Close
              </Button>
              <Button variant="success" onClick={deleteUser}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </>
  );
}

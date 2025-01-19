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
import profile from "../../assets/images/profile.png";
import { UserList } from "../Shared/Models/User";
import {
  Paper,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React from "react";
import { CiSearch } from "react-icons/ci";

export default function Users() {
  // Loading
  let [loading, setLoading] = useState(false);
  let [users, setUsers] = useState<UserList[]>([]);
  // Search
  let [inputSearch, setInputSearch] = useState(users);
  let getUsers = async () => {
    try {
      setLoading(true);
      let response = await axios.get("https://dummyjson.com/users");
      setUsers(response?.data?.users);
      setInputSearch(response?.data?.users);
      console.log(response?.data?.users);
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
    navigate("/user/userData");
  };
  // Update User
  let navigateToUpdateUser = (userId: number) => {
    navigate(`/user/userData/${userId}`);
  };

  // Pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Search
  let handleChange = (event: any) => {
    setInputSearch(
      users.filter((user) =>
        user.username.toLowerCase().includes(event?.target.value)
      )
    );
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
            <div className="input-group input-group-sm w-50">
              <input
                onChange={handleChange}
                type="text"
                className="form-control bgInput"
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
            <button className="btn btnColor" onClick={navigateToAddUser}>
              Ad New User
            </button>
          </div>
          <hr />
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer>
              <Table striped aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <th>#</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Country</th>
                    <th>Role</th>
                    <th>Action</th>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {inputSearch
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user, index) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={index}
                        >
                          <td>{user.id}</td>
                          <td>
                            {user.image ? (
                              <img
                                src={user.image}
                                alt={user.username}
                                className="w-50 rounded-5"
                              />
                            ) : (
                              <img
                                src={profile}
                                alt="profile"
                                className="w-50 rounded-5 "
                              />
                            )}
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
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15, 20, 100]}
              component="div"
              count={users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>

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

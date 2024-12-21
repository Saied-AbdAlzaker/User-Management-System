import profile from "../../assets/images/profile.png";

export default function Profile() {
  // https://dummyjson.com/user/me
  return (
    <>
      <div className="bg-white shadow p-3 m-3 rounded-5 w-75 mx-auto mt-5 p-5 position-relative">
        <form>
          <img
            src={profile}
            alt="profile"
            className="rounded-circle imgProfile"
          />
          <hr />
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
                />
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
                />
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
                />
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
                />
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
                />
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
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

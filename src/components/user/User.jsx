import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAdmin, editAdmin } from "../../action";
import "./user.css";
import UserForm from "../UserForm/UserForm";

function User(props) {
  useEffect(() => {
    // props.fetchAdmin(props.match.params.id);
    props.fetchAdmin(props.idss);
  }, []);

  const handleSubmit = (formValues) => {
    // props.editAdmin(props.admin._id, formValues);
    // props.fetchAdmin(props.match.params.id);
    props.editAdmin(props.idss, formValues);
    props.fetchAdmin(props.idss);
  };

  if (!props.admin) {
    return <div className="others">Loading...</div>;
  }

  return (
    <>
      <div className="user">
        <div className="userTitleContainer">
          <h1 className="userTitle">Edit User</h1>
          <Link to="/admins/newAdmin">
            <button className="userAddButton">Create</button>
          </Link>
        </div>
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <img
                src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
                className="userShowImg"
              />
              <div className="userShowTopTitle">
                <span className="userShowUsername">{props.admin.fullName}</span>
                <span className="userShowUserTitle">Software Engineer</span>
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Account Details</span>
              <div className="userShowInfo">
                <CalendarToday className="userShowIcon" />
                <span className="userShowInfoTitle">
                  {new Date(props.admin.dateCreated).toLocaleDateString()}
                </span>
              </div>
              <span className="userShowTitle">Contact Details</span>
              <div className="userShowInfo">
                <PhoneAndroid className="userShowIcon" />
                <span className="userShowInfoTitle">
                  {props.admin.phoneNumber}
                </span>
              </div>
              <div className="userShowInfo">
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">{props.admin.email}</span>
              </div>
            </div>
          </div>
          <div className="userUpdate">
            <span className="userUpdateTitle">Edit</span>
            <UserForm handleSubmit={handleSubmit} admin={props.admin} />
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    // admin: state.admins[ownProps.match.params.id],
    admin: state.admins[ownProps.idss],
  };
};

export default connect(mapStateToProps, { fetchAdmin, editAdmin })(User);

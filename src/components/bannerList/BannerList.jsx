import React from "react";
import { useEffect, useState } from "react";
import "./bannerList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../modal/Modal";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
import store from "../../myStore";

function BannerList() {
  const navigate = useNavigate();
  const [props, setProps] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:2020/banner/posts/show")
      .then((res) => {
        const postsWithSequentialId = res.data?.posts.map((post, index) => ({
          ...post,
          id: index + 1,
        }));

        setProps(postsWithSequentialId);
        // setProps(res.data?.posts);
        // console.log(res.data?.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [showModal, setShowModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "title", headerName: "Title", width: 200 },
    {
      field: "image",
      headerName: "Image",
      width: 170,
      renderCell: (params) => (
        <img width="40%" src={params.row.image.url} alt="" />
      ),
    },
    {
      field: "postedBy",
      headerName: "Posted By",
      width: 170,
      valueGetter: (data) => {
        console.log("props:", data);
        return data.row.postedBy.fullName;
      },
    },
    {
      field: "createdAt",
      headerName: "Create At",
      width: 150,
      renderCell: (params) =>
        moment(params.row.createdAt).format("DD-MM-YYYY HH:MM:SS"),
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/banners/post/edit/" + params.row._id}>
              <button className="UserListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="UserListDelete"
              onClick={(e) => deletePostById(e, params.row._id)}
            />
          </>
        );
      },
    },
  ];

  //delete post by Id
  const deletePostById = async (e, id) => {
    // console.log(id)
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const { data } = await axios.delete(`/banner/delete/post/${id}`, {
          headers: {
            authorization: "Bearer " + store.getState().auth.accessToken,
          },
        });
        if (data.success === true) {
          toast.success(data.message);
          setProps((prevProps) => {
            const updatedPosts = prevProps.filter((post) => post._id !== id);
            return updatedPosts;
          });
        }
      } catch (error) {
        console.log(error);
        toast.error(error);
      }
    }
  };

  const handleDelete = async (e, id) => {
    try {
      const { data } = await axios.delete(`/banner/delete/post/${id}`, {
        headers: {
          authorization: "Bearer " + store.getState().auth.accessToken,
        },
      });
      if (data.success === true) {
        navigate("/banners");
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
    setShowModal(false);
  };

  const actions = (
    <>
      <button onClick={() => handleDelete()} className="ui negative button">
        Confirm
      </button>
      <button onClick={() => setShowModal(false)} className="ui button">
        Back
      </button>
    </>
  );

  return (
    <>
      {props ? (
        <div className="userList">
          <div className="userListTitleContainer">
            <h1 className="userListTitle">Banners</h1>
            <Link to="/banners/newBanner">
              <button className="userAddButton">Create</button>
            </Link>
          </div>
          <DataGrid
            getRowId={(row) => row._id}
            rows={props}
            disableSelectionOnClick
            columns={columns}
            pageSize={8}
            checkboxSelection
          />
          {showModal ? (
            <Modal
              redirect="/banners"
              actions={actions}
              header="Warning"
              content={`Do you want to delete this post??`}
            />
          ) : null}
        </div>
      ) : (
        <p>Loading.....</p>
      )}
    </>
  );
}

export default BannerList;

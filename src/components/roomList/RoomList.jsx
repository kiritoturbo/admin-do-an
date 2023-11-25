import React from "react";
import "./RoomList.css";
import { DataGrid } from "@mui/x-data-grid";
import { fetchRooms, deleteRoom } from "../../action";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { MdOutlineDelete } from "react-icons/md";

import Notification from "../notification/Notification";
import Modal from "../modal/Modal";

function RoomList(props) {
  const [selectedAirliner, setSelectedAirliner] = useState(null);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    props.fetchRooms();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", width: 150 },
    { field: "desc", headerName: "Desc", width: 150 },
    {
      field: "price",
      headerName: "Price",
      width: 100,
    },
    {
      field: "maxPeople",
      headerName: "Max People",
      width: 100,
      // valueFormatter: ({ value }) =>
      //   value[0]?.amount + value[1]?.amount + value[2]?.amount,
    },
    {
      field: "roomNumbers",
      headerName: "Room Numbers",
      width: 100,
    },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        console.log({ params });
        return (
          <>
            <Link to={"/hotels/" + params.row._id}>
              <button className="AirlinerListEdit">Edit</button>
            </Link>
            <MdOutlineDelete
              className="AirlinerListDelete"
              onClick={() => onDeleteAirliner(params.row)}
            />
          </>
        );
      },
    },
  ];

  // const onDeleteAirliner = (room) => {
  //   setSelectedAirliner(room);
  //   setShowModal(true);
  // };

  // const handleDelete = () => {
  //   console.log(props);
  //   props.deleteRoom(selectedAirliner._id);
  //   setShowModal(false);
  // };
  const onDeleteAirliner = (roomId, hotelId) => {
    setSelectedAirliner(roomId);
    setShowModal(true);
  };

  const handleDelete = () => {
    console.log(props);
    props.deleteRoom(selectedAirliner._id, selectedAirliner.hotelId);
    setShowModal(false);
  };

  const getRowId = (row) => row._id;

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

  if (!props.rooms) return <div>Loading...</div>;
  return (
    <>
      <div className="airlinerList ">
        <div className="airlinerTitleContainer">
          <h1 className="airlinerTitle">Rooms</h1>
          <Link to="/rooms/newRoom">
            <button className="airlinerAddButton">Create</button>
          </Link>
        </div>
        <DataGrid
          className="overflow-auto"
          rows={props.rooms}
          disableSelectionOnClick
          columns={columns}
          pageSize={9}
          checkboxSelection
          getRowId={getRowId}
        />
      </div>
      {showModal ? (
        <Modal
          redirect="/rooms"
          actions={actions}
          header="Warning"
          content={`Do you want to delete ${
            selectedAirliner.title + " " + selectedAirliner.desc
          } ?`}
        />
      ) : null}
      <Notification notify={props.alert} />
    </>
  );
}

const mapStateToProps = (state) => {
  const hotels = Object.values(state.hotels);
  const rooms = Object.values(state.rooms);
  rooms.forEach((hotel, index) => {
    hotel.id = index + 1;
  });
  return {
    hotels: hotels,
    rooms: rooms,
    alert: state.alert,
  };
};

export default connect(mapStateToProps, { fetchRooms, deleteRoom })(RoomList);

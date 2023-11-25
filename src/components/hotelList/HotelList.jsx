import React from "react";
import "./HotelList.css";
// import { DataGrid } from '@mui/material/data-grid';
import { DataGrid } from "@mui/x-data-grid";

import { fetchHotels, deleteHotel } from "../../action";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import { DeleteOutline } from "@mui/material/icons";
import { MdOutlineDelete } from "react-icons/md";

import Notification from "../notification/Notification";
import Modal from "../modal/Modal";

function HotelList(props) {
  const [selectedAirliner, setSelectedAirliner] = useState(null);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    props.fetchHotels();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "type", headerName: "Type", width: 150 },
    {
      field: "city",
      headerName: "City",
      width: 100,
    },
    {
      field: "address",
      headerName: "Address",
      width: 100,
      // valueFormatter: ({ value }) =>
      //   value[0]?.amount + value[1]?.amount + value[2]?.amount,
    },
    {
      field: "distance",
      headerName: "Distance",
      width: 100,
    },
    {
      field: "desc",
      headerName: "Desc",
      width: 100,
    },
    {
      field: "rating",
      headerName: "Rating",
      width: 50,
    },
    {
      field: "cheapestPrice",
      headerName: "Cheapest Price",
      width: 100,
    },
    {
      field: "featured",
      headerName: "Featured",
      width: 50,
    },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
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

  const onDeleteAirliner = (hotel) => {
    setSelectedAirliner(hotel);
    setShowModal(true);
  };

  const handleDelete = () => {
    props.deleteHotel(selectedAirliner._id);
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

  if (!props.hotels) return <div>Loading...</div>;
  return (
    <>
      <div className="airlinerList ">
        <div className="airlinerTitleContainer">
          <h1 className="airlinerTitle">Hotels</h1>
          <Link to="/hotels/newHotel">
            <button className="airlinerAddButton">Create</button>
          </Link>
        </div>
        <DataGrid
          className="overflow-auto"
          rows={props.hotels}
          disableSelectionOnClick
          columns={columns}
          pageSize={9}
          checkboxSelection
          getRowId={getRowId}
        />
      </div>
      {showModal ? (
        <Modal
          redirect="/airliners"
          actions={actions}
          header="Warning"
          content={`Do you want to delete ${
            selectedAirliner.name + " " + selectedAirliner.type
          } ?`}
        />
      ) : null}
      <Notification notify={props.alert} />
    </>
  );
}

const mapStateToProps = (state) => {
  const hotels = Object.values(state.hotels);
  hotels.forEach((hotel, index) => {
    hotel.id = index + 1;
    // if (hotel.dateOfCommissioning) {
    //   let d = new Date(hotel.dateOfCommissioning);
    //   let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
    //   let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
    //   let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
    //   hotel.dateOfCommissioning = `${ye}-${mo}-${da}`;
    // }
  });
  return {
    hotels: hotels,
    alert: state.alert,
  };
};

export default connect(mapStateToProps, { fetchHotels, deleteHotel })(
  HotelList
);

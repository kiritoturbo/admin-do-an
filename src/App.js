import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
  useNavigate,
  useLocation,
  useParams,
} from "react-router-dom";
import history from "./history";
import "./App.css";
import TopBar from "./components/topbar/TopBar";
import SideBar from "./components/sidebar/SideBar";
import Home from "./components/pages/Home.jsx";
import store from "./myStore";
import UserList from "./components/userList/UserList";
import User from "./components/user/User";
import NewUser from "./components/newUser/NewUser";
import ListFlights from "./components/listFlights/ListFlights";
import AirlinerList from "./components/airlinerList/AirlinerList";
import AirportList from "./components/airportList/AirportList";
import NewFlight from "./components/newFlight/NewFlight";
import NewAirport from "./components/newAirport/NewAirport";
import NewAirliner from "./components/newAirliner/NewAirliner";
import EditFlight from "./components/editFlight/EditFlight";
import EditAirport from "./components/editAirport/EditAirport";
import EditAirliner from "./components/editAirliner/EditAirliner";
import Login from "./components/pages/Login";
import PrivateRoute from "./PrivateRoute.js";
import HotelList from "./components/hotelList/HotelList.jsx";
import NewHotel from "./components/newHotel/NewHotel.jsx";
import RoomList from "./components/roomList/RoomList.jsx";
import NewRoom from "./components/newRoom/NewRoom.jsx";
import BannerList from "./components/bannerList/BannerList.jsx";
import NewBanner from "./components/newBanner/NewBanner.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditHotel from "./components/editHotel/EditHotel.jsx";
import EditBanner from "./components/editBanner/EditBanner.jsx";
function App() {
  // const params = useParams();
  return (
    <div>
      <ToastContainer />
      <Router history={history}>
        <Fragment>
          <TopBar />
          <div className="container">
            <SideBar />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<PrivateRoute Component={Home} />} />
              <Route
                path="/flights/newFlight"
                element={<PrivateRoute Component={NewFlight} />}
              />

              <Route
                path="/hotel"
                element={<PrivateRoute Component={HotelList} />}
              />
              <Route
                path="/room"
                element={<PrivateRoute Component={RoomList} />}
              />
              <Route
                path="/airports"
                element={<PrivateRoute Component={AirportList} />}
              />
              <Route
                path="/airports/newAirport"
                element={<PrivateRoute Component={NewAirport} />}
              />
              <Route
                path="/rooms/newRoom"
                element={<PrivateRoute Component={NewRoom} />}
              />
              <Route
                path="/hotels/newHotel"
                element={<PrivateRoute Component={NewHotel} />}
              />
              <Route
                path="/airliners/newAirliner"
                element={<PrivateRoute Component={NewAirliner} />}
              />
              <Route
                path="/admins/newAdmin"
                element={<PrivateRoute Component={NewUser} />}
              />
              <Route
                path="/banners/newBanner"
                element={<PrivateRoute Component={NewBanner} />}
              />
              <Route
                path="/admins"
                element={<PrivateRoute Component={UserList} />}
              />
              <Route
                path="/banners"
                element={<PrivateRoute Component={BannerList} />}
              />
              <Route
                path="/flights"
                element={<PrivateRoute Component={ListFlights} />}
              />
              <Route
                path="/airliners"
                element={<PrivateRoute Component={AirlinerList} />}
              />

              <Route
                path="/airports/:id"
                element={<PrivateRoute Component={EditAirport} />}
              />

              <Route
                path="/airports/:id"
                element={<PrivateRoute Component={EditAirport} />}
              />
              <Route
                path="/banners/post/edit/:id"
                element={<PrivateRoute Component={EditBanner} />}
              />

              <Route
                path="/flights/:id"
                element={<PrivateRoute Component={EditFlight} />}
              />
              <Route
                path="/airliners/:id"
                element={<PrivateRoute Component={EditAirliner} />}
              />
              <Route
                path="/hotels/:id"
                element={<PrivateRoute Component={EditHotel} />}
              />

              <Route
                path="/admins/:id"
                element={<PrivateRoute Component={User} />}
              />
            </Routes>
          </div>
        </Fragment>
      </Router>
    </div>
  );
}

export default App;

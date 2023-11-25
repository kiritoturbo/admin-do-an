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
import EditHotel from "./components/editHotel/EditHotel.jsx";
import RoomList from "./components/roomList/RoomList.jsx";
import NewRoom from "./components/newRoom/NewRoom.jsx";

// import history from "./history";

// const CustomPrivateRoute = ({ element: Element, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       element={
//         store.getState().auth.isSignedIn ? (
//           <Element />
//         ) : (
//           <Navigate to="/login" />
//         )
//       }
//     />
//   );
// };
// const CustomPrivateRoute = ({ element: Element, ...rest }) => {
//   const isSignedIn = store.getState().auth.isSignedIn;
//   console.log("isSignedIn", isSignedIn);

//   return (
//     <Route
//       {...rest}
//       element={isSignedIn ? <Element /> : <Navigate to="/login" />}
//     />
//   );
// };
// const Private = ({ Component }) => {
//   const isSignedIn = store.getState().auth.isSignedIn;
//   console.log(isSignedIn);
//   return (
//     <>
//       isSignedIn ? <Element /> : <Navigate to="/login" />
//     </>
//   );
//   // return auth ? <Component /> : <Navigate to="/login" />;
// };

// // App.js
// // App.js
// function UserRoutes() {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <PrivateRoute path="admins" element={<UserList />} />
//       <PrivateRoute path="flights/newFlight" element={<NewFlight />} />
//       <PrivateRoute path="airports" element={<AirportList />} />
//       <PrivateRoute path="airports/newAirport" element={<NewAirport />} />
//       <PrivateRoute path="airliners/newAirliner" element={<NewAirliner />} />
//       <PrivateRoute path="admins/newAdmin" element={<NewUser />} />
//     </Routes>
//   );
// }

// const Private = ({ Component }) => {
//   const isSignedIn = store.getState().auth.isSignedIn;
//   console.log(isSignedIn);
//   return isSignedIn ? <Component /> : <Navigate to="/login" />;
// };
// const privateroute = () => {
//   const isSignedIn = store.getState().auth.isSignedIn;

//   // if authorized, return an outlet that will render child elements
//   // if not, return element that will navigate to login page
//   return isSignedIn ? <Outlet /> : <Navigate to="/login" />;
// };

// // UserRoutes.js
// function UserRoutes() {
//   return (
//     <Outlet>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="admins" element={<PrivateRoute Component={UserList} />} />
//         <Route
//           path="flights/newFlight"
//           element={<PrivateRoute Component={NewFlight} />}
//         />

//         {/* <Route path="airports" element={<Private Component={AirportList} />} /> */}
//         <Route
//           path="airports/newAirport"
//           element={<PrivateRoute Component={NewAirport} />}
//         />
//         <Route
//           path="airliners/newAirliner"
//           element={<PrivateRoute Component={NewAirliner} />}
//         />
//         <Route
//           path="admins/newAdmin"
//           element={<PrivateRoute Component={NewUser} />}
//         />
//       </Routes>
//     </Outlet>
//   );
// }

function App() {
  // const params = useParams();
  return (
    <div>
      <Router history={history}>
        <Fragment>
          <TopBar />
          <div className="container">
            <SideBar />
            {/* <Routes>
              <Route path="/login" element={<Login />} />

              <Route exact path="/" element={<PrivateRoute />}>
                <Route exact path="flights/newFlight" element={<NewFlight />} />
              </Route>
              <Route exact path="/" element={<PrivateRoute />}>
                <Route exact path="airports" element={<AirportList />} />
              </Route>
              <Route exact path="/" element={<PrivateRoute />}>
                <Route
                  exact
                  path="airports/newAirport"
                  element={<NewAirport />}
                />
              </Route>
              <Route exact path="/" element={<PrivateRoute />}>
                <Route
                  exact
                  path="airliners/newAirliner"
                  element={<NewAirliner />}
                />
              </Route>
              <Route exact path="/" element={<PrivateRoute />}>
                <Route exact path="admins/newAdmin" element={<NewUser />} />
              </Route>
              <Route exact path="/" element={<PrivateRoute />}>
                <Route exact path="homes" element={<Home />} />
              </Route>
              <Route exact path="/" element={<PrivateRoute />}>
                <Route exact path="admins" element={<UserList />} />
              </Route>
              <Route exact path="/" element={<PrivateRoute />}>
                <Route exact path="flights" element={<ListFlights />} />
              </Route>
              <Route exact path="/" element={<PrivateRoute />}>
                <Route exact path="airliners" element={<AirlinerList />} />
              </Route>
              <Route exact path="/" element={<PrivateRoute />}>
                <Route
                  exact
                  path="airports/:id"
                  element={<EditAirport airportId={params.id} />}
                />
              </Route>
              <Route exact path="/" element={<PrivateRoute />}>
                <Route exact path="flights/:id" element={<EditFlight />} />
              </Route>
              <Route exact path="/" element={<PrivateRoute />}>
                <Route exact path="airliners/:id" element={<EditAirliner />} />
              </Route>
              <Route exact path="/" element={<PrivateRoute />}>
                <Route exact path="admins/:id" element={<User />} />
              </Route>

              <Route index element={<Navigate to="/login" />} />
            </Routes> */}
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
                path="/admins"
                element={<PrivateRoute Component={UserList} />}
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
            {/* <Route
                path="/airports/:id"
                element={<PrivateRoute Component={EditAirport} />}
              /> */}
          </div>
        </Fragment>
      </Router>
    </div>
  );
}

export default App;

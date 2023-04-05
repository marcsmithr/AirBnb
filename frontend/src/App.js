import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import SpotList from "./components/SpotList";
import { getSpots } from "./store/spotReducer";
import CreateSpot from "./components/CreateSpot";
import SpotDetails from "./components/SpotDetails";
import EditSpot from "./components/EditSpot";
import CreateReview from "./components/CreateReview";
import AllUserBookings from "./components/Bookings/AllUserBookings";
import SingleBooking from "./components/Bookings/SingleUserBooking";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(getSpots())
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/" exact>
              <SpotList />
          </Route>
          <Route path="/create" exact>
              <CreateSpot/>
          </Route>
          <Route path="/:userId/trips" exact>
              <AllUserBookings/>
          </Route>
          <Route path="/:userId/trips/:bookingId" exact>
              <SingleBooking/>
          </Route>
          <Route path="/spots/:spotId" exact>
              <SpotDetails/>
          </Route>
          <Route path="/spots/:spotId/edit" exact>
              <EditSpot/>
          </Route>
          <Route path="/spots/:spotId/review" >
              <CreateReview/>
          </Route>
        </Switch>
      )}
      <Footer/>
    </>
  );
}

export default App;

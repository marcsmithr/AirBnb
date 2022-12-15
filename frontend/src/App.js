import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotList from "./components/SpotList";
import { getSpots } from "./store/spotReducer";
import CreateSpot from "./components/CreateSpot";
import SpotDetails from "./components/SpotDetails";
import EditSpot from "./components/EditSpot";


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
          <Route path="/spots/:spotId" exact>
              <SpotDetails/>
          </Route>
          <Route path="/spots/:spotId/edit" exact>
              <EditSpot/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;

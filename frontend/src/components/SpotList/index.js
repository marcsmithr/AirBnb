import { useDispatch, useSelector } from "react-redux"
import { getSpots } from "../../store/spotReducer";
import { useEffect } from "react";
import SpotCard from "../SpotCard";
import './SpotList.css'

const SpotList = () => {
    const dispatch = useDispatch();
    const spotsObj = useSelector(state => state.spots.allSpots)
    const spots = Object.values(spotsObj)

      if(!spots) {
        return null
    }

      return (
        <div className="spots-container">
            {spots.map((spot) => (
              <SpotCard
                spot={spot}
                key={spot.id}
              />
            ))}
        </div>
      );
    };

    export default SpotList;

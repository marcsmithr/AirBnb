import { useDispatch, useSelector } from "react-redux"
import SpotCard from "../SpotCard";
import './SpotList.css'

const SpotList = () => {
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

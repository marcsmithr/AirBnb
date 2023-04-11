import { useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import SpotCard from "../SpotCard";
import { SearchContext } from "../../context/Search";
import './SpotList.css'

const SpotList = () => {
    const {searchedSpots, searchQuery}= useContext(SearchContext)
    const spotsObj = useSelector(state => state.spots.allSpots)
    const spots = Object.values(spotsObj)


    useEffect(()=>{
      
    }, [searchQuery])
      if(!spots) {
        return null
    }

      return (
        <>
        {searchedSpots.length<1 &&
          <div className="spots-container">
              {spots.map((spot) => (
                <SpotCard
                  spot={spot}
                  key={spot.id}
                />
              ))}
          </div>
        }
        {searchedSpots.length>0 &&
          <div className="spots-container">
          {searchedSpots.map((spot) => (
            <SpotCard
              spot={spot}
              key={spot.id}
            />
          ))}
      </div>
        }
        </>
      );
    };

    export default SpotList;

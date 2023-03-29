import React, { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getOneSpot } from "../../../store/spotReducer"

function BookingCard ({booking}) {
    const dispatch = useDispatch()
    const spot = useSelector(state=> state.spots.singleSpot)
    let previewImage;
    if(spot.spotImages && spot.spotImages.length> 0){
        previewImage = spot.spotImages[0]
    }
    useEffect(()=>{
        dispatch(getOneSpot(booking.spotId))
    }, [])

    if(!spot) return null
    return(
        <div>
            <div>
                {spot.spotImages?.length!==0 &&
                    <img src={previewImage.url}></img>
                }
            </div>
        </div>
    )
}

export default BookingCard

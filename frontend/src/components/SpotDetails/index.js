import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getOneSpot } from "../../store/spotReducer";

const SpotDetails = () => {
    const dispatch = useDispatch()
    const { spotId } = useParams();
    const spot = useSelector((state) => state.spots.singleSpot)
    useEffect((e)=>{
        e.preventDefault();
        dispatch(getOneSpot(spotId))
    })
    console.log('Spot Details: ', spot)
    return null;
}

export default SpotDetails

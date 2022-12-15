import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom";
import { useState } from "react"
import { putSpot } from "../../store/spotReducer";

const EditSpot = ()=>{

  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots.allSpots[spotId])

  const [address, setAddress] = useState(spot.address);
  const [city, setCity] = useState(spot.city);
  const [state, setState] = useState(spot.state);
  const [country, setCountry] = useState(spot.country);
  const [lat, setLat] = useState(spot.lat);
  const [lng, setLng] = useState(spot.lng)
  const [name, setName] = useState(spot.name);
  const [description, setDescription] = useState(spot.description);
  const [price, setPrice] = useState(spot.price);
  const [image, setImage] = useState(spot.previewImage)
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(spot)
    const payload = {spotPayload: {id: spot.id,
         address, city, state, country, lat, lng, name, description, price},
        imageUrl: image}
    return dispatch(putSpot(payload))
    .catch(async(res) =>{
        const data = await res.json()
        if( data && data.errors) {
            console.log('data: ', data)
            console.log('data.errors: ', data.errors)
            setErrors(data.errors)
        }
    })
    }

    return (
        <div className="spot-form-container">
            <h1>Edit {spot.name}</h1>
            <form className="create-spot-form" onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <lable>
                    Address
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}

                />
                </lable>
                <lable>
                    City
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                </lable>
                <lable>
                    State
                <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                />
                </lable>
                <lable>
                    Country
                <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
                </lable>
                <lable>
                    Latitude
                <input
                    type="number"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                />
                </lable>
                <lable>
                    Longitude
                <input
                    type="number"
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                />
                </lable>
                <lable>
                    Name
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                </lable>
                <lable>
                    Description
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                </lable>
                <lable>
                    Price
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                </lable>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default EditSpot

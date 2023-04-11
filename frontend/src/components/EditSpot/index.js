import { useSelector, useDispatch } from "react-redux"
import { useHistory, useParams } from "react-router-dom";
import { useState } from "react"
import { putSpot } from "../../store/spotReducer";

const EditSpot = ()=>{

  const dispatch = useDispatch();
  const history = useHistory()
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

  const handleSubmit = async(e) => {
    e.preventDefault()
    const payload = {spotPayload: {id: spot.id,
         address, city, state, country, lat, lng, name, description, price},
        imageUrl: image}
    await dispatch(putSpot(payload))
    .catch(async(res) =>{
        const data = await res.json()
        if( data && data.errors) {
            console.log('data: ', data)
            console.log('data.errors: ', data.errors)
            let errorsArr = Object.values(data.errors)
            setErrors(errorsArr)
        }
    })
    history.push(`/spots/${payload.spotPayload.id}`)
    }

    if(spot.id) return (
        <div className="form-page-main-container">
            <div className="form-header-div">
                <h1>Edit {`${spot.name}`}</h1>
            </div>
            <div className="form-page-inner-container">
            <form className="airbnb-form-page create-spot-form" onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <div className="non-text-form-inputs-container">
                    <label>
                        Address
                <input
                    className="non-text-form-inputs"
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
                    </label>
                </div>
                <div className="non-text-form-inputs-container">
                    <label>
                        City
                <input
                    className="non-text-form-inputs"
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                />
                    </label>
                </div>
                <div className="non-text-form-inputs-container">
                    <label>
                        State
                <input
                    className="non-text-form-inputs"
                    type="text"
                    placeholder="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                />
                    </label>
                </div>
                <div className="non-text-form-inputs-container">
                    <lable>
                        Country
                <input
                    className="non-text-form-inputs"
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                />
                    </lable>
                </div>
                <div className="non-text-form-inputs-container">
                    <label>
                        Name
                <input
                    className="non-text-form-inputs"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                    </label>
                </div>
                <div className="non-text-form-inputs-container">
                <label>
                    Description
                <input
                    className="non-text-form-inputs"
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                </label>
                </div>
                <div className="non-text-form-inputs-container">
                <label>
                    Price
                <input
                    className="non-text-form-inputs"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                </label>
                </div>
                <div className="form-button-container">
                <button type="submit" className="airbnb-button">
                    Submit
                    </button>
                </div>
            </form>
            </div>
        </div>
    )
    else return null
}

export default EditSpot

import { useDispatch } from "react-redux"
import { useState } from "react"
import { postSpot, postSpotImage } from "../../store/spotReducer";
import { useHistory } from "react-router-dom";

const CreateSpot = ()=>{
  const dispatch = useDispatch();
  const history = useHistory();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState(1);
  const [lng, setLng] = useState(1)
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [url, setUrl] = useState('')
  const [errors, setErrors] = useState([]);

  const handleSubmit = async(e) => {
    e.preventDefault()
    let payload = {
        spotPayload:{ address, city, state, country, lat, lng, name, description, price},
        imagePayload: {
            url: url,
            preview: true
        }}
    let spot = await dispatch(postSpot(payload))
    .catch(async(res) =>{
        let data = await res.json()

        if( data && data.errors) {
            setErrors(data.errors)
        }})
        history.push(`/spots/${spot.id}`)
}


    return (
        <div className="form-page-main-container">
            <div className="form-header-div">
                <h1>Create New Airbnb</h1>
            </div>
            <div className="form-page-inner-container">
            <form className="airbnb-form-page create-spot-form" onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <div className="form-input-container">
                <input
                    className="form-input"
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
                </div>
                <div className="form-input-container">
                <input
                    className="form-input"
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                />
                </div>
                <div className="form-input-container">
                <input
                    className="form-input"
                    type="text"
                    placeholder="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                />
                </div>
                <div className="form-input-container">
                <input
                    className="form-input"
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                />
                </div>
                <div className="form-input-container">
                <input
                    className="form-input"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                </div>
                <div className="form-input-container">
                <input
                    className="form-input"
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
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
                <label>
                    Preview Image
                <input
                    className="non-text-form-inputs"
                    type="url"
                    placeholder="Preview Image Url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
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
}

export default CreateSpot

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
        console.log('data: ', data)
        if( data && data.errors) {
            console.log('data: ', data)
            console.log('data.errors: ', data.errors)
            setErrors(data.errors)
        }})
        history.push(`/spots/${spot.id}`)
}


    return (
        <div className="spot-form-container">
            <h1>Create New Airbnb</h1>
            <form className="create-spot-form" onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label>
                    Address
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
                </label>
                <label>
                    City
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                />
                </label>
                <label>
                    State
                <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                />
                </label>
                <label>
                    Country
                <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                />
                </label>
    
                <label>
                    Name
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                </label>
                <label>
                    Description
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                </label>
                <label>
                    Price
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                </label>
                <label>
                    Preview Image
                <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                />
                </label>
                <button type="submit">
                    Submit
                    </button>
            </form>
        </div>
    )
}

export default CreateSpot

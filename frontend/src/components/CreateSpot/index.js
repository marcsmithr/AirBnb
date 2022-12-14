import { useDispatch } from "react-redux"
import { useState } from "react"
import { postSpot } from "../../store/spotReducer";

const CreateSpot = ()=>{
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0)
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault()
    return dispatch(postSpot({ address, city, state, lat, name, description, price}))
    .catch(async(res) =>{
        const data = await res.json();
        if( data && data.errors) {
            console.log('data: ', data)
            const errorsArr = Object.values(data.errors)
            console.log('errorsArr: ', errorsArr)
            setErrors(errorsArr)
        }
    })
    }

    return (
        <div className="spot-form-container">
            <h1>Create New Airbnb</h1>
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
                    required
                />
                </lable>
                <lable>
                    City
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                />
                </lable>
                <lable>
                    State
                <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                />
                </lable>
                <lable>
                    Country
                <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                />
                </lable>
                <lable>
                    Latitude
                <input
                    type="number"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    required
                />
                </lable>
                <lable>
                    Longitude
                <input
                    type="number"
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                    required
                />
                </lable>
                <lable>
                    Name
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                </lable>
                <lable>
                    Description
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                </lable>
                <lable>
                    Price
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                </lable>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreateSpot

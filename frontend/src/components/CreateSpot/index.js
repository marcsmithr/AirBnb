import { useDispatch } from "react-redux"
import { useState } from "react"
import { postSpot, postSpotImage } from "../../store/spotReducer";

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
  const [url, setUrl] = useState('')
  const [errors, setErrors] = useState([]);

  const handleSubmit = async(e) => {
    e.preventDefault()
    let errorsArr = []
    let spot = await dispatch(postSpot({ address, city, state, country, lat, lng, name, description, price}))
    .catch(async(res) =>{
        const data = await res.json()
        if( data && data.errors) {
            console.log('data: ', data)
            console.log('data.errors: ', data.errors)
            data.errors.forEach((el) => {
                errorsArr.push(el)
            })
        }})
        console.log(spot)
        if(!url){
            let payload = {
                spotId:spot.id,
                url: 'https://a0.muscache.com/im/pictures/f31aec24-2f49-4fdc-a1ac-b750117c0b8f.jpg?im_w=960',
                preview: true}
        dispatch(postSpotImage(payload))
        .catch(async(res) =>{
            const data = await res.json()
            if( data && data.message) {
                console.log('data: ', data)
                console.log('data.errors: ', data.message)
                    errorsArr.push(data.message)

            }
         })
        }
        if(url){
            let payload = {
                spotId:spot.id,
                url: url,
                preview: true}
        dispatch(postSpotImage(payload))
        .catch(async(res) =>{
            const data = await res.json()
            if( data && data.message) {
                console.log('data: ', data)
                console.log('data.errors: ', data.message)
                errorsArr.push(data.message)
            }
         })
        }
    setErrors(errorsArr)
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
                <lable>
                    Preview Image
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                </lable>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreateSpot

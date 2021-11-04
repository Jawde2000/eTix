import axios from "axios";

export async function getLocationName(locationID) {
    const { data } = await axios.post('http://127.0.0.1:8000/api/location', { 
        "locationID": locationID 
    })

    return(data[0].locationName)
}
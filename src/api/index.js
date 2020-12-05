import Axios from "axios"

const instance = Axios.create({
	baseURL: "https://api.nasa.gov/mars-photos/api/v1/",
	params: { api_key: process.env.REACT_APP_NASA_API_KEY },
})

export default instance

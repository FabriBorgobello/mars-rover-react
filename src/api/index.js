import Axios from "axios"

const instance = Axios.create({
	baseURL: "https://api.nasa.gov/mars-photos/api/v1/",
	params: { api_key: "HBh7tVBsNeFVpQdfghC8wdqHaWw674JjQ1AAHscC" },
})

export default instance

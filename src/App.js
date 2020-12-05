import * as React from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchLatestPhotos, fetchPhotosBySol, fetchPhotosByEarthDate, photosSelector } from "./slices/photos"

const App = () => {
	// State
	const [rover, setRover] = React.useState("curiosity")
	const [sol, setSol] = React.useState(null)
	const [earthDate, setEathDay] = React.useState(null)

	// Redux hooks
	const dispatch = useDispatch()
	const { photos, loading, hasErrors } = useSelector(photosSelector)
	// useEffect
	React.useEffect(() => {
		// dispatch(fetchLatestPhotos(rover))
		// dispatch(fetchPhotosBySol(rover, sol))
		// dispatch(fetchPhotosByEarthDate(rover, earthDate))
	}, [dispatch, rover])

	return (
		<section>
			<h1>Photos</h1>
		</section>
	)
}

export default App

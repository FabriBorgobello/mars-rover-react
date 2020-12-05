import * as React from "react"
import { useDispatch, useSelector } from "react-redux"
import { SearchForm } from "./components/SearchForm"
import { GridGallery } from "./components/GridGallery"
import { Manifest } from "./components/Manifest"
import { fetchManifest } from "./slices/manifest"
import { fetchLatestPhotos, photosSelector } from "./slices/photos"
import { SelectRoverForm } from "./components/SelectRoverForm"

const App = () => {
	// State
	const [rover, setRover] = React.useState("curiosity")
	const [sol, setSol] = React.useState("")
	const [earthDate, setEarthDate] = React.useState("")
	const [camera, setCamera] = React.useState("")

	// Redux hooks
	const dispatch = useDispatch()
	const { photos, loading, hasErrors } = useSelector(photosSelector)

	// Get latest photos
	React.useEffect(() => {
		dispatch(fetchManifest(rover))
		dispatch(fetchLatestPhotos(rover))
	}, [dispatch, rover])

	return (
		<>
			{/* Header */}
			<h1>Mars Rover Photos</h1>
			{/* Radio Button */}
			<SelectRoverForm setRover={setRover} setSol={setSol} setEarthDate={setEarthDate} />
			{/* Manifests */}
			<Manifest />
			{/* Search Form */}
			<SearchForm
				rover={rover}
				setRover={setRover}
				sol={sol}
				setSol={setSol}
				earthDate={earthDate}
				setEarthDate={setEarthDate}
				camera={camera}
				setCamera={setCamera}
			/>
			{/* Photo Gallery */}
			{loading && <div>Loading...</div>}
			{hasErrors && <div>There has been an error processing your request</div>}
			{photos.length > 0 && <GridGallery />}
			{photos.length === 0 && !loading && !hasErrors && <div>There are no photos for the specified data</div>}
		</>
	)
}

export default App

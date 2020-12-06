import * as React from "react"
import { useDispatch, useSelector } from "react-redux"
import { SearchForm } from "./components/SearchForm"
import { GridGallery } from "./components/GridGallery"
import { Manifest } from "./components/Manifest"
import { fetchManifest, manifestSelector } from "./slices/manifest"
import { fetchLatestPhotos, photosSelector } from "./slices/photos"
import { SelectRoverForm } from "./components/SelectRoverForm"

const App = () => {
	// State
	const [rover, setRover] = React.useState("curiosity")
	const [sol, setSol] = React.useState("")
	const [earthDate, setEarthDate] = React.useState("")
	const [camera, setCamera] = React.useState("")
	const [availableCameras, setAvailableCameras] = React.useState([])

	// Redux hooks
	const dispatch = useDispatch()
	const { photos, loading, hasErrors } = useSelector(photosSelector)
	const { manifest } = useSelector(manifestSelector)

	React.useEffect(() => {
		// Get mission manifest
		dispatch(fetchManifest(rover))
		// Get latest photos
		dispatch(fetchLatestPhotos(rover))
		// Get available cameras
		let availableCameras = []
		if (rover === "curiosity") {
			availableCameras = ["", "FHAZ", "RHAZ", "MAST", "CHEMCAM", "MAHLI", "MARDI", "NAVCAM"]
		} else {
			availableCameras = ["", "FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"]
		}
		setAvailableCameras(availableCameras)
	}, [dispatch, rover])

	// Normalize photos for Gallery
	const normalizePhotos = () => {
		let filteredPhotos = []
		photos.forEach((photo) => {
			filteredPhotos.push({
				src: photo.img_src,
				thumbnail: photo.img_src,
				thumbnailWidth: 1000,
				thumbnailHeight: 1000,
				camera: photo.camera.name,
			})
		})
		return filteredPhotos
	}

	return (
		<div className='main-container'>
			<header>
				<h1>Mars Rover Photos</h1>
			</header>
			<div className='first-section'>
				{/* Radio Button */}
				<SelectRoverForm rover={rover} setRover={setRover} />
				{/* Manifests */}
				<Manifest />
				{/* Search Form */}
				<SearchForm
					rover={rover}
					manifest={manifest}
					sol={sol}
					earthDate={earthDate}
					camera={camera}
					setSol={setSol}
					setEarthDate={setEarthDate}
					setCamera={setCamera}
					availableCameras={availableCameras}
				/>
			</div>
			<div className='second-section'>
				{/* Photo Gallery */}
				{photos.length > 0 && <GridGallery photos={normalizePhotos()} />}
				{photos.length === 0 && !loading && !hasErrors && <div>There are no photos with the specified data</div>}
			</div>
		</div>
	)
}

export default App

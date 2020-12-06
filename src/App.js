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

	// Redux hooks
	const dispatch = useDispatch()
	const { photos, loading, hasErrors } = useSelector(photosSelector)

	React.useEffect(() => {
		// Get mission manifest
		dispatch(fetchManifest(rover))
		// Get latest photos
		dispatch(fetchLatestPhotos(rover))
	}, [dispatch, rover])

	// Normalize photos for Gallery
	const normalizePhotos = () => {
		const filteredPhotos = []
		photos.forEach((photo) => {
			filteredPhotos.push({
				src: photo.img_src,
				thumbnail: photo.img_src,
				thumbnailWidth: 1000,
				thumbnailHeight: 1000,
				camera: { name: photo.camera.name, full_name: photo.camera.full_name },
			})
		})
		return filteredPhotos
	}

	return (
		<>
			{/* Header */}
			<h1>Mars Rover Photos</h1>
			{/* Radio Button */}
			<SelectRoverForm setRover={setRover} />
			{/* Manifests */}
			<Manifest />
			{/* Search Form */}
			<SearchForm rover={rover} />
			{/* Photo Gallery */}
			{loading && <div>Loading...</div>}
			{hasErrors && <div>There has been an error processing your request</div>}
			{photos.length > 0 && <GridGallery photos={normalizePhotos()} />}
			{photos.length === 0 && !loading && !hasErrors && <div>There are no photos for the specified data</div>}
		</>
	)
}

export default App

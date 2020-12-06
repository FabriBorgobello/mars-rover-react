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
	const { manifest } = useSelector(manifestSelector)

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
		<div className='main-container'>
			{/* Header */}
			<header>
				<h1>Mars Rover Photos</h1>
			</header>
			<div className='first-section'>
				{/* Radio Button */}
				<SelectRoverForm setRover={setRover} />
				{/* Manifests */}
				<Manifest />
				{/* Search Form */}
				<SearchForm rover={rover} manifest={manifest} />
			</div>
			<div className='second-section'>
				{/* Photo Gallery */}
				{photos.length > 0 && <GridGallery photos={normalizePhotos()} />}
			</div>
		</div>
	)
}

export default App

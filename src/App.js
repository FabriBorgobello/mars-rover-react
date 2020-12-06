import * as React from "react"
import { useDispatch, useSelector } from "react-redux"
import { SearchForm } from "./components/SearchForm"
import { GridGallery } from "./components/GridGallery"
import { Manifest } from "./components/Manifest"
import { fetchManifest, manifestSelector } from "./slices/manifest"
import { fetchLatestPhotos, photosSelector } from "./slices/photos"
import { SelectRoverForm } from "./components/SelectRoverForm"
import { Grid } from "@material-ui/core"

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
			<Grid container spacing={1}>
				<Grid container item xs={12}>
					{/* Header */}
					<h1>Mars Rover Photos</h1>
				</Grid>
				<Grid container item xs={12} sm={4} spacing={3}>
					{/* Radio Button */}
					<SelectRoverForm setRover={setRover} />
				</Grid>
				<Grid container item xs={12} sm={6} spacing={3}>
					{/* Manifests */}
					<Manifest />
				</Grid>
				<Grid container item xs={12} spacing={3}>
					{/* Search Form */}
					<SearchForm rover={rover} />
				</Grid>
				<Grid container item xs={12} spacing={3}>
					{/* Photo Gallery */}
					{loading && <div>Loading...</div>}
					{hasErrors && <div>There has been an error processing your request</div>}
					{photos.length > 0 && <GridGallery photos={normalizePhotos()} />}
					{photos.length === 0 && !loading && !hasErrors && <div>There are no photos for the specified data</div>}
				</Grid>
			</Grid>
		</>
	)
}

export default App

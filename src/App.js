import * as React from "react"
import { useDispatch, useSelector } from "react-redux"
import { GridGallery } from "./components/GridGallery"
import { fetchLatestPhotos, fetchPhotosBySol, fetchPhotosByEarthDate, photosSelector } from "./slices/photos"

const App = () => {
	// State
	const [rover, setRover] = React.useState("curiosity")
	const [sol, setSol] = React.useState("")
	const [earthDate, setEarthDay] = React.useState("2015-6-3")

	// Redux hooks
	const dispatch = useDispatch()
	const { photos, loading, hasErrors } = useSelector(photosSelector)
	// useEffect
	React.useEffect(() => {
		dispatch(fetchLatestPhotos(rover))
		// dispatch(fetchPhotosBySol(rover, sol))
		// dispatch(fetchPhotosByEarthDate(rover, earthDate))
	}, [dispatch, rover])

	return (
		<>
			<section>
				<h1>Mars Rover Photos</h1>
			</section>
			{/* Form */}
			<div>
				{/* Radio Button */}
				<div
					onChange={(e) => {
						setRover(e.target.value)
						setSol("")
					}}
				>
					<input type='radio' id='curiosity' name='rover' value='curiosity' defaultChecked />
					<label htmlFor='curiosity'>Curiosity</label>
					<br />
					<input type='radio' id='opportunity' name='rover' value='opportunity' />
					<label htmlFor='opportunity'>Opportunity</label>
					<br />
					<input type='radio' id='spirit' name='rover' value='spirit' />
					<label htmlFor='spirit'>Spirit</label>
				</div>
				{/* Sol */}
				<form
					onSubmit={(e) => {
						e.preventDefault()
						dispatch(fetchPhotosBySol(rover, sol))
					}}
				>
					<label>Search by Sol Date</label>
					<input value={sol} type='number' placeholder='Enter a Sol Date...' onChange={(e) => setSol(e.target.value)} />
					<button type='submit'>Search</button>
				</form>
			</div>
			<br />

			{/* Photo Gallery */}
			{loading && <div>Loading...</div>}
			{hasErrors && <div>There has been an error processing your request</div>}
			{photos.length > 0 && <GridGallery />}
		</>
	)
}

export default App

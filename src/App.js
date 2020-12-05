import * as React from "react"
import { useDispatch, useSelector } from "react-redux"
import { GridGallery } from "./components/GridGallery"
import { fetchLatestPhotos, fetchPhotosBySol, fetchPhotosByEarthDate, photosSelector } from "./slices/photos"

const App = () => {
	// State
	const [rover, setRover] = React.useState("curiosity")
	const [sol, setSol] = React.useState("")
	const [earthDate, setEarthDate] = React.useState("")

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
				<label>Rover</label>
				<div
					onChange={(e) => {
						setRover(e.target.value)
						setSol("")
						setEarthDate("")
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
						setEarthDate("")
						dispatch(fetchPhotosBySol(rover, sol))
					}}
				>
					<label>Search by Sol</label>
					<input value={sol} type='number' placeholder='Enter a Sol...' onChange={(e) => setSol(e.target.value)} required />
					<button type='submit'>Search</button>
				</form>
				{/* Earth Date */}
				<form
					onSubmit={(e) => {
						e.preventDefault()
						setSol("")
						dispatch(fetchPhotosByEarthDate(rover, earthDate))
					}}
				>
					<label>Search by Earth Date</label>
					<input
						value={earthDate}
						type='date'
						placeholder='Enter a date...'
						onChange={(e) => setEarthDate(e.target.value)}
						required
					/>
					<button type='submit'>Search</button>
				</form>
			</div>
			<br />

			{/* Photo Gallery */}
			{loading && <div>Loading...</div>}
			{hasErrors && <div>There has been an error processing your request</div>}
			{photos.length > 0 && <GridGallery />}
			{photos.length === 0 && !loading && !hasErrors && <div>There are no photos for the specified data</div>}
		</>
	)
}

export default App

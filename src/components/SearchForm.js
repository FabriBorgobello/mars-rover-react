import { useDispatch } from "react-redux"
import { fetchPhotosByEarthDate, fetchPhotosBySol } from "../slices/photos"

export const SearchForm = ({ rover, setRover, sol, setSol, earthDate, setEarthDate }) => {
	const dispatch = useDispatch()

	return (
		<div>
			<h3>Filter photos</h3>
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
	)
}

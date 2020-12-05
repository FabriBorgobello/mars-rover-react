import { useDispatch } from "react-redux"
import { fetchPhotosByEarthDate, fetchPhotosBySol } from "../slices/photos"

export const Form = ({ rover, setRover, sol, setSol, earthDate, setEarthDate }) => {
	const dispatch = useDispatch()

	return (
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
	)
}

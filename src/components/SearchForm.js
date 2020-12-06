import { Button, TextField, Tooltip } from "@material-ui/core"
import * as React from "react"
import { useDispatch } from "react-redux"
import { fetchPhotosByEarthDate, fetchPhotosBySol } from "../slices/photos"

export const SearchForm = ({ rover, manifest }) => {
	const dispatch = useDispatch()
	const [sol, setSol] = React.useState(0)
	const [earthDate, setEarthDate] = React.useState(new Date())

	return (
		<div className='card card-search'>
			<h2>Search photos by...</h2>
			<hr />

			<div className='inputs'>
				{/* Sol */}
				<form
					className='form'
					onSubmit={(e) => {
						e.preventDefault()
						console.log(e)
						dispatch(fetchPhotosBySol(rover, sol))
						setEarthDate(new Date())
					}}
				>
					<Tooltip title="Martian rotation or day on which the photos were taken, counting up from the rover's landing date.">
						<TextField
							id='sol'
							type='number'
							label='Sol date (?)'
							value={sol}
							onChange={(e) => setSol(e.target.value)}
							InputProps={{ inputProps: { min: 0, max: manifest.max_sol } }}
							InputLabelProps={{ shrink: true }}
							required
							fullWidth={true}
						/>
					</Tooltip>
					<Button variant='contained' color='primary' type='submit'>
						Search by sol
					</Button>
				</form>
				{/* Earth Date */}
				<form
					className='form'
					onSubmit={(e) => {
						e.preventDefault()
						dispatch(fetchPhotosByEarthDate(rover, earthDate))
						setSol(0)
					}}
				>
					<TextField
						id='sol'
						type='date'
						label='Earth day'
						InputProps={{ inputProps: { min: manifest.landing_date, max: manifest.max_date } }}
						value={earthDate}
						onChange={(e) => setEarthDate(e.target.value)}
						InputLabelProps={{ shrink: true }}
						fullWidth={true}
						required
					/>
					<Button variant='contained' color='primary' type='submit'>
						Search by date
					</Button>
				</form>
			</div>
		</div>
	)
}

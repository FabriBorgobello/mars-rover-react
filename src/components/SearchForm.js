import { Button, FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Tooltip } from "@material-ui/core"
import * as React from "react"
import { useDispatch } from "react-redux"
import { fetchPhotos } from "../slices/photos"

export const SearchForm = ({ rover, manifest, sol, earthDate, camera, setSol, setEarthDate, setCamera, availableCameras }) => {
	const dispatch = useDispatch()

	const [activatedInput, setActivatedInput] = React.useState("sol")

	const handleSubmit = (e) => {
		e.preventDefault()
		dispatch(fetchPhotos(rover, sol, earthDate, camera))
	}

	return (
		<div className='card card-search'>
			<h2>Search photos by...</h2>
			<hr />
			<div className='inputs'>
				{/* Radio Buttos */}
				<RadioGroup
					defaultValue={activatedInput}
					aria-label='rover'
					name='rover'
					onChange={(e) => setActivatedInput(e.target.value)}
				>
					<FormControlLabel value='sol' control={<Radio />} label='Sol' />
					<FormControlLabel value='earth_date' control={<Radio />} label='Earth date' />
				</RadioGroup>
				{/* Sol */}
				<form className='search-form' onSubmit={handleSubmit}>
					{activatedInput === "sol" && (
						<Tooltip
							className='formElement'
							title="Martian rotation or day on which the photos were taken, counting up from the rover's landing date."
						>
							<TextField
								id='sol'
								type='number'
								label='Sol date (?)'
								value={sol}
								onChange={(e) => {
									setSol(e.target.value)
									setEarthDate("")
								}}
								InputProps={{ inputProps: { min: 0, max: manifest.max_sol } }}
								InputLabelProps={{ shrink: true }}
								fullWidth
								required
							/>
						</Tooltip>
					)}

					{/* Earth Date */}
					{activatedInput === "earth_date" && (
						<TextField
							className='formElement'
							id='sol'
							type='date'
							label='Earth day'
							InputProps={{ inputProps: { min: manifest.landing_date, max: manifest.max_date } }}
							value={earthDate}
							onChange={(e) => {
								setEarthDate(e.target.value)
								setSol("")
							}}
							InputLabelProps={{ shrink: true }}
							fullWidth
							required
						/>
					)}

					{/* Camera */}
					<div className='formElement'>
						<InputLabel id='Cameral'>Select camera (optional)</InputLabel>
						<Select fullWidth labelId='Camera' value={camera} onChange={(e) => setCamera(e.target.value)}>
							{availableCameras.map((camera) => {
								return <MenuItem value={camera}>{camera}</MenuItem>
							})}
						</Select>
					</div>
					{/* Submit */}
					<Button variant='contained' color='primary' type='submit' children='Search' />
				</form>
			</div>
		</div>
	)
}

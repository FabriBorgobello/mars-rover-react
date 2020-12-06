import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core"

export const SelectRoverForm = ({ rover, setRover }) => {
	return (
		<div className='card card-rover'>
			<h2>Rovers</h2>
			<hr />
			<RadioGroup defaultValue={rover} aria-label='rover' name='rover' onChange={(e) => setRover(e.target.value)}>
				<FormControlLabel value='curiosity' control={<Radio />} label='Curiosity' />
				<FormControlLabel value='opportunity' control={<Radio />} label='Opportunity' />
				<FormControlLabel value='spirit' control={<Radio />} label='Spirit' />
			</RadioGroup>
		</div>
	)
}

import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core"

export const SelectRoverForm = ({ rover, setRover, setSol, setEarthDate }) => {
	const handleChange = (e) => {
		setSol("")
		setEarthDate("")
		setRover(e.target.value)
	}
	return (
		<div className='card card-rover'>
			<h2>Rovers</h2>
			<hr />
			<RadioGroup className='radio' defaultValue={rover} aria-label='rover' name='rover' onChange={handleChange}>
				<FormControlLabel value='curiosity' control={<Radio />} label='Curiosity' />
				<FormControlLabel value='opportunity' control={<Radio />} label='Opportunity' />
				<FormControlLabel value='spirit' control={<Radio />} label='Spirit' />
			</RadioGroup>
			<img id='nasa-logo' src='https://logos-marcas.com/wp-content/uploads/2020/05/NASA-Logo-650x366.png' alt='NASA Logo' />
		</div>
	)
}

export const SelectRoverForm = ({ setRover }) => {
	return (
		<>
			<h2>Rover</h2>
			<div onChange={(e) => setRover(e.target.value)}>
				<input type='radio' id='curiosity' name='rover' value='curiosity' defaultChecked />
				<label htmlFor='curiosity'>Curiosity</label>
				<br />
				<input type='radio' id='opportunity' name='rover' value='opportunity' />
				<label htmlFor='opportunity'>Opportunity</label>
				<br />
				<input type='radio' id='spirit' name='rover' value='spirit' />
				<label htmlFor='spirit'>Spirit</label>
			</div>
		</>
	)
}

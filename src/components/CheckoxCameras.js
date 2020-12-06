import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core"
import * as React from "react"
export const CheckoxCameras = ({ setCamera, camera }) => {
	return (
		<div className='card'>
			<h2>Cameras</h2>
			<hr />
			<RadioGroup row aria-label='gender' name='gender1' value={camera} onChange={(e) => setCamera(e.target.value)}>
				<FormControlLabel value='FHAZ' control={<Radio />} label='FHAZ' />
				<FormControlLabel value='RHAZ' control={<Radio />} label='RHAZ' />
				<FormControlLabel value='MAST' control={<Radio />} label='MAST' />
				<FormControlLabel value='CHEMCAM' control={<Radio />} label='CHEMCAM' />
				<FormControlLabel value='MAHLO' control={<Radio />} label='MAHLO' />
				<FormControlLabel value='MARDI' control={<Radio />} label='MARDI' />
				<FormControlLabel value='NAVCAM' control={<Radio />} label='NAVCAM' />
				<FormControlLabel value='PANCAM' control={<Radio />} label='PANCAM' />
				<FormControlLabel value='MINITES' control={<Radio />} label='MINITES' />
			</RadioGroup>
		</div>
	)
}

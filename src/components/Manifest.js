import { CircularProgress } from "@material-ui/core"
import { useSelector } from "react-redux"
import { manifestSelector } from "../slices/manifest"

export const Manifest = () => {
	const { manifest, loading, hasErrors } = useSelector(manifestSelector)

	return (
		<div className='card card-manifest'>
			<h2>Mission Manifest</h2>
			<hr />
			{loading && <CircularProgress />}
			{hasErrors && <div className='card card-manifest'>An error has occured. Please reload.</div>}
			{manifest && !loading && (
				<ul>
					<h3><b>Rover name:</b> {manifest.name}</h3>
					<li><b>Launch Date:</b> {manifest.launch_date}</li>
					<li><b>Landing Date:</b> {manifest.landing_date}</li>
					<li><b>Max Date:</b> {manifest.max_date}</li>
					<li><b>Max Sol:</b> {manifest.max_sol}</li>
				</ul>
			)}
		</div>
	)
}

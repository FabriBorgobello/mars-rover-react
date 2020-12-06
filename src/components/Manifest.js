import { useSelector } from "react-redux"
import { manifestSelector } from "../slices/manifest"

export const Manifest = () => {
	const { manifest, loading, hasErrors } = useSelector(manifestSelector)

	if (loading) {
		return <div className='card card-manifest'>Loading...</div>
	}
	if (hasErrors) {
		return <div className='card card-manifest'>An error has occured. Please reload.</div>
	}
	return (
		<div className='card card-manifest'>
			<h2>Mission Manifest</h2>
			<hr />
			<ul>
				<h3>Rover name: {manifest.name}</h3>
				<li>Launch Date: {manifest.launch_date}</li>
				<li>Landing Date: {manifest.landing_date}</li>
				<li>Max Date: {manifest.max_date}</li>
				<li>Max Sol: {manifest.max_sol}</li>
			</ul>
		</div>
	)
}

import { useSelector } from "react-redux"
import { manifestSelector } from "../slices/manifest"

export const Manifest = () => {
	const { manifest, loading, hasErrors } = useSelector(manifestSelector)

	if (loading) {
		return <div>Loading...</div>
	}
	return (
		<>
			<h2>{manifest.name}</h2>
			<p>Launch Date: {manifest.launch_date}</p>
			<p>Landing Date: {manifest.landing_date}</p>
			<p>Max Date: {manifest.max_date}</p>
			<p>Max Sol: {manifest.max_sol}</p>
		</>
	)
}

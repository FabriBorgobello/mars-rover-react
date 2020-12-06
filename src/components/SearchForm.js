import * as React from "react"
import { useDispatch } from "react-redux"
import { fetchPhotosByEarthDate, fetchPhotosBySol } from "../slices/photos"

export const SearchForm = ({ rover, availableCameras }) => {
	const dispatch = useDispatch()
	console.log(availableCameras)
	return (
		<div>
			<h3>Search photos by...</h3>
			{/* Sol */}
			<label>Sol date</label>
			<input
				type='number'
				placeholder='Enter a Sol...'
				onChange={(e) => dispatch(fetchPhotosBySol(rover, e.target.value))}
				required
			/>
			{/* Earth Date */}
			<label>Earth date</label>
			<input
				type='date'
				placeholder='Enter a date...'
				onChange={(e) => dispatch(fetchPhotosByEarthDate(rover, e.target.value))}
				required
			/>
		</div>
	)
}

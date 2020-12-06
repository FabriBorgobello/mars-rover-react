import axios from "../api"
import { createSlice } from "@reduxjs/toolkit"

export const initialState = {
	loading: false,
	hasErrors: false,
	photos: [],
}

const photosSlice = createSlice({
	name: "photos",
	initialState,
	reducers: {
		getPhotos: (state) => {
			state.loading = true
		},
		getPhotosSuccess: (state, { payload }) => {
			state.photos = payload
			state.loading = false
			state.hasErrors = false
		},
		getPhotosFailure: (state) => {
			state.loading = false
			state.hasErrors = true
		},
	},
})

// Actions
export const { getPhotos, getPhotosSuccess, getPhotosFailure } = photosSlice.actions
// Reducer
export default photosSlice.reducer
// Selector
export const photosSelector = (state) => state.photos

// Async thunk actions
export const fetchLatestPhotos = (rover) => async (dispatch) => {
	dispatch(getPhotos())

	try {
		const response = await axios.get(`rovers/${rover}/latest_photos`)
		dispatch(getPhotosSuccess(response.data.latest_photos))
	} catch (error) {
		dispatch(getPhotosFailure())
	}
}
export const fetchPhotosBySol = (rover, sol, camera) => async (dispatch) => {
	dispatch(getPhotos())

	const objParams = camera ? { params: { sol: sol, camera: camera } } : { params: { sol: sol } }
	try {
		const response = await axios.get(`rovers/${rover}/photos`, objParams)
		dispatch(getPhotosSuccess(response.data.photos))
	} catch (error) {
		dispatch(getPhotosFailure())
	}
}
export const fetchPhotosByEarthDate = (rover, earthDate, camera) => async (dispatch) => {
	dispatch(getPhotos())

	const objParams = camera ? { params: { earth_date: earthDate, camera: camera } } : { params: { earth_date: earthDate } }
	try {
		const response = await axios.get(`rovers/${rover}/photos`, objParams)
		dispatch(getPhotosSuccess(response.data.photos))
	} catch (error) {
		dispatch(getPhotosFailure())
	}
}

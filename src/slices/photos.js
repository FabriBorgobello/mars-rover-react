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
		dispatch(getPhotosSuccess(response.data))
	} catch (error) {
		dispatch(getPhotosFailure())
	}
}
export const fetchPhotosBySol = (rover, sol) => async (dispatch) => {
	dispatch(getPhotos())

	try {
		const response = await axios.get(`rovers/${rover}/photos?sol=${sol}`)
		dispatch(getPhotosSuccess(response.data))
	} catch (error) {
		dispatch(getPhotosFailure())
	}
}
export const fetchPhotosByEarthDate = (rover, earthDate) => async (dispatch) => {
	dispatch(getPhotos())

	try {
		const response = await axios.get(`rovers/${rover}/photos?earth_date=${earthDate}`)
		dispatch(getPhotosSuccess(response.data))
	} catch (error) {
		dispatch(getPhotosFailure())
	}
}

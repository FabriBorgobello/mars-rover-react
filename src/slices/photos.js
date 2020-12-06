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

export const fetchPhotos = (rover, sol = null, earthDate = null, camera = null) => async (dispatch) => {
	let objParams = {}
	if (!camera) {
		if (sol) {
			objParams = { params: { sol: sol } }
		} else {
			objParams = { params: { earth_date: earthDate } }
		}
	} else {
		if (sol) {
			objParams = { params: { sol: sol, camera: camera } }
		} else {
			objParams = { params: { earth_date: earthDate, camera: camera } }
		}
	}
	dispatch(getPhotos())
	try {
		const response = await axios.get(`rovers/${rover}/photos`, objParams)
		dispatch(getPhotosSuccess(response.data.photos))
	} catch (error) {
		dispatch(getPhotosFailure())
	}
}

import axios from "../api"
import { createSlice } from "@reduxjs/toolkit"

export const initialState = {
	loading: false,
	hasErrors: false,
	manifest: {},
}

const manifestSlice = createSlice({
	name: "manifest",
	initialState,
	reducers: {
		getManifest: (state) => {
			state.loading = true
		},
		getManifestSuccess: (state, { payload }) => {
			state.manifest = payload
			state.loading = false
			state.hasErrors = false
		},
		getManifestFailure: (state) => {
			state.loading = false
			state.hasErrors = true
		},
	},
})

// Actions
export const { getManifest, getManifestSuccess, getManifestFailure } = manifestSlice.actions
// Reducer
export default manifestSlice.reducer
// Selector
export const manifestSelector = (state) => state.manifest

// Async thunk actions
export const fetchManifest = (rover) => async (dispatch) => {
	dispatch(getManifest())

	try {
		const response = await axios.get(`manifests/${rover}`)
		dispatch(getManifestSuccess(response.data))
	} catch (error) {
		dispatch(getManifestFailure())
	}
}

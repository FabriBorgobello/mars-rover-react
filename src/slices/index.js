import { combineReducers } from "redux"

import photosReducer from "./photos"
import manifestReducer from "./manifest"

const rootReducer = combineReducers({
	photos: photosReducer,
	manifest: manifestReducer,
})

export default rootReducer

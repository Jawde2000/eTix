import { createStore } from "redux"
import reducer from "./reducers/routeReducer"

export const store = createStore(reducer)
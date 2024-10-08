import { configureStore } from "@reduxjs/toolkit";
import qouteSlice, {addQoute} from "./features/qouteSlice";


export const store = configureStore({
    reducer: {
        qoutes: qouteSlice
    }
})



export {addQoute}
export default store
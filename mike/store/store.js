import { configureStore } from "@reduxjs/toolkit";
import qouteSlice, {addQoute} from "./features/qouteSlice/qouteSlice";
import carSlice, {addCar} from "./features/carSlice/carSlice";



export const store = configureStore({
  reducer: {
    qoutes: qouteSlice,
    cars: carSlice,
  },
});


export {addQoute, addCar}
export default store;

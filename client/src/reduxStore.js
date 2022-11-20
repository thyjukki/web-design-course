import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./localization/localeSlice"

const store = configureStore({
  reducer: {
    user: userSlice
  }
})

export default store

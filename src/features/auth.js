import { createSlice } from '@reduxjs/toolkit'

/* 
  We have two sources of truth for Auth Data
  Both Local Storage and Redux Store
  isAuthenticated is native to only redux store.
*/
const initialState = {
    user: {},
    isAuthenticated: false,
    sessionId: " "
}

/* 
  Reducer to dispatch an action to the Store (Write to the Store)
*/
const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData(state, action) {
        console.log("Reducer Triggered")
        // User data received in the form of an Object 
        state.user = action.payload,
        state.isAuthenticated = true,
        // Session ID is prereq to fetch user data, hence fetching from Local Storage 
        state.sessionId = localStorage.getItem("session_id")
        // Writing user data to Local Storage 
        localStorage.setItem("account_id", action.payload.id)
    },
  }
})

export const {setUserData} = authSlice.actions
export default authSlice.reducer
/* 
  A function which returns state.user, when executed in a
  different execution context.
*/
export const userSelector = (state) => state.user;
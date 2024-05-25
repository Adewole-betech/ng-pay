import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {},
    sumbittedUser: {},
    searchText: '',
    loading: false
}

export const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        clearSumbittedUser: (state) =>{
            state.user = {}
        },
        updateUserData: (state, action) => {
            state.user = action.payload
        },
        userData: (state, action) => {
            state.loading = true
            state.sumbittedUser = action.payload
            state.loading = false
        },
        searchData: (state, action) => {
            state.searchText = action.payload
        },
        clearSearchData: (state) => {
            state.searchText = ''
        },
    }
})

export const {
    updateUserData,
    userData,
    searchData,
    clearSumbittedUser,
    clearSearchData
} = userDataSlice.actions
export default userDataSlice.reducer;
import { createSlice } from '@reduxjs/toolkit'


/* 
    Slice for Category or Genre Selection 
*/


/* 
  Entire store is made up of Individual Slices
  Slice = Means to group related data 
*/

const initialState = {
    genreIdOrCategoryName : undefined,
    page: 1,
    searchQuery : undefined
}

/* 
  Reducer to dispatch an action to the Store (Write to the Store)
*/
const genreOrCategory = createSlice({
  name: 'genreOrCategory',
  initialState,
  reducers: {
    selectGenreOrCategory(state, action) {
        /* Adding value into our state */
        state.genreIdOrCategoryName = action.payload;
        state.searchQuery = undefined
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    }
  }
})

export const {selectGenreOrCategory, setSearchQuery} = genreOrCategory.actions
export default genreOrCategory.reducer
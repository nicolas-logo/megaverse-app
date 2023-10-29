import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  CANDIDATE_ID: ''
}

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setCandidateId: (state, action) => {
      state.CANDIDATE_ID = action.payload
    }
  }
})

export const {
  setCandidateId
} = generalSlice.actions
export default generalSlice.reducer

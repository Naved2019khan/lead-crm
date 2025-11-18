import { createSlice } from '@reduxjs/toolkit'
const INITIAL_STATE = {
    openModal : "", // can have value of "signUp" or "signIn"
    user: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    setOpenModal: (state, action) => { state.openModal = action.payload },
  }
})

export const { setOpenModal } = authSlice.actions
export default authSlice.reducer


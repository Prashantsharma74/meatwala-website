import { createSlice } from '@reduxjs/toolkit';

const pincodeSlice = createSlice({
  name: 'pincode',
  initialState: '',
  reducers: {
    setPincode: (state, action) => action.payload,
  },
});

export const { setPincode } = pincodeSlice.actions;

export default pincodeSlice.reducer;

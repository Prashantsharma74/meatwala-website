import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendOtpApi } from "../../utils/api";

const initialState = {
  loading: false,
  success: false,
  error: null,
  status:null,
  otp: null,
  mobileNumber: null,
  verified: false,
  user: {},
  userAddress: {},
  activeTab: "Delivery",
};

const userSlice = createSlice({
  // name: "otp",
  name: "user",
  initialState,
  reducers: {
    resetState: (state) => {
      return initialState;
    },
    updateKeyValue: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.otp = action.payload.response?.otp;
        state.mobileNumber = action.payload.mobileNumber;
        state.status = action.payload.response?.status;
        state.error = null;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const sendOtp = createAsyncThunk(
  "otp/sendOtp",
  async (data, { rejectWithValue }) => {
    try {
      const response = await sendOtpApi(data);
      // console.log("response", response.otp);
      return { response, mobileNumber: data.mobileno };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const { resetState, updateKeyValue,setActiveTab } = userSlice.actions;

export default userSlice.reducer;

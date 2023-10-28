import { createSlice } from '@reduxjs/toolkit';
// utils
//

// ----------------------------------------------------------------------
export interface IInitialState {
  formDetails: null | any;
  razorpay_plan_id: undefined;
  subscription: boolean;
  formIsUpdating: boolean;
  defaultGateway: string | null;
  razorpay_plan_amount: string;
  updateFormAmount: boolean;
  formImageTypeUploading: null;
}

export const initialState: IInitialState = {
  formDetails: {},
  razorpay_plan_id: undefined,
  subscription: false,
  formIsUpdating: false,
  defaultGateway: null,
  razorpay_plan_amount: '',
  updateFormAmount: false,
  formImageTypeUploading: null,
};

const slice = createSlice({
  name: 'formEditor',
  initialState,
  reducers: {
    enableSubscription(state, action) {
      state.subscription = action.payload;
      state.formDetails.allowDonation = false;
    },

    setForm(state, action) {
      state.formDetails = action.payload;
    },

    setRazorpayDetails(state, action) {
      state.razorpay_plan_id = action.payload.razorpay_plan_id;
      state.razorpay_plan_amount = action.payload.razorpay_plan_amount;
      state.updateFormAmount = true;
    },

    setAmountDetailsUpdated(state, action) {
      state.updateFormAmount = action.payload;
    },

    setFormImageUploading(state, action) {
      state.formImageTypeUploading = action.payload.formImageTypeUploading;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  enableSubscription,
  setForm,
  setRazorpayDetails,
  setAmountDetailsUpdated,
  setFormImageUploading,
} = slice.actions;

import { createSlice } from '@reduxjs/toolkit';

export interface ToastInitialState {
  show: boolean;
  message: string;
  type: string;
}

export const initialState: ToastInitialState = {
  show: false,
  message: '',
  type: '',
};

const slice = createSlice({
  name: 'toastSlice',
  initialState,
  reducers: {
    triggerToast(
      state,
      action: {
        payload: {
          show: boolean;
          type: string;
          message: string;
        };
      }
    ) {
      state.show = action.payload.show;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
  },
});

export const { triggerToast } = slice.actions;
export default slice.reducer;

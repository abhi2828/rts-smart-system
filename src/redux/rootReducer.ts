import { combineReducers } from 'redux';

import customToast from './slices/customSlice';
import formEditorReducer from './slices/formEditor';
import productFormEditor from './slices/productFormEditor';

const rootReducer = combineReducers({
  formEditor: formEditorReducer,
  productsFromEditor: productFormEditor,
  customSlice: customToast,
});

export { rootReducer };

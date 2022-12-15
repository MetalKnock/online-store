import { Items } from '../types/data';
import { itemsLoading, itemsLoadingError, itemsLoadingSuccess } from './reducers/itemState';
import { AppDispatch } from './rootReducer';
import { URL } from '../const/const';

const loadItemsAction = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(itemsLoading());
    const response = await fetch(URL);
    const data: Items = await response.json();
    dispatch(itemsLoadingSuccess(data));
  } catch (err) {
    dispatch(itemsLoadingError(`Error ${err}`));
  }
};

export default loadItemsAction;

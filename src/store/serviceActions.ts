import { ResponseData } from '../types/data';
import { itemsLoading, itemsLoadingError, itemsLoadingSuccess } from './reducers/itemState';
import { AppDispatch } from './rootReducer';
import { URL } from '../const/const';

const loadItemsAction = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(itemsLoading());
    const response = await fetch(URL);
    const data: ResponseData = await response.json();
    data.products = data.products.filter((product) => product.images.length >= 2);
    dispatch(itemsLoadingSuccess(data.products));
  } catch (err) {
    dispatch(itemsLoadingError(`Error: ${err}`));
  }
};

export default loadItemsAction;

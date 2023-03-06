import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { KEY_LOCALE_STORAGE } from '../const/const';
import {
  addCartItem,
  removeCartItem,
  dropCartItem,
  clearCart,
  addPromoCode,
  removePromoCode,
} from './reducers/cartState';
import type { RootState } from './rootReducer';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: isAnyOf(
    addCartItem,
    removeCartItem,
    dropCartItem,
    clearCart,
    addPromoCode,
    removePromoCode,
  ),
  effect: (_, listenerApi) =>
    localStorage.setItem(
      KEY_LOCALE_STORAGE,
      JSON.stringify((listenerApi.getState() as RootState).CART),
    ),
});

export default listenerMiddleware;

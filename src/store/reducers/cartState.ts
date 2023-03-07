import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NameSpace, KEY_LOCALE_STORAGE } from '../../const/const';
import { Item, PromoCodes } from '../../types/data';
import { CartState } from '../../types/state';

const localCartState: CartState = JSON.parse(localStorage.getItem(KEY_LOCALE_STORAGE) || 'null');

export const initialState: CartState = {
  cartItemQuantity: localCartState ? localCartState.cartItemQuantity : 0,
  totalPrice: localCartState ? localCartState.totalPrice : 0,
  cartItems: localCartState ? localCartState.cartItems : [],
  promoCodes: localCartState ? localCartState.promoCodes : [],
  totalDiscount: localCartState ? localCartState.totalDiscount : 0,
  discountedTotalPrice: localCartState ? localCartState.discountedTotalPrice : 0,
};

export const cartStateSlice = createSlice({
  name: NameSpace.cart,
  initialState,
  reducers: {
    addCartItem(state, action: PayloadAction<Item>) {
      const newItem = action.payload;
      const cartItem = state.cartItems.find((item) => item.id === newItem.id);
      if (cartItem) {
        state.cartItems = state.cartItems.map((item) =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      } else {
        state.cartItems = [...state.cartItems, { ...newItem, quantity: 1 }];
      }
      state.cartItemQuantity = state.cartItems.reduce((sum, item) => sum + item.quantity, 0);
      state.totalPrice = state.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      state.discountedTotalPrice = Math.floor(state.totalPrice * (1 - state.totalDiscount));
    },
    removeCartItem(state, action: PayloadAction<number>) {
      const id = action.payload;
      if (state.cartItems.find((item) => item.id === id)?.quantity === 1) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
      } else {
        state.cartItems = state.cartItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        );
      }
      state.cartItemQuantity = state.cartItems.reduce((sum, item) => sum + item.quantity, 0);
      state.totalPrice = state.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      state.discountedTotalPrice = Math.floor(state.totalPrice * (1 - state.totalDiscount));
    },
    dropCartItem(state, action: PayloadAction<number>) {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
      state.cartItemQuantity = state.cartItems.reduce((sum, item) => sum + item.quantity, 0);
      state.totalPrice = state.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      state.discountedTotalPrice = Math.floor(state.totalPrice * (1 - state.totalDiscount));
    },
    clearCart(state) {
      state.cartItems = [];
      state.cartItemQuantity = 0;
      state.totalPrice = 0;
      state.promoCodes = [];
      state.totalDiscount = 0;
      state.discountedTotalPrice = 0;
    },
    addPromoCode(state, action: PayloadAction<PromoCodes>) {
      if (!state.promoCodes.find((promoCode) => promoCode.name === action.payload.name)) {
        state.promoCodes = [...state.promoCodes, action.payload];
        const sumDiscount = parseFloat(
          state.promoCodes.reduce((sum, promoCode) => sum + promoCode.discount, 0).toFixed(2),
        );
        state.totalDiscount = sumDiscount > 1 ? 1 : sumDiscount;
        state.discountedTotalPrice = Math.floor(state.totalPrice * (1 - state.totalDiscount));
      }
    },
    removePromoCode(state, action: PayloadAction<string>) {
      state.promoCodes = state.promoCodes.filter((promoCode) => promoCode.name !== action.payload);
      const sumDiscount = parseFloat(
        state.promoCodes.reduce((sum, promoCode) => sum + promoCode.discount, 0).toFixed(2),
      );
      state.totalDiscount = sumDiscount > 1 ? 1 : sumDiscount;
      state.discountedTotalPrice = Math.floor(state.totalPrice * (1 - state.totalDiscount));
    },
  },
});

export const {
  addCartItem,
  removeCartItem,
  dropCartItem,
  clearCart,
  addPromoCode,
  removePromoCode,
} = cartStateSlice.actions;
export const cartState = cartStateSlice.reducer;

import { Items, CartItems, PromoCodes } from './data';

type CartState = {
  cartItemQuantity: number;
  totalPrice: number;
  cartItems: CartItems;
  promoCodes: Array<PromoCodes>;
  totalDiscount: number;
  discountedTotalPrice: number;
};

type ItemState = {
  items: Items;
  categories: string[];
  brands: string[];
  prices: number[];
  stocks: number[];
  isLoading: boolean;
  error: string;
};

type ModalState = {
  isOpen: boolean;
};

type FilterState = {
  id: string;
  name: string;
  isActive: boolean;
}[];

export type { CartState, ItemState, ModalState, FilterState };

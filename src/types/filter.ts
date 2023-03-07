import { Items } from './data';

export interface IFilterItems {
  items: Items;
  categoryValues: string;
  brandValues: string;
  prices: number[];
  priceValues: string;
  stocks: number[];
  stockValues: string;
  searchValue: string;
}

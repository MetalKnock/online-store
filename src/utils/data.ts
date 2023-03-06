import { Items } from '../types/data';

export const getCategories = (items: Items) => [
  ...new Set(items.map((item) => item.category.toLowerCase())),
];
export const getBrands = (items: Items) => [
  ...new Set(items.map((item) => item.brand.toLowerCase())),
];

export const getPrices = (items: Items) =>
  [...new Set(items.map((item) => item.price))].sort((a, b) => a - b);

export const getStocks = (items: Items) =>
  [...new Set(items.map((item) => item.stock))].sort((a, b) => a - b);

import { Items } from '../types/data';

const getCategories = (items: Items) => [
  ...new Set(items.map((item) => item.category.toLowerCase())),
];
const getBrands = (items: Items) => [...new Set(items.map((item) => item.brand.toLowerCase()))];

const getPrices = (items: Items) =>
  [...new Set(items.map((item) => item.price))].sort((a, b) => a - b);

const getStocks = (items: Items) =>
  [...new Set(items.map((item) => item.stock))].sort((a, b) => a - b);

export { getCategories, getBrands, getPrices, getStocks };

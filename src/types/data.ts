interface Item {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: Array<string>;
}

type CartItem = Item & {
  quantity: number;
};

type Items = Item[];

type CartItems = CartItem[];

interface ResponseData {
  limit: number;
  products: Items;
  skip: number;
  total: number;
}

type FilterData = {
  allItems: number;
  availableItems: number;
  id: string;
  name: string;
  isActive: boolean;
}[];

type StateDualSliderData = {
  minValue: number;
  maxValue: number;
  minDataValue: number;
  maxDataValue: number;
  max: number;
};

type DualSliderData = StateDualSliderData & {
  onInput: (minValue: number, maxValue: number) => void;
};

interface PromoCodes {
  name: string;
  discount: number;
  fullName: string;
}

export type {
  Item,
  CartItem,
  Items,
  CartItems,
  ResponseData,
  FilterData,
  StateDualSliderData,
  DualSliderData,
  PromoCodes,
};

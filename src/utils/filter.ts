import { SortOptionValues, QUERY_PARAM_DELIMITER, SliderType, FilterType } from '../const/const';
import { FilterData, Item, Items } from '../types/data';
import { IFilterItems } from '../types/filter';

const getSortedItems = (sortValue: SortOptionValues, items: Items) => {
  switch (sortValue) {
    case SortOptionValues.priceASC:
      return items.sort((a, b) => a.price - b.price);
    case SortOptionValues.priceDESC:
      return items.sort((a, b) => b.price - a.price);
    case SortOptionValues.ratingASC:
      return items.sort((a, b) => a.rating - b.rating);
    case SortOptionValues.ratingDESC:
      return items.sort((a, b) => b.rating - a.rating);
    default:
      return items;
  }
};

const findItems = (items: Items, searchValue: string) => {
  if (searchValue === '') return items;

  return items.filter(
    (item) =>
      item.category.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.description.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.price.toString() === searchValue ||
      item.stock.toString() === searchValue ||
      item.discountPercentage.toString() === searchValue,
  );
};

const filterItemsBySelectList = (
  items: Items,
  filterString: string,
  filterType: FilterType.category | FilterType.brand,
): Items => {
  if (filterString === '') return items;
  const activeNames = filterString.split(QUERY_PARAM_DELIMITER);
  return items.filter((item) =>
    activeNames.some((activeName) => activeName === item[filterType].toLowerCase()),
  );
};

const getSelectListData = (
  items: Items,
  filteredItems: Items,
  allSelectListData: string[],
  filterString: string,
  filterType: 'category' | 'brand',
): FilterData => {
  const activeFilters = filterString.split(QUERY_PARAM_DELIMITER);

  return allSelectListData.map((name, idx) => ({
    id: `${name}_${idx}`,
    name,
    isActive: activeFilters.some((activeFilter) => activeFilter === name),
    allItems: items.filter((item) => name === item[filterType].toLowerCase()).length,
    availableItems: filteredItems.filter(
      (filteredItem) => name === filteredItem[filterType].toLowerCase(),
    ).length,
  }));
};

const getDualSliderMinIndex = (allSliderData: number[], queryString: string) => {
  const value = queryString.split(QUERY_PARAM_DELIMITER)[0];
  if (Number.isNaN(value)) return 0;
  return allSliderData.findIndex((SliderData) => SliderData >= +value);
};

const getDualSliderMaxIndex = (allSliderData: number[], queryString: string) => {
  const value = +queryString.split(QUERY_PARAM_DELIMITER)[1];
  if (Number.isNaN(value)) return allSliderData.length > 0 ? allSliderData.length - 1 : 0;
  const dataValue = [...allSliderData].reverse().find((sliderData) => sliderData <= value);
  if (dataValue === undefined) return -1;
  return allSliderData.findIndex((sliderData) => sliderData === dataValue);
};

const getDualSliderData = (allSliderData: number[], queryString: string) => {
  const minValue = getDualSliderMinIndex(allSliderData, queryString);
  const maxValue = getDualSliderMaxIndex(allSliderData, queryString);

  const minDataValue = allSliderData[minValue];
  const maxDataValue = allSliderData[maxValue];

  return {
    minValue,
    maxValue,
    minDataValue,
    maxDataValue,
    max: allSliderData.length > 0 ? allSliderData.length - 1 : 0,
  };
};

const getDualSliderDataAfterFiltering = (
  allSliderData: number[],
  filteredItems: Items,
  filterType: SliderType.price | SliderType.stock,
) => {
  if (filteredItems.length === 0) {
    return {
      minValue: 0,
      maxValue: allSliderData.length - 1,
      minDataValue: NaN,
      maxDataValue: NaN,
      max: allSliderData.length - 1,
    };
  }

  const sortedItems = [...filteredItems].sort(
    (a: Item, b: Item) => (a[filterType] as number) - (b[filterType] as number),
  );

  const minValue = allSliderData.findIndex((item) => item === sortedItems[0][filterType]);
  const maxValue = allSliderData.findIndex(
    (item) => item === sortedItems[sortedItems.length - 1][filterType],
  );

  const minDataValue = allSliderData[minValue];
  const maxDataValue = allSliderData[maxValue];

  return {
    minValue,
    maxValue,
    minDataValue,
    maxDataValue,
    max: allSliderData.length > 0 ? allSliderData.length - 1 : 0,
  };
};

const filterItemsByDualSlider = (
  items: Items,
  allSliderData: number[],
  queryString: string,
  sliderType: SliderType.price | SliderType.stock,
) => {
  const minValue = getDualSliderMinIndex(allSliderData, queryString);
  const maxValue = getDualSliderMaxIndex(allSliderData, queryString);

  return items.filter(
    (item) =>
      item[sliderType] >= allSliderData[minValue] && item[sliderType] <= allSliderData[maxValue],
  );
};

const filterItems = ({
  items,
  categoryValues,
  brandValues,
  prices,
  priceValues,
  stocks,
  stockValues,
  searchValue,
}: IFilterItems) => {
  const itemsFilteredByCategories: Items = filterItemsBySelectList(
    items,
    categoryValues,
    FilterType.category,
  );

  const itemsFilteredByBrands: Items = filterItemsBySelectList(
    itemsFilteredByCategories,
    brandValues,
    FilterType.brand,
  );

  const itemsFilteredByPrice = filterItemsByDualSlider(
    itemsFilteredByBrands,
    prices,
    priceValues,
    SliderType.price,
  );

  const itemsFilteredByStock = filterItemsByDualSlider(
    itemsFilteredByPrice,
    stocks,
    stockValues,
    SliderType.price,
  );

  return findItems(itemsFilteredByStock, searchValue);
};

export {
  getSortedItems,
  findItems,
  filterItemsBySelectList,
  getSelectListData,
  getDualSliderData,
  getDualSliderDataAfterFiltering,
  filterItemsByDualSlider,
  filterItems,
};

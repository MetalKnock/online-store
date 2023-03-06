import { IImagesWithSize } from '../types/imageSlider';

const getPriceWithoutDiscount = (price: number, discount: number): number =>
  Math.ceil((price * 100) / (100 - discount));

const debounce = (fn: (value: string) => void, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;

  return (value: string) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(value), delay);
  };
};

const getSearchParams = () => Object.fromEntries(new URLSearchParams(window.location.search));

const getLastNDigits = (val: number, n: number) => Number(String(val).slice(-n));

const getNumberFirstNChars = (str: string, n: number) => Number(str.slice(0, n));

const getImagesWithoutDuplicate = (imagesWithSize: IImagesWithSize[]) =>
  imagesWithSize.filter(
    (imageWithSize, i) => i === imagesWithSize.findIndex((val) => val.size === imageWithSize.size),
  );

export {
  getPriceWithoutDiscount,
  debounce,
  getSearchParams,
  getLastNDigits,
  getNumberFirstNChars,
  getImagesWithoutDuplicate,
};

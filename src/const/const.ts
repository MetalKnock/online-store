import { IValidationErrors } from '../types/customInput';
import { PromoCodes } from '../types/data';

enum NameSpace {
  cart = 'CART',
  items = 'ITEMS',
  modal = 'MODAL',
}

enum LoadingStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
}

enum CardView {
  simple = 'SIMPLE',
  tile = 'TILE',
}

enum SortOptionValues {
  sortTitle = 'sort-title',
  priceASC = 'price-asc',
  priceDESC = 'price-desc',
  ratingASC = 'rating-asc',
  ratingDESC = 'rating-desc',
}

enum ValidationKeys {
  fullNameError = 'fullNameError',
  numberPhoneError = 'numberPhoneError',
  deliveryAddressError = 'deliveryAddressError',
  emailError = 'emailError',
  cardNumberError = 'cardNumberError',
  expiryDateError = 'expiryDateError',
  cvvError = 'cvvError',
}

enum PaymentSystems {
  americanExpress = 'American Express',
  visa = 'Visa',
  mastercard = 'Mastercard',
  default = 'Default',
}

enum QueryParams {
  view = 'view',
  sort = 'sort',
  search = 'search',
  category = 'category',
  brand = 'brand',
  price = 'price',
  stock = 'stock',
}

const ListPromoCodes: PromoCodes[] = [
  { name: 'RS', discount: 0.1, fullName: 'Rolling Scopes School' },
  { name: 'EPM', discount: 0.15, fullName: 'EPAM Systems' },
];

const validationErrors: IValidationErrors = {
  fullNameError: 'The field contains at least two words, each at least 3 characters long.',
  numberPhoneError:
    'The field must start with +, contain only numbers, and be at least 9 characters long.',
  deliveryAddressError: 'The field contains at least three words, each at least 5 characters long.',
  emailError: 'The text entered is not an email.',
  cardNumberError: 'The number of digits entered must be exactly 16.',
  expiryDateError:
    'The field length must be 4. Maximum month 12. Date cannot be less than current date.',
  cvvError: 'The field length must be 3.',
};

const API_URL = 'https://dummyjson.com/products?limit=100';

const KEY_LOCALE_STORAGE = 'online-store-metalknock-rz0r';

const QUERY_PARAM_DELIMITER = '↕';

export {
  NameSpace,
  LoadingStatus,
  CardView,
  SortOptionValues,
  ValidationKeys,
  PaymentSystems,
  QueryParams,
  ListPromoCodes,
  validationErrors,
  API_URL,
  KEY_LOCALE_STORAGE,
  QUERY_PARAM_DELIMITER,
};

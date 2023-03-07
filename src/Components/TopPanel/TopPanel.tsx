import React from 'react';
import ViewSwitch from './ViewSwitch';
import SearchBar from './SearchBar';
import SortOptions from './SortOptions';
import { CardView, SortOptionValues } from '../../const/const';
import styles from './TopPanel.module.scss';
import FiltersIcon from '../Loader/filtersIcon';

type TopPanelProps = {
  itemQuantity: number;
  cardView: CardView;
  onViewSwitchChange: (viewMode: CardView) => void;
  sortValue: SortOptionValues;
  onSortValueChange: (value: SortOptionValues) => void;
  searchValue: string;
  onSearchValueChange: (value: string) => void;
  setIsOpenBurgerMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

function TopPanel({
  itemQuantity,
  cardView,
  onViewSwitchChange,
  sortValue,
  onSortValueChange,
  searchValue,
  onSearchValueChange,
  setIsOpenBurgerMenu,
}: TopPanelProps) {
  const handleClick = () => {
    setIsOpenBurgerMenu(true);
  };

  return (
    <div className={styles.topPanel}>
      <FiltersIcon className={styles.topPanel__filtersIcon} handleClick={handleClick} />
      <SortOptions sortValue={sortValue} onSortValueChange={onSortValueChange} />
      <div>Found: {itemQuantity}</div>
      <SearchBar defaultValue={searchValue} onSearchValueChange={onSearchValueChange} />
      <ViewSwitch cardView={cardView} onViewSwitchChange={onViewSwitchChange} />
    </div>
  );
}

export default TopPanel;

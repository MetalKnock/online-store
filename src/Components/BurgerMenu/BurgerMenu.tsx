import React from 'react';
import { DualSliderData, FilterData } from '../../types/data';
import Filters from '../Filters';
import Close from '../Loader/close';
import styles from './BurgerMenu.module.scss';

type BurgerMenuProps = {
  categoryState: FilterData;
  onCategoryFilterChange: (filterName: string, isActive: boolean) => void;
  brandState: FilterData;
  onBrandFilterChange: (filterName: string, isActive: boolean) => void;
  priceState: DualSliderData;
  stockState: DualSliderData;
  onResetBtnClick: () => void;
  isOpenBurgerMenu: boolean;
  setIsOpenBurgerMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function BurgerMenu({
  categoryState,
  onCategoryFilterChange,
  brandState,
  onBrandFilterChange,
  priceState,
  stockState,
  onResetBtnClick,
  isOpenBurgerMenu,
  setIsOpenBurgerMenu,
}: BurgerMenuProps) {
  const handleClick = () => {
    setIsOpenBurgerMenu(false);
  };

  return (
    <>
      <div className={`${styles.burgerMenu} ${isOpenBurgerMenu ? styles.burgerMenu_open : ''}`}>
        <Close className={styles.burgerMenu__close} handleClick={handleClick} />
        <Filters
          categoryState={categoryState}
          onCategoryFilterChange={onCategoryFilterChange}
          brandState={brandState}
          onBrandFilterChange={onBrandFilterChange}
          priceState={priceState}
          stockState={stockState}
          onResetBtnClick={onResetBtnClick}
        />
      </div>
      {isOpenBurgerMenu && (
        <button type="button" className={styles.burgerMenu__background} onClick={handleClick}>
          {}
        </button>
      )}
    </>
  );
}

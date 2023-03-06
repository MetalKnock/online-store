import React, { useState, useEffect } from 'react';
import { ListPromoCodes } from '../../const/const';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addPromoCode, removePromoCode } from '../../store/reducers/cartState';
import Close from '../Loader/close';
import styles from './PromoCodes.module.scss';

export default function PromoCodes() {
  const { promoCodes } = useAppSelector((state) => state.CART);
  const dispatch = useAppDispatch();
  const [promo, setPromo] = useState('');
  const [isValidPromo, setIsValidPromo] = useState(false);
  const [indexCurrentPromoCode, setIndexCurrentPromoCode] = useState(-1);
  const [showError, setShowError] = useState(false);

  const handleChangePromo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromo(e.target.value);
    setShowError(false);
  };

  const handleClickApplyPromo = () => {
    if (isValidPromo) {
      dispatch(addPromoCode(ListPromoCodes[indexCurrentPromoCode]));
      setPromo('');
    } else {
      setShowError(true);
    }
  };

  useEffect(() => {
    setIndexCurrentPromoCode(ListPromoCodes.findIndex((promoCode) => promoCode.name === promo));
  }, [promo]);

  useEffect(() => {
    if (indexCurrentPromoCode !== -1) {
      setIsValidPromo(true);
    } else {
      setIsValidPromo(false);
    }
  }, [indexCurrentPromoCode]);

  return (
    <>
      <div className={styles.promoCode}>
        <h6 className={styles.promoCode__title}>
          Promo code:
          <span className={styles.promoCode__test}>RS, EPM</span>
        </h6>
        <div className={styles.promoCode__inner}>
          <input
            className={styles.promoCode__input}
            type="text"
            placeholder="Enter promo code"
            value={promo}
            onChange={handleChangePromo}
          />
          <button
            className={`${styles.promoCode__apply} ${
              isValidPromo && styles.promoCode__applyActive
            }`}
            type="button"
            onClick={handleClickApplyPromo}
          >
            <span className={styles.promoCode__applyText}>Apply</span>
          </button>
          {!isValidPromo && showError && (
            <div className={styles.promoCode__error}>Invalid promo code</div>
          )}
        </div>
      </div>
      <ul className={styles.promoCodeList}>
        {promoCodes.map((promoCode) => (
          <li className={styles.promoCodeItem} key={promoCode.name}>
            <div className={styles.promoCodeItem__name}>{promoCode.fullName}</div>
            <div className={styles.promoCodeItem__discount}>{promoCode.discount * 100}%</div>
            <button
              type="button"
              className={styles.promoCodeItem__close}
              onClick={() => dispatch(removePromoCode(promoCode.name))}
            >
              <Close className={styles.promoCodeItem__closeIcon} />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

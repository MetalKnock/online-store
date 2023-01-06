import { getPriceWithoutDiscount } from '../../utils/common';
import { Item } from '../../types/data';
import styles from './SimpleCard.module.scss';

type SimpleCardProps = {
  item: Item;
  isItemInCart: boolean;
  onBuyButtonClick: () => void;
};

function SimpleCard({ item, isItemInCart, onBuyButtonClick }: SimpleCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.card__image}>
        <img src={item.thumbnail} alt={item.title} />
      </div>
      <div className={styles.card__descriptionBlock}>
        <h3 className={styles.card__title}>{item.title}</h3>
        <p className={styles.card__category}>
          <span className={styles.card__subtitle}>Category:</span> {item.category}
        </p>
        <p className={styles.card__brand}>
          <span className={styles.card__subtitle}>Brand:</span> {item.brand}
        </p>
        <p className={styles.card__stock}>
          <span className={styles.card__subtitle}>Stock:</span> {item.stock}
        </p>
        <div className={styles.card__stock}>
          <span className={styles.card__subtitle}>Raiting:</span> {item.rating}
        </div>
      </div>
      <div className={styles.card__priceBlock}>
        <div className={styles.card__discount}>
          €{getPriceWithoutDiscount(item.price, item.discountPercentage)}
        </div>
        <div className={styles.card__price}>€{item.price}</div>
        <button
          className={`${isItemInCart ? styles.card__buyBtn_active : styles.card__buyBtn}`}
          type="button"
          onClick={onBuyButtonClick}
        >
          {isItemInCart ? 'Drop' : 'Buy'}
        </button>
      </div>
    </div>
  );
}

export default SimpleCard;
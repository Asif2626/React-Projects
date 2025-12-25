import Flag from "react-world-flags";
import styles from "./CountryItem.module.css";

const formatDate = (date) =>
  date
    ? new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(date))
    : "";

function CountryItem({ country, onDelete }) {
  const { cityName, code, date } = country;

  return (
    <li className={styles.countryItem}>
      {code && (
        <Flag code={code} style={{ width: 32, height: 24, marginRight: 8 }} />
      )}
      <h3 className={styles.cityName}>{cityName}</h3>
      <time className={styles.date}>{formatDate(date)}</time>
      {onDelete && (
        <button
          className={styles.deleteBtn}
          onClick={() => onDelete(country.id)}
        >
          &times;
        </button>
      )}
    </li>
  );
}

export default CountryItem;

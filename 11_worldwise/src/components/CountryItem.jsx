import styles from "./CountryItem.module.css";
import Flag from "react-world-flags";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CountryItem({ country }) {
  const { cityName, code, date } = country; // use `code` instead of emoji

  return (
    <li className={styles.countryItem}>
      {code && (
        <Flag
          code={code}
          style={{ width: 32, height: 24, marginRight: "8px" }}
        />
      )}
      <h3 className={styles.cityName}>{cityName}</h3>
      <time className={styles.date}>{formatDate(date)}</time>
      <button className={styles.deleteBtn}> &times; </button>
    </li>
  );
}

export default CountryItem;

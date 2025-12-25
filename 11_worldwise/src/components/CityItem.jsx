import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../contexts/CitiesContext";

import Flag from "react-world-flags";

const formatDate = (date) =>
  date
    ? new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(date))
    : "";
const CityItem = ({ city }) => {
  // const CityItem = ({ city, onDelete }) => {
  const { currentCity } = useCities();
  const { cityName, code, date, id, position } = city;

  if (!position) return null;

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          currentCity?.id === id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        {code && (
          <Flag code={code} style={{ width: 32, height: 24, marginRight: 8 }} />
        )}
        <h3 className={styles.cityName}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button
          className={styles.deleteBtn}
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          &times;
        </button>
        {/* {onDelete && (
          <button
            className={styles.deleteBtn}
            onClick={(e) => {
              e.preventDefault();
              onDelete(id);
            }}
          >
            &times;
          </button>
        )} */}
      </Link>
    </li>
  );
};

export default CityItem;

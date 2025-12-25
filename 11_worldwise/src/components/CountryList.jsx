import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";
import styles from "./CountryList.module.css";
import { useCities } from "../contexts/CitiesContext";

const CountryList = () => {
  const { cities, isLoading, deleteCity } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length) {
    return (
      <Message message="Add your first country by clicking on a country on the map" />
    );
  }

  // Get unique countries
  const countries = cities.reduce((arr, city) => {
    if (!arr.some((el) => el.country === city.country)) {
      arr.push(city);
    }
    return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.id} country={country} onDelete={deleteCity} />
      ))}
    </ul>
  );
};

export default CountryList;

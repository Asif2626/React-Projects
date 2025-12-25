import { useEffect, useState } from "react";
import useUrlPosition from "../hooks/useUrlPosition";
import Flag from "react-world-flags";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/CitiesContext";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [lat, lng] = useUrlPosition();
  const { createCity } = useCities();
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [code, setCode] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [geoCodingError, setGeoCodingError] = useState("");

  useEffect(() => {
    if (!lat || !lng) return;

    const fetchCityData = async () => {
      try {
        setIsLoadingGeocoding(true);
        setGeoCodingError("");

        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();

        if (!data.code) {
          throw new Error(
            "That doesn't seem to be a city. Click somewhere else 🤔"
          );
        }

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setCode(data.code);
      } catch (err) {
        setGeoCodingError(err.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    };

    fetchCityData();
  }, [lat, lng]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cityName || !date) return;

    createCity({
      cityName,
      country,
      code,
      date,
      notes,
      position: { lat, lng },
    });
  };

  if (isLoadingGeocoding) return <Spinner />;
  if (!lat && !lng)
    return <Message message="Start by clicking somewhere on the map" />;
  if (geoCodingError) return <Message message={geoCodingError} />;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
        {code && (
          <Flag code={code} style={{ width: 32, height: 24, marginLeft: 8 }} />
        )}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          selected={date || new Date()}
          onChange={(d) => setDate(d)}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary" disabled={!cityName || !date}>
          Add
        </Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;

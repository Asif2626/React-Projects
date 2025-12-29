import { useEffect, useState } from "react";
import useUrlPosition from "../hooks/useUrlPosition";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Flag from "react-world-flags";
import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [lat, lng] = useUrlPosition();
  const { createCity, isLoading } = useCities();
  const navigate = useNavigate();

  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [code, setCode] = useState(""); // ISO 2-letter code
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [geoCodingError, setGeoCodingError] = useState("");

  useEffect(() => {
    if (!lat || !lng) return;

    async function fetchCityData() {
      try {
        setIsLoadingGeocoding(true);
        setGeoCodingError("");
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();

        if (!data.city && !data.locality) {
          throw new Error(
            "That doesn't seem to be a city. Click somewhere else 🤔"
          );
        }

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setCode(data.countryCode);
      } catch (err) {
        setGeoCodingError(err.message);
        console.log(err);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }

    fetchCityData();
  }, [lat, lng]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      code,
      date,
      notes,
      position: { lat, lng },
    };

    await createCity(newCity);
    navigate("/app/cities");
  };

  if (isLoadingGeocoding) return <Spinner />;
  if (!lat && !lng)
    return <Message message="Start by clicking somewhere on the map" />;
  if (geoCodingError) return <Message message={geoCodingError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            id="cityName"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            style={{ flexGrow: 1 }}
          />
          {code && (
            <Flag
              code={code}
              style={{ width: 32, height: 24, marginLeft: 8 }}
            />
          )}
        </div>
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

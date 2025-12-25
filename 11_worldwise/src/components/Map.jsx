import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import Flag from "react-world-flags";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../Hooks/useGeoLocation";
import Button from "./Button";
import styles from "./Map.module.css";
import useUrlPosition from "../hooks/useUrlPosition";

const Map = () => {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();
  const [lat, lng] = useUrlPosition();

  useEffect(() => {
    if (lat && lng) {
      setMapPosition([lat, lng]);
    }
  }, [lat, lng]);

  useEffect(() => {
    if (geoLocationPosition) {
      setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
    }
  }, [geoLocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use Your Position"}
        </Button>
      )}

      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {/* {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              {city.code && (
                <Flag
                  code={city.code}
                  style={{ width: 32, height: 24, marginRight: "8px" }}
                />
              )}
              <span>
                {city.cityName}, {city.country}
              </span>
              {city.notes && (
                <div style={{ fontStyle: "italic", marginTop: "4px" }}>
                  {city.notes}
                </div>
              )}
            </Popup>
          </Marker>
        ))} */}

        {cities
          .filter((city) => city.position?.lat && city.position?.lng)
          .map((city) => (
            <Marker
              key={city.id}
              position={[city.position.lat, city.position.lng]}
            >
              <Popup>
                {city.code && (
                  <Flag
                    code={city.code}
                    style={{ width: 32, height: 24, marginRight: "8px" }}
                  />
                )}
                <span>
                  {city.cityName}, {city.country}
                </span>
                {city.notes && (
                  <div style={{ fontStyle: "italic", marginTop: "4px" }}>
                    {city.notes}
                  </div>
                )}
              </Popup>
            </Marker>
          ))}

        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
};

// Center the map when position changes
function ChangeCenter({ position }) {
  const map = useMap();
  useEffect(() => {
    map.setView(position);
  }, [position, map]);
  return null;
}

// Detect map click and navigate to form with lat/lng in URL
function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
  return null;
}

export default Map;

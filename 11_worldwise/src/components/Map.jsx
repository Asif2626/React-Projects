import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useCities } from "../contexts/CitiesContext";
import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import Flag from "react-world-flags";
import { useNavigate } from "react-router-dom";
import { useGeolocation } from "../Hooks/useGeoLocation";
import Button from "./Button";
import useUrlPosition from "../hooks/useUrlPosition";

function Map() {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();
  const [mapLat, mapLng] = useUrlPosition();

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geolocationPosition) {
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    }
  }, [geolocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
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
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map(
          (city) =>
            city.position && (
              <Marker
                key={city.id}
                position={[city.position.lat, city.position.lng]}
              >
                <Popup>
                  <span>
                    <Flag code={city.code}   style={{ width: 32, height: 24 }} />
                  </span>
                  {city.cityName}
                </Popup>
              </Marker>
            )
        )}

        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

//  Sync React state → Leaflet map (external system)
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  // useEffect(() => {
  //   map.setView(position);
  // }, [map, position]);

  return null;
}

// Navigate to form on map click
function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    // click: (e) => {
    //   e.preventDefault();
    //   navigate(`form`);
    // },
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });

  return null;
}

export default Map;

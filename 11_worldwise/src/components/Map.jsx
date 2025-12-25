import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect } from "react";
// import { useEffect, useState } from "react";
import Flag from "react-world-flags";

import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../Hooks/useGeoLocation";
import useUrlPosition from "../hooks/useUrlPosition";

import Button from "./Button";
import styles from "./Map.module.css";

function Map() {
  // const navigate = useNavigate();
  // const [mapPosition, setMapPosition] = useState([40, 0]);
  const { cities } = useCities();
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();
  const [lat, lng] = useUrlPosition();

  //  Derived map position (NO state, NO effects)
  const mapPosition =
    // lat != null && lng != null
    lat && lng
      ? [lat, lng]
      : geoLocationPosition?.lat && geoLocationPosition?.lng
      ? // : geoLocationPosition?.lat != null && geoLocationPosition?.lng != null
        [geoLocationPosition.lat, geoLocationPosition.lng]
      : [40, 0];

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
        scrollWheelZoom
        className={styles.map}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {cities
          .filter(
            (city) => city.position?.lat && city.position?.lng
            // (city) => city.position?.lat != null && city.position?.lng != null
          )
          .map((city) => (
            <Marker
              key={city.id}
              position={[city.position.lat, city.position.lng]}
            >
              <Popup>
                {city.countryCode && (
                  <Flag
                    code={city.countryCode}
                    style={{
                      width: 32,
                      height: 24,
                      marginRight: "8px",
                    }}
                  />
                )}
                <span>
                  {city.cityName}, {city.country}
                </span>

                {city.notes && (
                  <div style={{ fontStyle: "italic", marginTop: 4 }}>
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
}

//  Sync React state → Leaflet map (external system)
function ChangeCenter({ position }) {
  const map = useMap();

  useEffect(() => {
    map.setView(position);
  }, [map, position]);

  return null;
}

// Navigate to form on map click
function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => {
      e.preventDefault();
      navigate(`form`);
    },
    // click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });

  return null;
}

export default Map;

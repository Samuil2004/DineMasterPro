import React, { useEffect, useState, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function Map({
  street,
  city,
  country,
  adressIsValid,
  mapIsRendered,
  setMapIsRendered,
}) {
  const [mapInstance, setMapInstance] = useState();
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const createMap = (latitude, longitude) => {
    try {
      const zoom = 18;
      const map = L.map("map", {
        center: [latitude, longitude],
        zoom,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap DineMaster",
      }).addTo(map);

      L.marker([latitude, longitude]).addTo(map);

      setMapInstance(map);
      mapInstanceRef.current = map;
      setMapIsRendered(true);
    } catch (error) {}
  };

  useEffect(() => {
    if (adressIsValid) {
      fetchCoordinates().then((coordinates) => {
        createMap(coordinates.lat, coordinates.lon);
      });
    }
  }, [adressIsValid]);

  const fetchCoordinates = () => {
    try {
      const addressString = `${street}, ${city}, ${country}`;
      return fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          addressString
        )}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          if (data && data.length > 0) {
            const { lat, lon } = data[0];
            return { lat: parseFloat(lat), lon: parseFloat(lon) };
          }
          throw new Error("No results found");
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {}
  };

  return <div id="map" className="h-full w-full rounded-lg shadow-lg z-10" />;
}

export default Map;

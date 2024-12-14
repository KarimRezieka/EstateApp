import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./map.scss";
import "leaflet/dist/leaflet.css";
import Pin from "../pin/Pin";

function Map({ items }) {
  console.log("Items:", items); // Inspect items

  // Ensure items is an array
  if (!Array.isArray(items) || items.length === 0) {
    return <p>No data available to show on the map.</p>;
  }

  return (
    <MapContainer
      center={
        items.length === 1
          ? [items[0].latitude, items[0].longitude]
          : [52.4797, -1.90269] // Default coordinates
      }
      zoom={7}
      scrollWheelZoom={false}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items.map((item) => (
        <Marker
          position={[item.latitude, item.longitude]}
          key={item.id}
        >
          <Popup>{item.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;

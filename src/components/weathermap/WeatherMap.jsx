import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import style from './WeatherMap.module.css'
import RecenterMap from './RecentMap';

export default function WeatherMap({ lat, lon }) {
  if (!lat || !lon) return null;

  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});
  return (
    <MapContainer center={[lat, lon]} zoom={10} style={{ height: '100%', width: '100%' }} className={style.map}>
      <RecenterMap lat={lat} lon={lon}/>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lon]}>
        <Popup>
          Weather location: {lat}, {lon}
        </Popup>
      </Marker>
    </MapContainer>
  );
}

import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const customIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', 
    iconSize: [30, 30], 
    iconAnchor: [15, 30], 
});

const ClickableMap = ({ setQuery }) => {
    const [position, setPosition] = useState(null);

    const LocationHandler = () => {
        useMapEvents({
            click: (event) => {
                const { lat, lng } = event.latlng;
                setPosition({ lat, lng });
                //console.log("Clicked location:", { lat, lng });
                setQuery({ lat, lon: lng }); 
            },
        });
        return null;
    };

    return (
        <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            style={{ height: "500px", width: "100%" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {position && (
                <Marker position={[position.lat, position.lng]} icon={customIcon}>
                    <Popup>
                        Latitude: {position.lat}, Longitude: {position.lng}
                    </Popup>
                </Marker>
            )}
            <LocationHandler />
        </MapContainer>
    );
};

export default ClickableMap;

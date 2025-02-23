import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import Modal from 'react-modal';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './MapModal.css'; // Ajoute un fichier CSS pour styliser
import { FaMapMarkedAlt } from "react-icons/fa";

const customIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
});

Modal.setAppElement('#root'); // Nécessaire pour l'accessibilité avec react-modal

const ClickableMap = ({ setQuery }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState(null);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const LocationHandler = () => {
        useMapEvents({
            click: (event) => {
                const { lat, lng } = event.latlng;
                setPosition({ lat, lng });
                console.log("Selected location:", { lat, lng });
                setQuery({ lat, lon: lng });
                closeModal(); // Ferme la popup après sélection
            },
        });
        return null;
    };

    return (
        <>
         <FaMapMarkedAlt
                  size={25}
                  className=" text-white cursor-pointer transition ease-out hover:scale-125"
                    onClick={openModal}
                />
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                contentLabel="Select Location"
                className="modal"
                overlayClassName="overlay"
            >
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
                <button className="close-button" onClick={closeModal}>Close</button>
            </Modal>
        </>
    );
};

export default ClickableMap;

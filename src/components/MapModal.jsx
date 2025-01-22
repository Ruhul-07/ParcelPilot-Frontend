import React from "react";
import { Modal, Button } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useState } from "react";

const MapModal = ({ show, handleClose, latitude, longitude }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>See Location</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Map Container */}
        <MapContainer
          center={[latitude, longitude]} // Center of the map
          zoom={13}
          style={{ height: "400px", width: "100%" }}
        >
          {/* Tile Layer (Map background) */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* Marker and Popup */}
          <Marker position={[latitude, longitude]} icon={new L.Icon({ iconUrl: require("leaflet/dist/images/marker-icon.png") })}>
            <Popup>
              <span>Delivery Location</span>
            </Popup>
          </Marker>
        </MapContainer>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MapModal;

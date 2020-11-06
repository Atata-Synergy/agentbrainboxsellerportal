import React from "react";
import PropTypes from "prop-types";
import GoogleMapReact from "google-map-react";
import LocationPin from "google-map-react";
import { Modal, Icon, Button } from "rsuite";

function MapModal(props) {
  const location = {
    address: props.address,
    lat: props.lat,
    lng: props.lng,
  };
  return (
    <Modal backdrop="static" show={props.open} onHide={props.onHide} size="md">
      <Modal.Body>
        <div style={{ height: "100vh", width: "100%" }}>
          <h4 className="map-h2">{props.address}</h4>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyCg3Qd-2DFLW4L5a-WJzDHk_JN12z2iISM",
            }}
            defaultCenter={location}
            defaultZoom={15}
          >
            <LocationPin
              lat={location.lat}
              lng={location.lng}
              text={location.address}
            />
          </GoogleMapReact>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} appearance="subtle">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

MapModal.propTypes = {
  address: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default MapModal;

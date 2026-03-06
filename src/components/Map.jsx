import React from 'react';

const Map = ({ lat, lng }) => {
  // const lat = 22.69991103043949;
  // const lng = 75.86741926991083;
  const zoom = 15;

  // Construct the Google Maps URL with dynamic coordinates and zoom level
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyA90kZbFA-_GeeQ67T7kTb7VQRSt_LoOXc&q=${lat},${lng}&zoom=${zoom}`;

  return (
    <div className="map-container" style={{ height: '50vh', width: '100%' }}>
      <iframe
        src={mapUrl}
        width="100%"
        height="80%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        title="Google Map"
      ></iframe>
    </div>
  );
};

export default Map;

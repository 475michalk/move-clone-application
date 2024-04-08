// IconOnMaps.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDriverLocation } from '../../Redux/slices/drivers';
import { GoogleMap, Marker } from '@react-google-maps/api';
import icon1 from '../../img/move.png';

function IconOnMaps() {
  const dispatch = useDispatch();
  const driverLocations = useSelector(state => state.drivers.locations);

  const handleFetchDriverLocation = () => {
    dispatch(fetchDriverLocation());
  };

  return (
    <div>
      <button onClick={handleFetchDriverLocation}>Load Driver Locations</button>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={{ lat: 32.0524754, lng: 34.9617757 }}
        zoom={12}
      >
        {/* הוספת אייקונים עבור מיקומי הנהגים */}
        {driverLocations.map(driver => (
          <Marker
            key={driver.id}
            position={{ lat: driver.lat, lng: driver.lng }}
            icon={{
              url: icon1,
              
              scaledSize: {
                width: 40,
                height: 80,
              },
            }}
          />
        ))}
      </GoogleMap>
    </div>
  );
}

export default IconOnMaps;

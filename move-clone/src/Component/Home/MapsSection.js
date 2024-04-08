/* global google */


import { LoadScript, DirectionsRenderer, GoogleMap, MarkerF, OverlayView } from '@react-google-maps/api';
import { SourceContext } from "../Context/SourceContext";
import { DestinationContext } from "../Context/DestinationContext";

import icondriver from '../../img/move-02.png';
import iconstart from '../../img/move-start-02.png';
import iconend from '../../img/move-end-02.png';

import React, { useContext, useEffect, useState, useCallback } from "react";
import axios from 'axios';
import { fetchDriver, fetchDriverCoordinates } from '../../Redux/slices/drivers';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedDriverId } from '../../Redux/slices/orders';
import { fetchReview } from '../../Redux/slices/review';
import { useClerk } from '@clerk/clerk-react';

function MapsSection() {
  const containerStyle = {
    width: '100%',
    height: window.innerWidth * 0.43
  };
  const GOOGLEMAP_KEY = 'AIzaSyBNVjEXhyDOUvcCECJFY5x_OGKt38dxVBk';

  const [center, setCenter] = useState({
    lat: 32.0819,
    lng: 34.8004,
  });

  const { source } = useContext(SourceContext);
  const { destination } = useContext(DestinationContext);
  const [directionRoutePoints, setDirectionRoutePoints] = useState([]);
  const [map, setMap] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [travelTime, setTravelTime] = useState(null);

  const { user } = useClerk();

  // const selectedDriverId = useSelector(state => state.orders.selectedDriverId);


  // מיקום מרכז המפה וטווח התצוגה
  // const center = {
  //   lat: 32.7940463,
  //   lng: 34.989571,
  // };
  const bounds = {
    north: 32.3272,
    south: 32.0819,
    east: 34.8557,
    west: 34.8004,
  };
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();


  // Callback עבור טעינת המפה
  const onLoad = useCallback(function callback(map) {
    const newBounds = new window.google.maps.LatLngBounds(bounds);
    map.fitBounds(newBounds);
    setMap(map);
    directionsRenderer.setMap(map);
  }, []);

  // Callback עבור הסרת המפה
  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);


  useEffect(() => {

    if (source && source.lat && source.lng && map) {
      setCenter({
        lat: source.lat,
        lng: source.lng,
        zoom: 14,
        controlSize: 20,
      });


    }
    if (source && destination) {
      directionRoute();
    }
  }, [source, destination, map]);


  const directionRoute = () => {
    const directionsService = new google.maps.DirectionsService();

    directionsService.route({
      origin: { lat: source.lat, lng: source.lng },
      destination: { lat: destination.lat, lng: destination.lng },
      travelMode: google.maps.TravelMode.DRIVING
    }, (result, status) => {

      if (status === google.maps.DirectionsStatus.OK) {
        setDirectionRoutePoints(result);
        // saveDataToServer({ source, destination, directionRoutePoints });
      } else {
        console.error('Error:', status);
      }
    });
  };


  const driverCoordinates = useSelector(state => state.driver.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDriverCoordinates());

  }, [dispatch]);

  useEffect(() => {
    console.log(driverCoordinates);
  }, [driverCoordinates]);

  const [driverReview, setDriverReviews] = useState([]);

  const showReview = async (driverId) => {

    if (driverId) {

      await dispatch(fetchReview()).then(reviewResponse => {
        const reviewData = reviewResponse.payload;
        const driverReviews = reviewData.filter(review => review.driverId === driverId);

        // Here you can display the ratings in the popup panel using driverReviews
        console.log('Driver Reviews:', driverReviews);
        setDriverReviews(driverReviews);
        driverReviews.forEach(review => {
          console.log('Rating:', review.rating);
          console.log('Comment:', review.comment);
        });


      }).catch(error => {
        console.error('Error fetching review data:', error.message);
      });
    } else {
      console.error('Driver not found');
    }
  };

  useEffect(() => {
    if (source && destination && map) {
      directionsService.route({
        origin: source,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
      }, (response, status) => {
        if (status === 'OK') {
          directionsRenderer.setDirections(response);
          const route = response.routes[0];
          const travelTime = route.legs[0].duration.text;
          setTravelTime(travelTime);

          const infoWindowContent = `
            <div>
              <p>Estimated travel time: ${travelTime}</p>
            </div>
          `;

          const infoWindow = new google.maps.InfoWindow({
            content: infoWindowContent
          });

          const midpointIndex = Math.floor(route.overview_path.length / 2);
          const midpoint = route.overview_path[midpointIndex];
          infoWindow.setPosition(midpoint);
          infoWindow.open(map);

        } else {
          console.error('Directions request failed due to ' + status);
        }
      });
    }
  }, [source, destination, map]);

  const [closestDriverIndex, setClosestDriverIndex] = useState(null);
  const [driverIconSize, setDriverIconSize] = useState("large");

  useEffect(() => {
    if (driverCoordinates && driverCoordinates.length > 0 && source && destination) {
      let minDistance = Infinity;
      let closestIndex = null;

      const calculateClosestDriver = async () => {
        if (!source || !source.lat || !source.lng) {
          return;
        }
        for (let index = 0; index < driverCoordinates.length; index++) {
          const driver = driverCoordinates[index];
          const distance = await calculateDistance(source.lat, source.lng, driver.lat, driver.lng);
          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = index;
          }
        }
        setClosestDriverIndex(closestIndex);
      };

      calculateClosestDriver();
    }
  }, [driverCoordinates, source, destination]);

  useEffect(() => {
    if (source && destination) {
      const intervalId = setInterval(() => {
        setDriverIconSize((prevSize) => (prevSize === "large" ? "small" : "large"));
      }, 500);

      return () => clearInterval(intervalId);
    }
  }, [source, destination]);

  const calculateDistance = async (lat1, lng1, lat2, lng2) => {
    const googleMaps = window.google.maps;
    const origin = new googleMaps.LatLng(lat1, lng1);
    const destination = new googleMaps.LatLng(lat2, lng2);

    if (googleMaps.geometry && googleMaps.geometry.spherical) {
      return googleMaps.geometry.spherical.computeDistanceBetween(origin, destination);
    } else {
      console.error('Google Maps geometry library not loaded');
      return null;
    }
  };



  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={8}
        center={{ lat: 32.0524754, lng: 34.9617757 }}
        onLoad={onLoad}
        onUnmount={onUnmount}
        // options={{ mapId: '4113717525f11867' }}
        options={{ streetViewControl: false, fullscreenControl: false }}
        controlSize={20}

      >

        {driverCoordinates && source && destination && driverCoordinates.map((coordinate, index) => (
          <MarkerF
            key={index}
            position={{ lat: coordinate.lat, lng: coordinate.lng }}
            icon={{
              url: icondriver,
              scaledSize: {
                width: closestDriverIndex === index ? (driverIconSize === "large" ? 70 : 50) : 70,
                height: closestDriverIndex === index ? (driverIconSize === "large" ? 60 : 40) : 60,
              },
            }}
            onClick={() => {
              if (selectedDriver === coordinate.id) {
                return; // תעצור כאן אם האייקון כבר נבחר
              }
              setSelectedMarker(coordinate);
              setSelectedDriver(coordinate.id);
              dispatch(setSelectedDriverId(coordinate.id));
              showReview(coordinate.id);
            }}
          />
        ))}

        {selectedMarker && (
          <OverlayView
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            onClick={() => {
              setSelectedDriver(selectedMarker.id);
              console.log("id of driver: " + selectedMarker.id);
            }}
          >
            <div style={{ backgroundColor: '#80cbc4', color: 'white', width: '150px', position: 'relative' }} className="carousel container p-4 rounded">
              <button className="btn-close" onClick={() => { setSelectedDriver(null); setSelectedMarker(null); setDriverReviews([]); }} style={{ position: 'absolute', top: '7px', right: '10px', background: 'none', border: 'none', color: 'white' }}>×</button>
              <h5 style={{ color: 'white', textAlign: 'center', marginBottom: '15px' }}>{selectedMarker.name}</h5>
              <div id="driverCarousel" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                  {driverReview.map((review, index) => (
                    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                      <h6 style={{ color: 'white' }}>Rating: {review.rating}</h6>
                      <p style={{ color: 'white' }}>Comment: {review.comment}</p>
                    </div>
                  ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#driverCarousel" data-bs-slide="prev" style={{ top: '60px', width: '15px', background: 'none', border: 'none', color: 'white' }}>
                  <span className="carousel-control-prev-icon" style={{ fontSize: '1.5rem' }} aria-hidden="true"></span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#driverCarousel" data-bs-slide="next" style={{ top: '60px', width: '15px', background: 'none', border: 'none', color: 'white' }}>
                  <span className="carousel-control-next-icon" style={{ fontSize: '1.5rem' }} aria-hidden="true"></span>
                </button>
                <ol className="carousel-indicators" style={{ position: 'absolute', width: '70px', bottom: '-33px', left: '37%', transform: 'translateX(-50%)' }}>
                  {driverReview.map((_, index) => (
                    <li key={index} data-bs-target="#driverCarousel" data-bs-slide-to={index} className={index === 0 ? 'active' : ''} style={{ display: 'block', width: '10px', height: '10px', backgroundColor: 'white', borderRadius: '50%', margin: '0 5px' }}></li>
                  ))}
                </ol>
              </div>
            </div>
          </OverlayView>
        )}



        {source && (
          <MarkerF
            position={{ lat: source.lat, lng: source.lng }}
            icon={{
              url: iconstart,
              scaledSize: {
                width: 70,
                height: 60
              }
            }}
          >
            <OverlayView
              position={{ lat: source.lat, lng: source.lng }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div className="p-2 bg-white font-bold inline-block">
                <p className="text-black text-[16px]">{source.label}</p>
              </div>
            </OverlayView>
          </MarkerF>
        )}

        {destination && (
          <MarkerF
            position={{ lat: destination.lat, lng: destination.lng }}
            icon={{
              url: iconend,
              scaledSize: {
                width: 70,
                height: 60
              }
            }}
          >
            <OverlayView
              position={{ lat: destination.lat, lng: destination.lng }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div className="p-2 bg-white font-bold inline-block">
                <p className="text-black text-[16px]">{destination.label}</p>
              </div>
            </OverlayView>
          </MarkerF>
        )}

        <DirectionsRenderer
          directions={directionRoutePoints}
          options={{
            polylineOptions: {
              strokeColor: '#80cbc4',
              strokeWeight: 5
            },
            suppressMarkers: true
          }}
        />
      </GoogleMap>
      {/* {travelTime && <p>Estimated travel time: {travelTime}</p>} */}
    </div>
  );
}

export default MapsSection;
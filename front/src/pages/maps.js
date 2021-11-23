import React, { useEffect, useRef, useState } from 'react';
import {
    LoadScript,
    GoogleMap,
    StandaloneSearchBox,
    Marker,
} from '@react-google-maps/api';
import Loading from '../components/Loading';
import Axios from 'axios';
import { USER_ADDRESS_MAP_CONFIRM } from '../constants/usuarioConstants';
import { useDispatch } from 'react-redux';

const libs = ['places'];
const defaultLocation = { lat: -32.91, lng: -68.81 };

export default function MapScreen(props) {
    const [googleApiKey, setGoogleApiKey] = useState('');
    const [center, setCenter] = useState(defaultLocation);
    const [location, setLocation] = useState(center);

    const mapRef = useRef(null);
    const placeRef = useRef(null);
    const markerRef = useRef(null);

    useEffect(() => {
        const fetch = async () => {
            const { data } = await Axios('/api/config/google');
            setGoogleApiKey(data);
            getUserCurrentLocation();
        };
        fetch();
    }, []);

    const onLoad = (map) => {
        mapRef.current = map;
    };

    const onMarkerLoad = (marker) => {
        markerRef.current = marker;
    };
    const onLoadPlaces = (place) => {
        placeRef.current = place;
    };
    const onIdle = () => {
        setLocation({
            lat: mapRef.current.center.lat(),
            lng: mapRef.current.center.lng(),
        });
    };
    const onPlacesChanged = () => {
        const place = placeRef.current.getPlaces()[0].geometry.location;
        setCenter({ lat: place.lat(), lng: place.lng() });
        setLocation({ lat: place.lat(), lng: place.lng() });
    };
    const dispatch = useDispatch();
    const onConfirm = () => {
        const places = placeRef.current.getPlaces();
        if (places && places.length === 1) {
            // dispatch select action
            dispatch({
                type: USER_ADDRESS_MAP_CONFIRM,
                payload: {
                    lat: location.lat,
                    lng: location.lng,
                    address: places[0].formatted_address,
                    name: places[0].name,
                    vicinity: places[0].vicinity,
                    googleAddressId: places[0].id,
                },
            });
            alert('Dirección seleccionada correctamente.');
            props.history.push('/shipping');
        } else {
            alert('Por favor ingresa tu dirección');
        }
    };

    const getUserCurrentLocation = () => {
        if (!navigator.geolocation) {
            alert('Geolocación no es soportada por este navegador');
        } else {
            navigator.geolocation.getCurrentPosition((position) => {
                setCenter({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            });
        }
    };

    return googleApiKey ? (
        <div className="full-container">
            <LoadScript libraries={libs} googleMapsApiKey={googleApiKey}>
                <GoogleMap
                    id="smaple-map"
                    mapContainerStyle={{ height: '100%', width: '100%' }}
                    center={center}
                    zoom={15}
                    onLoad={onLoad}
                    onIdle={onIdle}
                >
                    <StandaloneSearchBox
                        onLoad={onLoadPlaces}
                        onPlacesChanged={onPlacesChanged}
                    >
                        <div className="map-input-box">
                            <input type="text" placeholder="Ingresa tu dirección"></input>
                            <button type="button" className="primary" onClick={onConfirm}>
                                Confirmar
                            </button>
                        </div>
                    </StandaloneSearchBox>
                    <Marker position={location} onLoad={onMarkerLoad}></Marker>
                </GoogleMap>
            </LoadScript>
        </div>
    ) : (
        <Loading></Loading>
    );
}
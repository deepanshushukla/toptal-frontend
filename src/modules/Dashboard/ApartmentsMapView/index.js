import React, {useState, useEffect, useCallback} from 'react'
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import ApartmentSummary from "../components/ApartmentSummary";
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import './index.scss';
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;


const ApartmentsMapView = ({apartments}) => {
    const [mapCenter, setMapCenter] = useState([]);
    const [mapBounds, setMapBounds] = useState([]);
    const getCenter = useCallback(()=>{

        let minLat = 10000000, maxLong = -10000000 , bounds= [];
        apartments.forEach((item)=>{
            const {lat,long} = item.geoLocation;
            if(lat < minLat ){
                minLat = lat;
            }
            if(long > maxLong ){
                maxLong = long;
            }
            bounds.push([lat,long])
        });
        setMapBounds(L.latLngBounds(bounds));
        setMapCenter([minLat,maxLong])
    });
    useEffect(() => {
        getCenter();
    }, [apartments]);


console.log(mapBounds)
    return <>
        { mapCenter.length && mapBounds._northEast &&
                (<MapContainer center={mapCenter}  scrollWheelZoom={true} bounds={mapBounds}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {apartments.map((item) =>  (
                        <Marker position={[item.geoLocation.lat, item.geoLocation.long]}>
                        <Popup>
                            <ApartmentSummary apartment={item}/>
                        </Popup>
                    </Marker>)
                )
                }

            </MapContainer>)
        }
</>

};

export default React.memo(ApartmentsMapView);
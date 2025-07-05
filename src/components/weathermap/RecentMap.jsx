import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

function RecenterMap({ lat, lon }) {
    const map = useMap();

    useEffect(() => {
        if (lat && lon) {
            map.setView([lat, lon], map.getZoom(), {
                animate: true,
            });
        }
    }, [lat, lon, map]);

    return null;
}

export default RecenterMap;

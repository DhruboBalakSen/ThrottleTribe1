"use client";

import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
  MarkerF,
} from "@react-google-maps/api";
import { useState, useRef } from "react";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const defaultCenter = {
  lat: 20.5937,
  lng: 78.9629,
};

export default function RouteMap({
  origin,
  destination,
}: {
  origin: string;
  destination: string;
}) {
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
//   const [hotspots, setHotspots] = useState<google.maps.places.PlaceResult[]>(
//     []
//   );
  const mapRef = useRef<google.maps.Map | null>(null);

  const handleMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;

    if (!origin || !destination || !window.google) {
      console.warn("Google not ready or missing origin/destination");
      return;
    }

    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        console.log("Directions Status:", status);
        if (status === google.maps.DirectionsStatus.OK && result) {
          setDirections(result);
        //   findHotspots(result); // Now mapRef is set!
        } else {
          console.error("Directions failed:", status);
        }
      }
    );
  };

//   const findHotspots = (result: google.maps.DirectionsResult) => {
//     const path = result.routes[0].overview_path;
//     if (!mapRef.current) {
//       console.warn("Map not ready");
//       return;
//     }

//     const placesService = new google.maps.places.PlacesService(mapRef.current);

//     const sampledPoints = path.filter((_, i) => i % 10 === 0); // Reduce API calls
//     sampledPoints.forEach((location) => {
//       placesService.nearbySearch(
//         {
//           location,
//           radius: 1000,
//           type: "car_repair", // Change this as needed
//         },
//         (results, status) => {
//           if (status === google.maps.places.PlacesServiceStatus.OK && results) {
//             setHotspots((prev) => {
//               // Avoid duplicates based on place_id
//               const unique = results.filter(
//                 (r) => !prev.some((p) => p.place_id === r.place_id)
//               );
//               return [...prev, ...unique];
//             });
//           } else {
//             console.warn("Nearby search failed:", status);
//           }
//         }
//       );
//     });
//   };

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
      libraries={["places"]}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={5}
        onLoad={handleMapLoad}
      >
        {directions && <DirectionsRenderer directions={directions} />}
        {/* {hotspots.map((place, idx) =>
          place.geometry?.location ? (
            <MarkerF
              key={idx}
              position={place.geometry.location}
              title={place.name}
            />
          ) : null
        )} */}
      </GoogleMap>
    </LoadScript>
  );
}

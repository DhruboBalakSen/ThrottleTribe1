"use client";
import { LoadScript } from "@react-google-maps/api";
import TripForm from "@/components/trip/create";// Adjust path

export default function Page() {
  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
      libraries={["places"]}
    >
      <TripForm />
    </LoadScript>
  );
}

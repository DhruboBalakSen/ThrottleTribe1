'use client';

import { ReactNode } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';

interface MapLoaderProps {
  childrenAction: (isLoaded: boolean) => ReactNode;
}

export default function MapLoader({ childrenAction }: MapLoaderProps) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ['places'],
  });

  return <>{childrenAction(isLoaded)}</>;
}

import { Header } from "@/components/main/header";
import RouteMap from "@/components/map/RouteMap";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export default async function Page() {
  const user = await currentUser();
  if (!user?.username) return <p>User not found</p>;

  const bookedTrips = await prisma.bookedTrips.findMany({
    where: { userId: user.username },
  });

  const tripDetailsList = await Promise.all(
    bookedTrips.map((trip) =>
      prisma.trips.findUnique({
        where: { id: trip.tripId },
      })
    )
  );

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="flex gap-4">
          <div className="w-full">
            <h1 className="text-2xl font-bold mb-4">My Trips</h1>
            {tripDetailsList.length > 0 ? (
              tripDetailsList.map((tripDetails, index) =>
                tripDetails ? (
                  <div
                    key={tripDetails.id}
                    className="border p-4 mb-4 rounded-lg"
                  >
                    <h2 className="text-xl font-semibold mb-4">
                      {tripDetails.title}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      {tripDetails.itinerary || "No description available."}
                    </p>
                    <p className="text-gray-800">
                      Starting Point: {tripDetails.source || "Unknown"}
                    </p>
                    <p className="text-gray-800">
                      Destination: {tripDetails.destination || "Unknown"}
                    </p>
                    <p className="text-gray-800">
                      Start Date:{" "}
                      {tripDetails.start
                        ? new Date(tripDetails.start).toLocaleDateString()
                        : "Unknown"}
                    </p>
                    <p className="text-gray-800">
                      End Date:{" "}
                      {tripDetails.end
                        ? new Date(tripDetails.end).toLocaleDateString()
                        : "Unknown"}
                    </p>
                    <p className="text-gray-800">
                      Contact trip lead: {tripDetails.contact || "Unknown"}
                    </p>
                    {tripDetails?.source && tripDetails?.destination && (
                      <>
                        <RouteMap
                          origin={tripDetails.source}
                          destination={tripDetails.destination}
                        />
                        <div className="mt-4 flex gap-6">
                          <a
                            href={`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
                              tripDetails.source
                            )}&destination=${encodeURIComponent(
                              tripDetails.destination
                            )}&travelmode=driving`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button variant="outline">Open Route in Google Maps</Button>
                          </a>
                          <a
                            href={`https://www.google.com/maps/search/mechanics+near+${encodeURIComponent(
                              tripDetails.source
                            )}+to+${encodeURIComponent(
                              tripDetails.destination
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button variant="default" className="bg-orange-500 hover:bg-orange-600">

                            Show Hotspots Nearby
                            </Button>
                          </a>
                        </div>
                      </>
                    )}
                  </div>
                ) : null
              )
            ) : (
              <div className="min-h-[calc(100vh-200px)] flex justify-center items-center">
                <p className="text-lg text-muted-foreground">
                  No booked trips found.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

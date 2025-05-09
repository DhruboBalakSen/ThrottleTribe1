import { Header } from "@/components/main/header";
import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import axios from "axios";

export default async function Page() {
  const user = await currentUser();
  const bookedTrips = await prisma.bookedTrips.findMany();
  const trips = bookedTrips.filter((trip) => trip.userId == user?.username);

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="flex gap-4">
          <div className="w-full">
            <h1 className="text-2xl font-bold mb-4">My Trips</h1>
            {trips.length > 0 ? (
              trips.map((trip) => (
                <div key={trip.tripId} className="border p-4 mb-4 rounded-lg">
                  {prisma.trips
                    .findUnique({
                      where: { id: trip.tripId },
                    })
                    .then((tripDetails) => (
                      <>
                        <h2 className="text-xl font-semibold mb-4">
                          {tripDetails?.title || "Trip Name"}
                        </h2>
                        <p className="text-gray-600 mb-4">
                          {tripDetails?.itinerary || "No description available."}
                        </p>
                        <p className="text-gray-800">
                          Destination: {tripDetails?.location || "Unknown"}
                        </p>
                        <p className="text-gray-800">
                          Start Date: {tripDetails?.start ? new Date(tripDetails.start).toLocaleDateString() : "Unknown"}
                        </p>
                        <p className="text-gray-800">
                          End Date: {tripDetails?.start ? new Date(tripDetails.end).toLocaleDateString() : "Unknown"}
                        </p>
                        <p className="text-gray-800">
                          Contact trip lead: {tripDetails?.contact || "Unknown"}
                        </p>
                      </>
                    ))}
                </div>
              ))
            ) : (
                <div className="min-h-[calc(100vh-200px)] flex justify-center items-center">
                    <p className="text-lg text-muted-foreground">No booked trips found.</p>
                </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

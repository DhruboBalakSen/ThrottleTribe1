"use server";
import { MoreVertical } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { getUserDetails } from "@/lib/queries";
import Link from "next/link";
import prisma from "@/lib/db";
import Image from "next/image";
interface TripParams {
  id: Number;
  title: String;
  userId: String;
  itinerary: String;
  cost: String;
  contact: String;
  createdAt: Date;
  imageUrl: string;
  source: String;
  destination: String;
  slots: Number;
  tags: String[];
  start: Date;
  end: Date;
}

const Trip = async ({ data }: { data: TripParams }) => {
  const user = await getUserDetails(data.userId as string);
  const booked = (await prisma.bookedTrips.findMany()).filter(
    (trip) => trip.tripId == data.id
  ).length;
  console.log(
    (await prisma.bookedTrips.findMany()).filter(
      (trip) => trip.tripId == data.id
    )
  );
  console.log(user?.profilePicture);
  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <img
              src={user?.profilePicture || "/default_pfp.jpg"}
              alt="Profile"
              className="h-10 w-10 rounded-full"
            />
            <div>
              <p className="font-medium">{data.userId}</p>
              <p className="text-sm text-muted-foreground">
                {new Date(data.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>

        <div className="aspect-video w-full rounded-lg overflow-hidden mb-4">
          <Image
            src={data?.imageUrl}
            width={1920}
            height={1080}
            alt="Trip"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">{data.title}</h2>
            {data?.tags.length > 0 ? (
              <div className="flex gap-2">
                {data.tags.map((tag, idx) => (
                  <span
                    className="px-2 py-1 text-xs bg-gray-100 rounded"
                    key={idx}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          <p className="text-muted-foreground">{data.itinerary}</p>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <span>🚐</span>
              <span className="text-sm">Transfer included</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🍳</span>
              <span className="text-sm">Breakfast Included</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🏠</span>
              <span className="text-sm">Stay Included</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🗺️</span>
              <span className="text-sm">Sightseeing</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <div className="space-y-1">
              <div className="text-2xl font-bold">
                {"Rs." + data.cost}{" "}
                <span className="text-sm font-normal">per adult</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>
                  {booked}/{data.slots as number} filled
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Link href={`/trips/book/${data.id}`}>
                <Button variant="outline">View More</Button>
              </Link>
              {/* <Button className="bg-orange-500 hover:bg-orange-600">
                Book Now
              </Button> */}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Trip;

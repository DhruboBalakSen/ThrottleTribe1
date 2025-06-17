import { Button } from "@/components/ui/button";
import { fetchTrips } from "@/lib/queries";
import { Edit3 } from "lucide-react";
import Link from "next/link";
import Trip from "./trip-card";
import { SortSelect } from "./sort-select";

interface TripsContentProps {
  filters: any; // Replace 'any' with a more specific type if available
}

export async function TripsContent({ filters }: TripsContentProps) {
  const trips = await fetchTrips(filters);

  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-6">
        <Link href={"/trips/create"}>
          <Button className="bg-orange-500 hover:bg-orange-600 gap-2">
            <Edit3 className="h-4 w-4" />
            Plan A Trip
          </Button>
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <SortSelect />
        </div>
      </div>

      {trips && trips?.map((trip) => <Trip key={trip.id} data={trip} />)}
    </div>
  );
}

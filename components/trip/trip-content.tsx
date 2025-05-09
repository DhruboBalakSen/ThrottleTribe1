import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchTrips } from "@/lib/queries";
import { Edit3 } from "lucide-react";
import Link from "next/link";
import Trip from "./trip-card";

export async function TripsContent() {

  const trips = await fetchTrips();

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
          <Select defaultValue="newest">
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest Post</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {trips &&
        trips?.map((trip) => (
          <Trip key={trip.id} data={trip} />
        ))}
    </div>
  );
}
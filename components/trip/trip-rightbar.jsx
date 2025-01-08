import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

export function TripsRightbar() {
  return (
    <div className="hidden xl:flex flex-col gap-6 w-80">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Nearest Trips</h3>
        <Button variant="ghost" size="icon" className="h-10 w-12">
          <span className="text-sm text-muted-foreground">13</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {[1, 2, 3].map((trip) => (
        <Card key={trip}>
          <CardContent className="p-4">
            <img
              src="https://placehold.co/300x150"
              alt="Trip"
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h4 className="font-medium">Leh-Ladakh Road Trip</h4>
            <div className="flex items-center gap-2 my-2">
              <span className="px-2 py-1 text-xs bg-gray-100 rounded">
                12 Jul
              </span>
              <span className="px-2 py-1 text-xs bg-gray-100 rounded">
                18 Jul
              </span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm">Rs. 12,999 per adult</p>
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                Know More
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

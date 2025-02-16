import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

export function RightSidebar() {
  return (
    <div className="hidden xl:flex flex-col gap-6 w-96">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Upcoming Events</h3>
          <Button variant="ghost" size="icon" className="h-10 w-12">
            <span className="text-sm text-muted-foreground">27</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        {[1, 2].map((i) => (
          <Card className="shadow-md" key={i}>
            <CardContent className="p-4">
              <img
                src="https://media.assettype.com/fastbikeindia-to-evoindia%2Fimport%2Ffastbikesindia%2F2020-12%2Ff4511879-66d7-4413-a753-cefc07b231de%2FHero_MotoSports_Team_Rally___Sebastian_Buhler__CS_Santosh__and_Joaquim_Rodrigues.jpg?w=1024&auto=format%2Ccompress&fit=max"
                alt="Event"
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h4 className="font-medium">Hero India Bike Rally</h4>
              <p className="text-sm text-muted-foreground">
                Monday, 22nd December
              </p>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-1">
                  <span className="text-xs">📍</span>
                  <span className="text-sm">Bangalore</span>
                </div>
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                  Join Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { MapPin } from 'lucide-react'

export function TripsLeftbar() {
  return (
    <div className="hidden lg:flex flex-col gap-6 w-[330px]">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Explore Trips
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-sm font-medium mb-2">Apply Filters</p>
            <div className="relative">
              <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search location" className="pl-8" />
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Select Dates</p>
            <Calendar
              mode="range"
              className="rounded-md border"
            />
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Select Activities</p>
            <div className="space-y-2">
              {['Trekking', 'Camping', 'Sightseeing', 'Rockclimbing'].map((activity) => (
                <div key={activity} className="flex items-center space-x-2">
                  <Checkbox id={activity.toLowerCase()} />
                  <label
                    htmlFor={activity.toLowerCase()}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {activity}
                  </label>
                </div>
              ))}
              <Button variant="link" className="text-xs text-muted-foreground px-0">
                see more
              </Button>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Select Amenities</p>
            <div className="space-y-2">
              {['Transfer', 'Meals', 'Stay', 'Rockclimbing'].map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox id={amenity.toLowerCase()} />
                  <label
                    htmlFor={amenity.toLowerCase()}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {amenity}
                  </label>
                </div>
              ))}
              <Button variant="link" className="text-xs text-muted-foreground px-0">
                see more
              </Button>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">Clear</Button>
            <Button className="flex-1 bg-orange-500 hover:bg-orange-600">Apply</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


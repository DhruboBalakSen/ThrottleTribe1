import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function RightSidebar() {
  return (
    <div className="hidden xl:flex flex-col gap-6 w-80">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Upcoming Events</h3>
          <span className="text-sm text-muted-foreground">27</span>
          <Button variant="ghost" size="sm">→</Button>
        </div>
        {[1, 2].map((i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <img
                src="/placeholder.svg?height=150&width=300"
                alt="Event"
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h4 className="font-medium">Hero India Bike Rally</h4>
              <p className="text-sm text-muted-foreground">Monday, 22nd December</p>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-1">
                  <span className="text-xs">📍</span>
                  <span className="text-sm">Bangalore</span>
                </div>
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600">Join Now</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Nearest Trips</h3>
          <span className="text-sm text-muted-foreground">13</span>
          <Button variant="ghost" size="sm">→</Button>
        </div>
        {[1, 2].map((i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <img
                src="/placeholder.svg?height=150&width=300"
                alt="Trip"
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h4 className="font-medium">Leh-Ladakh Road Trip</h4>
              <div className="flex items-center gap-2 my-2">
                <span className="px-2 py-1 text-xs bg-gray-100 rounded">12 Jul</span>
                <span className="px-2 py-1 text-xs bg-gray-100 rounded">18 Jul</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm">Rs. 12,999 per adult</p>
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600">Know More</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}


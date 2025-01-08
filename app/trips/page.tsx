import { Header } from "@/components/trip/trip-header"
import { TripsContent } from "@/components/trip/trip-content"
import { TripsLeftbar } from "@/components/trip/trip-leftbar"
import { TripsRightbar } from "@/components/trip/trip-rightbar"

export default function TripsPage() {
  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          <TripsLeftbar />
          <TripsContent />
          <TripsRightbar />
        </div>
      </main>
    </div>
  )
}


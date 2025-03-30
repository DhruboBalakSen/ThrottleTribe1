import { Header } from "@/components/main/header"
import { TripsContent } from "@/components/trip/trip-content"
import { TripsLeftbar } from "@/components/trip/trip-leftbar"

export default function TripsPage() {
  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="flex gap-4">
          <TripsLeftbar />
          <TripsContent />
        </div>
      </main>
    </div>
  )
}

 
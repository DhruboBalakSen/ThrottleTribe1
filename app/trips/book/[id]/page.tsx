"use client";
import { Header } from "@/components/main/header";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { MoreVertical } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface Trip {
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
declare global {
  interface Window {
    Razorpay: any;
  }
}

interface Booking {
  id: number;
  userId: string;
  tripId: number;
  createdAt: Date; // or `Date` if you parse it as a Date object
}

const Page = () => {
  const params = useParams();
  const [booked, setBooked] = useState<Booking[] | null>(null);
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrip = async () => {
      setLoading(true);
      const res = await axios.post("/api/trips/fetch", {
        id: params.id,
      });
      const bookedres = await axios.post("/api/trips/booked", {
        id: params.id,
      });
      setBooked(bookedres.data.data);
      setTrip(res.data.trip);
      setLoading(false);
    };
    fetchTrip();
  }, []);
  const { user } = useUser();
  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCheckout = async () => {
    const alreadyBooked = booked?.some((b) => b.userId === user?.username);
    console.log(user?.username, alreadyBooked);
    if (alreadyBooked) {
      toast.error("Trip Already Booked!");
      return;
    }

    const isLoaded = await loadRazorpayScript();

    if (!isLoaded) {
      toast.error("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      const orderResponse = await fetch("/api/payment/create-razorpay-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: trip?.cost,
          currency: "INR",
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok) {
        throw new Error(orderData.error || "Failed to create order");
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        order_id: orderData.orderId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Throttle Tribe",
        description: `Trip to ${
          trip?.destination || "your selected destination"
        }`,
        image: "/logo.png",
        handler: async function (response: any) {
          await fetch("/api/trips/book", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              tripId: trip?.id,
              userId: user?.username,
            }),
          });
          toast.success("Payment Successful!");
        },
        prefill: {
          name: user?.fullName || "",
          email: user?.primaryEmailAddress?.emailAddress || "",
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Toaster position="top-center" />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Trip Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Image
                src={
                  user?.imageUrl?.trim() ? user.imageUrl : "/default_pfp.jpg"
                }
                width={48}
                height={48}
                alt="Profile"
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-800">{trip?.userId}</p>
                <p className="text-sm text-gray-500">
                  {trip?.createdAt.toLocaleString()}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5 text-gray-500" />
            </Button>
          </div>

          {/* Trip Image */}
          <div className="rounded-lg overflow-hidden mb-6">
            <Image
              src={trip?.imageUrl || "/default_trip.jpg"}
              width={1024}
              height={500}
              alt="Trip"
              className="w-full h-64 sm:h-96 object-cover"
            />
          </div>

          {/* Trip Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {trip?.title}
              </h2>
              <div className="flex flex-wrap gap-2 mt-2">
                {trip?.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-xs font-medium bg-orange-100 text-orange-700 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed">{trip?.itinerary}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2">
                🚐 <span>Transfer included</span>
              </div>
              <div className="flex items-center gap-2">
                🍳 <span>Breakfast included</span>
              </div>
              <div className="flex items-center gap-2">
                🏠 <span>Stay included</span>
              </div>
              <div className="flex items-center gap-2">
                🗺️ <span>Sightseeing</span>
              </div>
            </div>

            {/* Price and Booking */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-6 border-t mt-4">
              <div className="space-y-1">
                <p className="text-3xl font-bold text-orange-600">
                  Rs. {trip?.cost}
                  <span className="text-base font-normal text-gray-500">
                    {" "}
                    per adult
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  {booked?.length}/{trip?.slots?.toString()} slots filled
                </p>
              </div>
              <Button
                className="mt-4 sm:mt-0 bg-orange-500 hover:bg-orange-600 px-6 py-2 text-white"
                onClick={handleCheckout}
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

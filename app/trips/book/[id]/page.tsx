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

const Page = () => {
  const params = useParams();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrip = async () => {
      setLoading(true);
      const res = await axios.post("/api/trips/fetch", {
        id: params.id,
      });
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
      console.log(orderData);

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

  if(loading){
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="">
      <Header />
      <Toaster position="top-center" />
      <div className="flex items-center justify-center min-h-screen p-10">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Image
                src={
                  user?.imageUrl?.trim() ? user.imageUrl : "/default_pfp.jpg"
                }
                width={40}
                height={40}
                alt="Profile"
                className="h-10 w-10 rounded-full"
              />

              <div>
                <p className="font-medium">{trip?.userId}</p>
                <p className="text-sm text-muted-foreground">
                  {trip?.createdAt.toLocaleString()}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>

          <div className="aspect-video w-full rounded-lg overflow-hidden mb-4">
            <Image
              src={trip?.imageUrl || "/default_trip.jpg"}
              width={1920}
              height={1080}
              alt="Trip"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">{trip?.title}</h2>
              <div className="flex gap-2">
                {trip?.tags.map((tag, idx) => (
                  <span
                    className="px-2 py-1 text-xs bg-gray-100 rounded"
                    key={idx}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-muted-foreground">{trip?.itinerary}</p>

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
                  {"Rs." + trip?.cost}{" "}
                  <span className="text-sm font-normal">per adult</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>
                    {2}/{trip?.slots as number} filled
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  className="bg-orange-500 hover:bg-orange-600"
                  onClick={handleCheckout}
                >
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

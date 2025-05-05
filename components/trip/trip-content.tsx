"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit3, MoreVertical } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function TripsContent() {
  const primaryEmail = "user@example.com";
  
  const handlePurchase = async () => {
    try{
      const orderResponse = await fetch('/api/create-razorpay-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const orderData = await orderResponse.json();

      if(!orderResponse.ok){
        throw new Error(orderData.error || 'Failed to create order')
      }
      const razorpay = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        order_id: orderData.orderId,
        amount: orderData.amount,
        current: orderData.currency,
        name: 'Throttle Tribe',
        description: 'Amount 7999',
        image: '/logo.png',
        handler: async function (response: any){
          const subscription = await fetch('/api/handle-payment-success', {
            method: 'POST',
            headers: {
              'Content-Type' : "application/json"
            },
            body: JSON.stringify({
              userEmail: primaryEmail,
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature,
            }),
          });
          const subscriptionData = await subscription.json()

          if(!subscription.ok){
            throw new Error(subscriptionData.error || 'Error Try again later');
          }
          toast.success('Payment Success');
        },

      })
      razorpay.open()
    }catch(error){
      console.log('error', error);
      toast.error('Try again Later')
    }
  }

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

      {[1, 2].map((post) => (
        <Card key={post} className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <img
                  src="default_pfp.jpg"
                  alt="Profile"
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <p className="font-medium">Pankaj Reet Tech</p>
                  <p className="text-sm text-muted-foreground">2:06 pm</p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>

            <div className="aspect-video w-full rounded-lg overflow-hidden mb-4">
              <img
                src="https://content3.jdmagicbox.com/comp/coorg/i8/9999p8272.8272.170314174644.g3i8/catalogue/top-gear-bike-rentals-kohinoor-road-coorg-bike-on-rent-yamaha-csp580ewh9.jpg"
                alt="Trip"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">Coorg Bike Trip</h2>
                <div className="flex gap-2">
                  <span className="px-2 py-1 text-xs bg-gray-100 rounded">
                    12 JUL
                  </span>
                  <span className="px-2 py-1 text-xs bg-gray-100 rounded">
                    18 JUL
                  </span>
                  <span className="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded">
                    3D/2N
                  </span>
                </div>
              </div>

              <p className="text-muted-foreground">
                Gear up for an adventurous ride to the lush hills of Coorg!
                Explore scenic routes, misty landscapes, and vibrant coffee
                plantations. With guided rides and exciting pit stops, this trip
                promises the perfect blend of thrill and serenity. Join us for
                an unforgettable biking experience!
              </p>

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
                    Rs. 7,999{" "}
                    <span className="text-sm font-normal">per adult</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>12,444 viewing</span>
                    <span>04/12 filled</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">View More</Button>
                  <Button onClick={() => handlePurchase()} className="bg-orange-500 hover:bg-orange-600">
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

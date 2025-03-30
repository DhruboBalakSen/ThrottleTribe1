"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, MapPin } from "lucide-react";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { Slider } from "@/components/ui/slider";

export function TripsLeftbar() {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [priceRange, setPriceRange] = useState([5000]);

  const handleClear = () => {
    setLocation("");
    setDate({ from: undefined, to: undefined });
    setPriceRange([5000]);
  };

  const handleApply = () => {
    console.log("Filters applied:", {
      location,
      date,
      priceRange,
    });
  };

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
              <Input
                placeholder="Search location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                
              />
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Select Dates</p>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal flex items-center gap-2",
                    !date?.from && "text-muted-foreground"
                  )}
                >
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span className="text-muted-foreground">Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Select Price Range (₹)</p>
            <Slider
              min={0}
              max={15000}
              step={50}
              value={priceRange}
              onValueChange={setPriceRange}
            />
            <div className="flex justify-between text-sm mt-2">
              <span>Free</span>
              <span>₹{priceRange[0]}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={handleClear}>
              Clear
            </Button>
            <Button className="flex-1 bg-orange-500 hover:bg-orange-600" onClick={handleApply}>
              Apply
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

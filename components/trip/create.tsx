"use client";

import { useRef, useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { Label } from "../ui/label";

const formSchema = z
  .object({
    title: z
      .string()
      .min(3, { message: "Title must be at least 3 characters." }),
    description: z
      .string()
      .min(10, { message: "Description must be at least 10 characters." }),
    startDate: z.date({ required_error: "A start date is required." }),
    endDate: z.date({ required_error: "An end date is required." }),
    price: z.string().min(1, { message: "Price is required." }),
    slots: z.string().min(1, { message: "Number of slots is required." }),
    contact: z.string().min(5, { message: "Contact info is required." }),
    source: z.string().min(3, { message: "Source is required." }),
    destination: z.string().min(3, { message: "Destination is required." }),
    tags: z.string().optional(),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "End date cannot be before start date.",
    path: ["endDate"],
  });

export default function TripForm() {
  const { user } = useUser();
  const router = useRouter();
  const [ImageUrl, setImageUrl] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      slots: "",
      contact: "",
      source: "",
      destination: "",
      tags: "",
      startDate: undefined,
      endDate: undefined,
    },
  });

  const handleFileInput = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      console.log(event.target.files);
      const files = Array.from(event.target.files);
      files.map((file) => uploadToServer(file));
    }
  };

  const uploadToServer = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Upload successful! ");
        setImageUrl(data.url);
        return data.url;
      } else {
        throw new Error(data.error || "Upload failed");
      }
    } catch (error) {
      console.log("Upload failed");
      return null;
    }
  };

  const originRef = useRef<google.maps.places.Autocomplete | null>(null);
  const destinationRef = useRef<google.maps.places.Autocomplete | null>(null);

  const handleOriginLoad = (autocomplete: google.maps.places.Autocomplete) => {
    originRef.current = autocomplete;
  };

  const handleDestinationLoad = (
    autocomplete: google.maps.places.Autocomplete
  ) => {
    destinationRef.current = autocomplete;
  };

  const handleOriginChange = () => {
    const place = originRef.current?.getPlace();
    if (place?.name) {
      form.setValue("source", place?.name);
    }
  };

  const handleDestinationChange = () => {
    const place = destinationRef.current?.getPlace();
    if (place?.name) {
      form.setValue("destination", place?.name);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const tags = values.tags?.split(",").map((item) => item.trim()) || [""];
    await axios.post("/api/trips/create", {
      ...values,
      userId: user?.username,
      tags: tags,
      imageUrl: ImageUrl
    });
    router.push("/trips");
  }

  return (
    <Card className="w-full max-w-7xl mx-auto">
      <Toaster position="top-right" />
      <CardHeader>
        <CardTitle>Create an Event</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter event title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter event description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full items-center gap-2.5">
              <Label>Image</Label>
              <Input
                id="Image"
                type="file"
                accept="image/*"
                onChange={handleFileInput}
              />
            </div>

            <FormField
              control={form.control}
              name="source"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Location</FormLabel>
                  <FormControl>
                    <Autocomplete
                      onLoad={handleOriginLoad}
                      onPlaceChanged={handleOriginChange}
                    >
                      <Input
                        placeholder="Enter event start location"
                        {...field}
                        value={form.watch("source")}
                      />
                    </Autocomplete>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="destination"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Location</FormLabel>
                  <FormControl>
                    <Autocomplete
                      onLoad={handleDestinationLoad}
                      onPlaceChanged={handleDestinationChange}
                    >
                      <Input
                        placeholder="Enter event end location"
                        {...field}
                        value={form.watch("destination")}
                      />
                    </Autocomplete>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col sm:flex-row gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? format(field.value, "PPP")
                              : "Pick a date"}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        side="bottom"
                        align="start"
                        className="w-auto p-0"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? format(field.value, "PPP")
                              : "Pick a date"}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        side="bottom"
                        align="start"
                        className="w-auto p-0"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter price in INR"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slots"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slots</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter number of slots"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter event tags (comma-separated)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Information</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter contact details" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600"
            >
              Create Event
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

"use client";

import * as React from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { completeOnboarding } from "./_actions";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function OnboardingComponent() {
  const [error, setError] = React.useState("");
  const { user } = useUser();
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const res = await completeOnboarding(formData);
    if (res?.message) {
      await user?.reload();
      router.push("/");
    }
    if (res?.error) {
      setError(res?.error);
    }
  };
  return (
    <div className="min-h-[90vh] bg-gray-50 flex flex-col justify-center sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
          Complete Your Profile
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Let's get to know you better
        </p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form action={handleSubmit} className="h-64">
            <div>
              <Label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-700"
              >
                Bio
              </Label>
              <Textarea
                name="bio"
                className="shadow-sm focus:ring-orange-500 focus:border-orange-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                rows={6}
                required
              />
              <p className="mt-2 text-sm text-gray-500">
                Brief description for your profile.
              </p>
            </div>
            {error && <p className="text-red-600">Error: {error}</p>}
            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 mt-5"
            >
              Save Profile
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import * as React from "react";
// import { useUser } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
// import { completeOnboarding } from "./_actions";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";

// export default function OnboardingComponent() {
//   const [error, setError] = React.useState("");
//   const { user } = useUser();
//   const router = useRouter();

//   const handleSubmit = async (formData: FormData) => {
//     const res = await completeOnboarding(formData);
//     if (res?.message) {
//       await user?.reload();
//       router.push("/");
//     }
//     if (res?.error) {
//       setError(res?.error);
//     }
//   };
//   return (
//     <div className="w-11/12">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
//           Complete Your Profile
//         </h2>
//         <p className="mt-2 text-center text-sm text-gray-600">
//           Let's get to know you better
//         </p>
//       </div>
//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//           <form action={handleSubmit} className="h-64">
//             <div>
//               <Label
//                 htmlFor="bio"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Bio
//               </Label>
//               <Textarea
//                 name="bio"
//                 className="shadow-sm focus:ring-orange-500 focus:border-orange-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
//                 rows={6}
//                 required
//               />
//               <p className="mt-2 text-sm text-gray-500">
//                 Brief description for your profile.
//               </p>
//             </div>
//             {error && <p className="text-red-600">Error: {error}</p>}
//             <Button
//               type="submit"
//               className="w-full bg-orange-500 hover:bg-orange-600 mt-5"
//             >
//               Save Profile
//             </Button>
//           </form>
//         </div>
//       </div>
//       </div>
//   );
// }

"use client";

import * as React from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { completeOnboarding } from "./_actions";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
    <div className="w-11/12">
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
          <form action={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                Bio
              </Label>
              <Textarea
                name="bio"
                className="shadow-sm focus:ring-orange-500 focus:border-orange-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                rows={4}
                required
              />
              <p className="mt-2 text-sm text-gray-500">Brief description for your profile.</p>
            </div>

            <div>
              <Label className="block text-sm font-medium text-gray-700">Gender</Label>
              <RadioGroup name="gender" className="mt-2 flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="male" value="male"/>
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="female" value="female"/>
                  <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="other" value="other"/>
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                Date of Birth
              </Label>
              <Input
                type="date"
                name="dob"
                className="mt-1 block w-full shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <Label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location
              </Label>
              <Input
                type="text"
                name="location"
                placeholder="Enter your city, country"
                className="mt-1 block w-full shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm border border-gray-300 rounded-md"
                required
              />
            </div>

            {error && <p className="text-red-600">Error: {error}</p>}

            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 mt-5">
              Save Profile
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}


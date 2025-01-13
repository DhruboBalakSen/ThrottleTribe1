"use server";

import { createUser } from "@/lib/queries";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";

export const completeOnboarding = async (formData: FormData) => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId) {
    return { message: "No Logged In User" };
  }

  const client = await clerkClient();

  try {
    const bio = formData.get("bio")?.toString() || "";
    const res = await client.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
        bio : bio,
      },
    });

    const User = {
      name: user?.fullName || "",
      username: user?.username || "",
      email: user?.emailAddresses[0].emailAddress || "",
      phoneNumber: user?.phoneNumbers[0].phoneNumber || "",
      bio,
      profilePicture: user?.imageUrl || "",
    };
    await createUser(User);
    return { message: res.publicMetadata };
  } catch (err) {
    console.error("Error updating user metadata:", err);
    return { error: "There was an error updating the user metadata." };
  }
};

// "use server";

// import { createUser } from "@/lib/queries";
// import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";

// export const completeOnboarding = async (formData: FormData) => {
//   const { userId } = await auth();
//   const user = await currentUser();

//   if (!userId) {
//     return { message: "No Logged In User" };
//   }

//   try {
//     const bio = formData.get("bio")?.toString() || ""; // Ensure bio is a string
//     const res = await clerkClient.users.updateUser(userId, {
//       publicMetadata: {
//         onboardingComplete: true,
//         bio,
//       },
//     });

//     const User = {
//       name: user?.fullName || "",
//       username: user?.username || "",
//       email: user?.emailAddresses?.[0]?.emailAddress || "",
//       phoneNumber: user?.phoneNumbers?.[0]?.phoneNumber || "",
//       bio,
//       profilePicture: user?.imageUrl || "",
//     };

//     await createUser(User);
//     return { message: res.publicMetadata };
//   } catch (err) {
//     console.error("Error updating user metadata:", err);
//     return { error: "There was an error updating the user metadata." };
//   }
// };

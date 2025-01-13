// "use server";

// import { createUser } from "@/lib/queries";
// import prisma from "@/lib/db";
// import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";

// export const completeOnboarding = async (formData: FormData) => {
//   const { userId } = await auth();
//   const user = await currentUser();

//   if (!userId) {
//     return { message: "No Logged In User" };
//   }

//   const client = await clerkClient();

//   try {
//     const bio = formData.get("bio")?.toString() || "";
//     const res = await client.users.updateUser(userId, {
//       publicMetadata: {
//         onboardingComplete: false,
//         bio : bio,
//       },
//     });

//     let newUser = {
//       name: user?.fullName || "",
//       username: user?.username || "",
//       email: user?.emailAddresses[0].emailAddress || "",
//       phoneNumber: user?.phoneNumbers[0].phoneNumber || "",
//       bio : bio,
//       profilePicture: user?.imageUrl || "",
//     };
//     const result = await prisma.user.create({data : newUser});
//     console.log(result)
//     return { message: res.publicMetadata };
//   } catch (err : any) {
//     console.error("Error updating user metadata:", err);
//     return { error: "There was an error updating the user metadata." };
//   }
// };

"use server";

import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { createUser } from "@/lib/queries";

export const completeOnboarding = async (formData: FormData) => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId) {
    return { message: "No Logged In User" };
  }

  const client = await clerkClient();

  try {
    const res = await client.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
        bio: formData.get("bio"),
      },
    });
    const bio = formData.get("bio") as string;
    let newUser = {
      name: user?.fullName || "",
      username: user?.username || "",
      email: user?.emailAddresses[0].emailAddress || "",
      phoneNumber: user?.phoneNumbers[0].phoneNumber || "",
      bio: bio,
      profilePicture: user?.imageUrl || "",
    };
    const createdUser = await createUser(newUser);
    console.log("Created user Successfully",createdUser)
    return { message: res.publicMetadata };
  } catch (err) {
    return { error: "There was an error updating the user metadata." };
  }
};

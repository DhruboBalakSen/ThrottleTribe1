import Image from "next/image"
import { SignUp } from "@clerk/nextjs"

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left section with image and overlay */}
      <div className="relative flex-1 hidden md:flex items-center justify-center bg-orange-500">
        <div className="absolute inset-0 bg-orange-500 opacity-80"></div>
        <Image
          src="/login.jpg"
          alt="ThrottleTribe Welcome"
          layout="fill"
          objectFit="cover"
          className="mix-blend-darken"
        />
        <h1 className="relative z-10 text-4xl font-bold text-white text-center">
          Welcome to ThrottleTribe
        </h1>
      </div>

      {/* Right section with login form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <SignUp />
      </div>
    </div>
  )
}



// import { SignUp } from '@clerk/nextjs'

// export default function Page() {
//   return <SignUp />
// }

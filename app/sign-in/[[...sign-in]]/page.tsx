import Image from "next/image"
import { SignIn } from "@clerk/nextjs"

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Left section with image and overlay */}
      <div className="relative flex-1 hidden md:flex items-center justify-center bg-orange-500 rounded-r-3xl shadow-slate-600 shadow-2xl">
        <div className="absolute inset-0 bg-orange-500 opacity-80 rounded-r-3xl"></div>
        <Image
          src="/login.jpg"
          alt="ThrottleTribe Welcome"
          layout="fill"
          className="mix-blend-darken object-cover rounded-r-3xl"
        />
        <h1 className="relative z-10 text-5xl font-bold text-white text-center">
          Welcome to ThrottleTribe
        </h1>
      </div>

      {/* Right section with login form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <SignIn />
      </div>
    </div>
  )
}


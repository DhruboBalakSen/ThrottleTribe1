"use client";
import { LogOut } from 'lucide-react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { UserButton,SignOutButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'

export function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white flex justify-center rounded-b-lg shadow-lg">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-bold text-xl">ThrottleTribe</Link>
          
        </div>
        <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className={pathname == "/" ? "text-orange-500" : ""}>Home</Link>
            <Link href="/trips"className={pathname == "/trips" ? "text-orange-500" : ""}>Trips</Link>
            <Link href="/blogs"className={pathname == "/blogs" ? "text-orange-500" : ""}>Blogs</Link>
          </nav>
        
        <div className="ml-1 flex items-center gap-4">
          <UserButton />
          <SignOutButton>
            <Button variant="destructive">
            <LogOut />
            </Button>
          </SignOutButton>
          
        </div>
      </div>
    </header>
  )
}


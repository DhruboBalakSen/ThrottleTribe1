import { Search,LogOut } from 'lucide-react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UserButton,SignOutButton } from '@clerk/nextjs'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white flex justify-center rounded-b-lg shadow-lg">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-bold text-xl">ThrottleTribe</Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-orange-500">Home</Link>
            <Link href="/trips">Trips</Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for trips, events, people etc..."
              className="pl-8"
            />
          </div>
          {/* <Button variant="ghost" size="icon">🔔</Button>
          <Button variant="ghost" size="icon">📸</Button>
          <Button variant="ghost" size="icon">🔖</Button> */}
          <UserButton />

          <SignOutButton>
            <Button variant="ghost">
            <LogOut />
            </Button>
          </SignOutButton>
          
        </div>
      </div>
    </header>
  )
}


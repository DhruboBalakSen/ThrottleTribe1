import { Header } from "@/components/main/header"
import { UserProfile } from "@/components/profile/user-profile"

export default async function ProfilePage({ params }: { params: { username: string } }) {

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-6">
        <UserProfile />
      </main>
    </div>
  )
}


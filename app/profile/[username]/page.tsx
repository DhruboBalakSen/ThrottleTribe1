import { Header } from "@/components/main/header"
import { UserProfile } from "@/components/profile/user-profile"

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-6">
      <div className="flex gap-4">
        <UserProfile username={(await params).username as string}/>
        </div>
      </main>
    </div>
  )
}
 

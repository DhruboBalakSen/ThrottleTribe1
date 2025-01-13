interface UserStatsProps {
    followers: number
    following: number
  }
  
export function UserStats({ followers, following }: UserStatsProps) {
    return (
      <div className="flex gap-4 text-center">
        <div>
          <p className="text-2xl font-bold">{followers.toLocaleString()}</p>
          <p className="text-gray-600">Followers</p>
        </div>
        <div>
          <p className="text-2xl font-bold">{following.toLocaleString()}</p>
          <p className="text-gray-600">Following</p>
        </div>
      </div>
    )
  }
  
  